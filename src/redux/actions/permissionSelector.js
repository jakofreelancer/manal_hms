export const setCurrentPermission = currentPermission => {
    return function(dispatch) {
        dispatch(setCurrentPermissionStart());

        localStorage.setItem("currentPermission", currentPermission);

        dispatch(setCurrentPermissionSuccess(currentPermission));

        // axios
    };
};

export const setCurrentPermissionStart = () => {
    return {
        type: "SET_CURRENT_PERMISSION_START"
    };
};

export const setCurrentPermissionSuccess = currentPermission => {
    return {
        type: "SET_CURRENT_PERMISSION_SUCCESS",
        currentPermission
    };
};

// export const setCurrentPermissionError = error => {
//     return {
//         type: "SET_CURRENT_PERMISSION_ERROR",
//         error
//     };
// };