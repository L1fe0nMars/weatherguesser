import { useState } from 'react';
import Settings from './Settings';
import WeatherCard from './WeatherCard';
import GameResult from './GameResult';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

const NUM_CITIES = 209579;
const cityList = require('../city-list.json');

const getRandomCity = () => {
    return cityList[Math.floor(Math.random() * NUM_CITIES)];
}

const WeatherGame = () => {
    const [city, setCity] = useState([]);
    const [showTemp, setShowTemp] = useState(false);
    const [userGuess, setUserGuess] = useState('');
    const [showSettings, setShowSettings] = useState(false);

    const getWeather = async (city) => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${city.id}&appid=045d974fe8c45d8b0e0bb4c31d908098&units=imperial`);
        const data = await response.json();
        
        data.state = city.state;
        setCity(data);
        setShowTemp(false);
    }

    const openSettings = () => {
        setShowSettings(true);
    }

    const closeSettings = () => {
        setShowSettings(false);
    }

    const onClick = () => {
        getWeather(getRandomCity());
        setShowTemp(false);
        setUserGuess('');
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if (userGuess !== '') {
            setShowTemp(true);
        }
    }

    return (
        <div>
            <button className="settings-btn" onClick={openSettings}>
                <FontAwesomeIcon icon={faGear} className="settings-icon" />
            </button>

            {showSettings && <Settings closeSettings={closeSettings} />}

            {!city.sys && <h1>WeatherGuesser</h1>}
            {!city.sys && <button onClick={onClick}>Play</button>}
            
            {city.sys && <WeatherCard city={city} showTemp={showTemp} />}
            {city.sys && !showTemp && <form onSubmit={onSubmit}>
                <div className="form-control">
                    <label htmlFor="temperature">
                        Guess the temperature
                    </label>
                    <input type="number" value={userGuess} onChange={(event) => setUserGuess(Math.round(event.target.value))} />
                </div>
                <button className="btn">Submit Answer</button>
            </form>}
            
            {showTemp && <GameResult city={city} userGuess={userGuess} />}
            {showTemp && <button onClick={onClick}>Play Again</button>}
        </div>
    );
}

export default WeatherGame;