import { useContext } from 'react';
import { SaveDataContext } from '../context/SaveDataContext';

const Settings = (props) => {
    const { saveData } = useContext(SaveDataContext);
    
    return (
        <div>
            <h1>Settings</h1>
            <button onClick={props.closeSettings}>
                &times;
            </button>
            
            <form>
                <label>
                    Units
                    <input 
                        type="checkbox"

                    />
                </label>
                
            </form>
        </div>
    );
}

export default Settings;