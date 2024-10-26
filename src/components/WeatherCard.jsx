import { useContext } from 'react';
import { countryCodeToName, stateCodeToName } from "../Utils";
import { SaveDataContext } from '../context/SaveDataContext';
import '../css/WeatherCard.css';

const getLocalTime = (city, timeFormat) => {
    const unixTimestamp = city.dt;
    const timezoneOffset = city.timezone;
    const timestampMillis = unixTimestamp * 1000;
    const date = new Date(timestampMillis);
    const localTime = new Date(date.getTime() + timezoneOffset * 1000);
    const setTimeFormat = timeFormat === '12hr' ? true : false;
    const formattedLocalTime = localTime.toLocaleTimeString([], { timeZone: 'GMT', hour12: setTimeFormat, timeStyle: 'short' });

    return formattedLocalTime;
}

const WeatherCard = ({ city, showTemp}) => {
    const { data } = useContext(SaveDataContext);
    const { includeDecimals, unitTemperature, includeHighLow, timeFormat } = data;

    const country = countryCodeToName[city.sys.country];
    const state = stateCodeToName[city.state] || '';
    const temp = includeDecimals ? city.main.temp.toFixed(1) : Math.round(city.main.temp);
    const tempMax = includeDecimals ? city.main.temp_max.toFixed(1) : Math.round(city.main.temp_max);
    const tempMin = includeDecimals ? city.main.temp_min.toFixed(1) : Math.round(city.main.temp_min);
    const desc = city.weather[0].description;
    const description = desc.charAt(0).toUpperCase() + desc.slice(1);
    
    return (
        <div className="weather-card">
            <h1>{`${city.name}, ${state.length > 0 ? state + ', ' : ''}${country}`}</h1>

            <div className="weather-info-main">
                <div className="weather-info-pic">
                    <img src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`} alt="Weather icon" />
                    <p className="description">{description}</p>
                </div>

                {
                    showTemp
                    ? (
                        <h2>{`${temp}°${unitTemperature}`}</h2>
                    )
                    : (
                        <h2>{`???°${unitTemperature}`}</h2>
                    )
                }
            </div>

            {includeHighLow && <div className="high-low">
                <p>{`High: ${tempMax}°${unitTemperature}`}</p>
                <p>{`Low: ${tempMin}°${unitTemperature}`}</p>
            </div>}
            <p>{`Humidity: ${city.main.humidity}%`}</p>
            <p>{`Local Time: ${getLocalTime(city, timeFormat)}`}</p>
        </div>
    );
}

export default WeatherCard;