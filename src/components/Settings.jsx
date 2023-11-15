import { useContext } from 'react';
import { SaveDataContext } from '../context/SaveDataContext';

const Settings = (props) => {
    const { data, saveData } = useContext(SaveDataContext);

    const onCheckboxChange = (event) => {
        const { name, checked } = event.target;
        
        if (name === 'unitType') {
            saveData({ unitType: checked ? 'imperial' : 'metric', unitTemperature: checked ? 'F' : 'C' });
        }
        else if (name === 'timeFormat') {
            saveData({ timeFormat: checked ? '12hr' : '24hr' });
        }
        else {
            saveData({ [name]: checked });
        }
    }
    
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
                        name="unitType"
                        checked={data.unitType === 'imperial'}
                        onChange={onCheckboxChange}
                    />
                </label>
                <label>
                    Time Format
                    <input 
                        type="checkbox"
                        name="timeFormat"
                        checked={data.timeFormat === '12hr'}
                        onChange={onCheckboxChange}
                    />
                </label>
                
            </form>
        </div>
    );
}

export default Settings;