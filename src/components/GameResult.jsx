import { useContext } from 'react';
import { SaveDataContext } from '../context/SaveDataContext';

const GameResult = ({ city, guessInput }) => {
    const { data } = useContext(SaveDataContext);
    const { includeDecimals, unitTemperature } = data;

    const temp = includeDecimals ? city.main.temp.toFixed(1) : Math.round(city.main.temp);
    const userGuess = includeDecimals ? guessInput.toFixed(1) : Math.round(guessInput);
    
    return (
        <div>
            <h1>Your Guess</h1>
            <h2>{`${userGuess}°${unitTemperature}`}</h2>
            {
                userGuess === temp
                ? (
                    <h3 className="correct">You got it!</h3>
                )
                : (
                    Math.abs(userGuess - temp) <= 1
                    ? (
                        <h3 className="so-close">So close</h3>
                    )
                    : (
                        userGuess > temp
                        ? (
                            <h3 className="hot">Too hot</h3>
                        )
                        : (
                            <h3 className="cold">Too cold</h3>
                        )
                    )
                )
            }
        </div>
    );
}

export default GameResult;