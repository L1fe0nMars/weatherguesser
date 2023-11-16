import { useState, useContext } from 'react';
import { SaveDataContext } from '../context/SaveDataContext';
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
    const { data } = useContext(SaveDataContext);

    const [city, setCity] = useState([]);
    const [showTemp, setShowTemp] = useState(false);
    const [userGuess, setUserGuess] = useState('');
    const [showSettings, setShowSettings] = useState(false);

    const getWeather = async (city) => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${city.id}&appid=045d974fe8c45d8b0e0bb4c31d908098&units=${data.unitType}`);
        const weatherData = await response.json();
        
        weatherData.state = city.state;
        setCity(weatherData);
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

    const handleInput = (event) => {
        const value = event.target.value;
        
        if (!isNaN(value)) {
            setUserGuess(value);
        }
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if (userGuess !== '') {
            setShowTemp(true);
        }
    }

    return (
        <main>
            <button className="settings-btn" onClick={openSettings}>
                <FontAwesomeIcon icon={faGear} className="settings-icon" />
            </button>

            {showSettings && <Settings closeSettings={closeSettings} />}

            {!city.sys && <div className="main">
                <h1>WeatherGuesser</h1>
                <p>Put your weather knowledge to the test by guessing the current temperature of a random city from anywhere in the world.</p>
                <button onClick={onClick}>Play</button>
            </div>}
            
            {city.sys && <div className="game">
                <WeatherCard city={city} showTemp={showTemp} />
                {!showTemp && <form onSubmit={onSubmit}>
                    <div className="form-control">
                        <label htmlFor="temperature">
                            Guess the temperature
                        </label>
                        <input type="text" value={userGuess} onChange={handleInput} />
                    </div>
                    <button className="btn">Submit Answer</button>
                </form>}
            </div>}
            
            {showTemp && <div className="result">
                <GameResult city={city} userGuess={userGuess} />
                <button onClick={onClick}>Play Again</button>
            </div>}
        </main>
    );
}

export default WeatherGame;