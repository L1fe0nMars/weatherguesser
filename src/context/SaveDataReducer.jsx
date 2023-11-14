const SaveDataReducer = (state, action) => {
    switch(action.type) {
        case 'SAVE_DATA':
            return {
               ...state,
               ...action.payload
            }
        default:
            return state;
    }
}

export default SaveDataReducer;