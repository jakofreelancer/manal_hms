import axios from "axios";
import { db } from "../../firebase";

export const getProfileInfo = () => {
    return function(dispatch) {
        dispatch(getProfileInfoStart());

        const data = {
            
        };
    };
};

export const getProfileInfoStart = () => {
    return {
        type: "GET_PROFILE_START"
    };
};

export const getProfileInfoSuccess = () => {
    return {
        type: "GET_PROFILE_SUCCESS"
    };
};

export const getProfileInfoError = (error) => {
    return {
        type: "GET_PROFILE_ERROR",
        error
    };
};