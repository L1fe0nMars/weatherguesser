import React, { useState } from 'react';
import Footer from './components/Footer';
import './css/App.css';

const API_URL = 'https://api.openweathermap.org/data/2.5/weather?id=2172797&appid=045d974fe8c45d8b0e0bb4c31d908098&units=imperial';
const json = require('./city-list.json');
console.log(json.length);

const App = () => {
    const getWeather = async (cityID) => {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        console.log(data);
    }

    return (
        <div className="App">
            <button onClick={() => getWeather()}>Weather</button>
            <Footer />
        </div>
    );
}

export default App;
