import axios from "axios";
import { db } from "../../firebase";

export const signupUser = ( uId, 
                            email, 
                            password, 
                            lname, 
                            fname, 
                            regNo, 
                            phoneNo, 
                            description, 
                            userRole,
                            createdDate, 
                            lastModifiedDate
                        ) => {
    return function(dispatch) {
        dispatch(signupUserStart());

        const data = {
            uId,
            email,
            password,
            lname,
            fname,
            regNo,
            phoneNo,
            description,
            userRole,
            createdDate,
            lastModifiedDate,
            returnSecureToken: true
        };

        db.collection("users").add({
            uId,
            email,
            password,
            lname,
            fname,
            regNo,
            phoneNo,
            description,
            userRole,
            createdDate,
            lastModifiedDate,
            returnSecureToken: true
        });

        axios
            .post(
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCBbW-5QrL4J92sFPzCTpO2ZesLrIvISw0",
                data
            )
            .then(result => {
                const token = result.data.idToken;
                const userId = result.data.localId;
                const expiresIn = result.data.expiresIn;
                const expireDate = new Date(new Date().getTime() + expiresIn * 1000);
                const refreshToken = result.data.refreshToken;

                localStorage.setItem("token", token);
                localStorage.setItem("userId", userId);
                localStorage.setItem("expireDate", expireDate);
                localStorage.setItem("refreshToken", refreshToken);
                localStorage.setItem("userRole", userRole);

                dispatch(signupUserSuccess(token, userId, userRole));
            })
            .catch(err => {
                dispatch(signupUserError(err));
            });
    };
};

export const signupUserStart = () => {
    return {
        type: "SIGNUP_USER_START"
    };
};

export const signupUserSuccess = (token, userId, userRole) => {
    return {
        type: "SIGNUP_USER_SUCCESS",
        token,
        userId,
        userRole
    };
};

export const signupUserError = (error) => {
    return {
        type: "SIGNUP_USER_ERROR",
        error
    };
};

export const logout = () => {
    return {
        type: "LOGOUT"
    };
};