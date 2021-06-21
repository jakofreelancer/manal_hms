const initialState = {
    apps: []
};

const reducer = ( state = initialState, action ) => {
    switch(action.type) {
        case "COLLECT_APPOINTMENTS_ALL" : return {
            ...state,
            apps: [...state.apps, action.apps],
            // ...state,
            // apps: action.apps
            // apps: ([action.apps.isClicked] === true) ? [action.apps] : [...state.apps]
            // apps: ([action.apps.isClicked]===true) ? [action.apps.isClicked] : [!action.apps.isClicked]
        };

        case "COLLECT_APP_DATE" : return {
            ...state,
            selectedDate: action.selectedDate,
            busyTimes: action.busyTimes
        };

        case "COLLECT_APP_TIME" : return {
            ...state,
            selectedTime: action.selectedTime
        };

        case "COLLECT_REG_NO" : return {
            ...state,
            selectedRegNo: action.selectedRegNo
        };

        case "PREPARE_APP_TIMES" : return {
            ...state,
            test1: action.test1
        };

        default:
            return state;
    }
}

export default reducer;