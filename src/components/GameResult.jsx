import { useContext } from 'react';
import { SaveDataContext } from '../context/SaveDataContext';

const GameResult = (props) => {
    const { data } = useContext(SaveDataContext);

    const temp = data.includeDecimals ? props.city.main.temp.toFixed(1) : Math.round(props.city.main.temp);
    const userGuess = data.includeDecimals ? Number(props.userGuess).toFixed(1) : Math.round(Number(props.userGuess));
    
    return (
        <div>
            <h1>Your Guess</h1>
            <h2>{`${userGuess}°${data.unitTemperature}`}</h2>
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