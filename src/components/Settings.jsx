import { useContext } from 'react';
//import { GlobalContext } from '../context/GlobalState';

const Settings = () => {
    //const { settings } = useContext(GlobalContext);
    
    return (
        <div>
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