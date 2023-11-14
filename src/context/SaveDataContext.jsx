import { createContext, useReducer, useEffect } from 'react';
import SaveDataReducer from './SaveDataReducer';

const initialData = {
    settings: {
        general: {
            units: {
                temperature: 'F'
            },
            timeFormat: '12hr'
        },
        game: {
            includeDecimals: false,
            includeHighLow: false
        }
    }
}

export const SaveDataContext = createContext(initialData);

export const SaveDataProvider = ({ children }) => {
    const [data, dispatch] = useReducer(SaveDataReducer, initialData);

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('data'));

        if (savedData) {
            dispatch({
                type: 'SAVE_DATA',
                payload: savedData
            });
        }
    }, []);

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