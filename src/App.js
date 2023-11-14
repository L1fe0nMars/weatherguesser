import React, { useState } from 'react';
import { SaveDataProvider } from './context/SaveDataContext';
import WeatherGame from './components/WeatherGame';
import Footer from './components/Footer';
import './css/App.css';

const App = () => {
    return (
        <div className="App">
            <SaveDataProvider>
                <WeatherGame />
                <Footer />
            </SaveDataProvider>
        </div>
    );
}

export default App;
