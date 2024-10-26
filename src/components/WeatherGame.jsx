import { useState, useContext } from 'react';
import { SaveDataContext } from '../context/SaveDataContext';
import Settings from './Settings';
import WeatherCard from './WeatherCard';
import GameResult from './GameResult';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

const cityListJSON = require('../city-list.json');
const cityList = cityListJSON.filter(city => city.country !== '');
const NUM_CITIES = cityList.length;

const getRandomCity = () => {
    return cityList[Math.floor(Math.random() * NUM_CITIES)];
}

const WeatherGame = () => {
    const { data } = useContext(SaveDataContext);
    const { unitType, unitTemperature, includeDecimals } = data;

    const [city, setCity] = useState([]);
    const [showTemp, setShowTemp] = useState(false);
    const [guessInput, setGuessInput] = useState(0);
    const [showSettings, setShowSettings] = useState(false);
    const [loading, setLoading] = useState(false);

    const getWeather = async (city) => {
        setLoading(true);

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${city.id}&appid=045d974fe8c45d8b0e0bb4c31d908098&units=${unitType}`);
        const weatherData = await response.json();
        
        weatherData.state = city.state;
        setCity(weatherData);
        setShowTemp(false);
        setLoading(false);
    }

    const toggleSettingsMenu = (display) => {
        setShowSettings(display);
    }

    const playGame = () => {
        getWeather(getRandomCity());
        setShowTemp(false);
        setGuessInput('');
    }

    const handleInput = (event) => {
        const value = event.target.value;
        
        if (!isNaN(value)) {
            setGuessInput(value);
        }
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if (guessInput !== '') {
            setShowTemp(true);
        }
    }

    return (
        <main>
            <button className="settings-btn" onClick={() => toggleSettingsMenu(true)} aria-label="Settings">
                <FontAwesomeIcon icon={faGear} className="settings-icon" />
            </button>

            {showSettings && <Settings closeSettings={() => toggleSettingsMenu(false)} />}

            {!city.sys && !loading && <div className="main">
                <h1>WeatherGuesser</h1>
                <p>Put your weather knowledge to the test by guessing the current temperature of a random city from anywhere in the world.</p>
                <button onClick={playGame}>Play</button>
            </div>}
            
            {
                loading
                ? (
                    <div className="loading"></div>
                )
                : (
                    city.sys && <div className="game">
                        <WeatherCard city={city} showTemp={showTemp} />
                        {!showTemp && <form onSubmit={onSubmit}>
                            <label className="temperature-guess">
                                Guess the temperature
                                <div className="guess-input">
                                    <input type="number" value={guessInput} onChange={handleInput} step={includeDecimals ? 0.1 : 1} min={-200} max={200} autoFocus />
                                    <span>°{unitTemperature}</span>
                                </div>
                            </label>
                            <button className="btn">Submit Answer</button>
                        </form>}
                    </div>
                )
            }
            
            {showTemp && <div className="result">
                <GameResult city={city} guessInput={Number(guessInput)} />
                <button onClick={playGame}>Play Again</button>
            </div>}
        </main>
    );
}

export default WeatherGame;