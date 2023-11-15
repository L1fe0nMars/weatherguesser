import { useContext } from 'react';
import { countryCodeToName, stateCodeToName } from "../Utils";
import { SaveDataContext } from '../context/SaveDataContext';

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

const WeatherCard = (props) => {
    const { data } = useContext(SaveDataContext);

    const city = props.city;
    const country = countryCodeToName[city.sys.country];
    const temp = Math.round(city.main.temp);
    const desc = city.weather[0].description;
    const description = desc.charAt(0).toUpperCase() + desc.slice(1);
    let state = props.city.state;

    if (stateCodeToName[state]) {
        state = stateCodeToName[state];
    }

    return (
        <div>
            {
                state.length > 0
                ? (
                    <h1>{`${city.name}, ${state}, ${country}`}</h1>
                )
                : (
                    <h1>{`${city.name}, ${country}`}</h1>
                )
            }
            
            {
                props.showTemp
                ? (
                    <h2>{`${temp}°${data.unitTemperature}`}</h2>
                )
                : (
                    <h2>{`???°${data.unitTemperature}`}</h2>
                )
            }

            <img src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`} alt="Weather icon" />
            <p>{description}</p>
            <p>{`Humidity: ${city.main.humidity}%`}</p>
            <p>{`Local Time: ${getLocalTime(city, data.timeFormat)}`}</p>
        </div>
    );
}

export default WeatherCard;