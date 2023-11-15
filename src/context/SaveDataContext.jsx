import { createContext, useReducer, useEffect } from 'react';
import SaveDataReducer from './SaveDataReducer';

const initialData = {
    unitType: 'imperial',
    unitTemperature: 'F',
    timeFormat: '12hr',
    includeDecimals: false,
    includeHighLow: false
}

export const SaveDataContext = createContext(initialData);

export const SaveDataProvider = ({ children }) => {
    const savedData = JSON.parse(localStorage.getItem('data'));
    const [data, dispatch] = useReducer(SaveDataReducer, savedData || initialData);

    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(data));
    }, [data]);

    const saveData = (newData) => {
        dispatch({
            type: 'SAVE_DATA',
            payload: newData
        });
    }

    return (
        <SaveDataContext.Provider value={{ data, saveData }}>
            {children}
        </SaveDataContext.Provider>
    );
}