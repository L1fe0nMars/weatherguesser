import React, { useState } from 'react';
import WeatherGame from './components/WeatherGame';
import Footer from './components/Footer';
import './css/App.css';

const App = () => {
    return (
        <div className="App">
            
            <WeatherGame />
            <Footer />
        </div>
    );
}

export default App;
