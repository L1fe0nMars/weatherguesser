import { useContext } from 'react';
import { SaveDataContext } from '../context/SaveDataContext';

const GameResult = (props) => {
    const { data } = useContext(SaveDataContext);

    const temp = data.includeDecimals ? Number(props.city.main.temp.toFixed(1)) : Math.round(props.city.main.temp);
    const userGuess = Number(props.userGuess);
    
    return (
        <div>
            <h2>{`${userGuess}°${data.unitTemperature}`}</h2>
            {
                userGuess === temp
                ? (
                    <h3>You got it!</h3>
                )
                : (
                    Math.abs(userGuess - temp) <= 1
                    ? (
                        <h3>So close</h3>
                    )
                    : (
                        userGuess > temp
                        ? (
                            <h3>Too hot</h3>
                        )
                        : (
                            <h3>Too cold</h3>
                        )
                    )
                )
            }
        </div>
    );
}

export default GameResult;