const initialState = {
    currentPermission: null,
    error: null
}

const reducer = ( state = initialState, action ) => {
    switch(action.type) {
        case "SET_CURRENT_PERMISSION_START": return {
            ...state
        }
        case "SET_CURRENT_PERMISSION_SUCCESS": return {
            ...state,
            currentPermission: action.currentPermission
        }
        case "SET_CURRENT_PERMISSION_ERROR": return {
            ...state,
            error: action.error
        }
        default:
            return state;
    }
};

export default reducer;