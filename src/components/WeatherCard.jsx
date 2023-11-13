const WeatherCard = (props) => {
    const city = props.city;
    const temp = Math.round(city.main.temp);
    const description = city.weather[0].description;
    const desc = description.charAt(0).toUpperCase() + description.slice(1);

    return (
        <div>
            {
                city.state.length > 0
                ? (
                    <h1>{`${city.name}, ${city.state}, ${city.sys.country}`}</h1>
                )
                : (
                    <h1>{`${city.name}, ${city.sys.country}`}</h1>
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
            <p>{desc}</p>
            <p>{`Humidity: ${city.main.humidity}%`}</p>
        </div>
    );
}

export default WeatherCard;