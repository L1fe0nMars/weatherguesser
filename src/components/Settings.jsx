import { useContext } from 'react';
import { SaveDataContext } from '../context/SaveDataContext';
import '../css/Settings.css';

const Settings = ({ closeSettings }) => {
    const { data, saveData } = useContext(SaveDataContext);
    const { unitType, timeFormat, includeDecimals, includeHighLow } = data;

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
        <div className="settings-bg">
            <div className="settings">
                <button className="close" onClick={closeSettings}>
                    &times;
                </button>

                <h1>Settings</h1>

                <h2>General</h2>
                <form>
                    <label className="form-setting">
                        Units
                        <div className="setting-input">
                            <input 
                                type="checkbox"
                                name="unitType"
                                checked={unitType === 'imperial'}
                                onChange={onCheckboxChange}
                            />
                            <span>Imperial</span>
                        </div>
                    </label>

                    <hr />

                    <label className="form-setting">
                        Time Format
                        <div className="setting-input">
                            <input 
                                type="checkbox"
                                name="timeFormat"
                                checked={timeFormat === '12hr'}
                                onChange={onCheckboxChange}
                            />
                            <span>12hr</span>
                        </div>
                    </label>
                </form>

                <h2>Game</h2>
                <form>
                    <label className="form-setting">
                        Include Decimals
                        <input 
                            type="checkbox"
                            name="includeDecimals"
                            checked={includeDecimals}
                            onChange={onCheckboxChange}
                        />
                        {/*<label data-on="Yes" data-off="No"></label>*/}
                    </label>

                    <hr />

                    <label className="form-setting">
                        Include High & Low Temperature
                        <input 
                            type="checkbox"
                            name="includeHighLow"
                            checked={includeHighLow}
                            onChange={onCheckboxChange}
                        />
                        {/*<label data-on="Yes" data-off="No"></label>*/}
                    </label>
                </form>
            </div>
        </div>
    );
}

export default Settings;