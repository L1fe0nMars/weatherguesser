import { countryCodeToName, stateCodeToName } from "../Utils";

const WeatherCard = (props) => {
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
                city.state.length > 0
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
                    <h2>{`${temp}°F`}</h2>
                )
                : (
                    <h2>{`???°F`}</h2>
                )
            }

            <img src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`} alt="Weather icon" />
            <p>{description}</p>
            <p>{`Humidity: ${city.main.humidity}%`}</p>
        </div>
    );
}

export default WeatherCard;