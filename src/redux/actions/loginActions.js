import axios from "axios";
import { db } from "../../firebase";

export const loginUser = (email, password) => {
    // console.log(email + ' - ' + password);
    return function(dispatch) {
        dispatch(loginUserStart());

        const data = {
            email,
            password,
            returnSecureToken: true
        };

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
                var userRole = null;

                db.collection("users").where("uId", "==", userId)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            // doc.data() is never undefined for query doc snapshots
                            userRole = doc.data().userRole;
                            localStorage.setItem("userRole", userRole);
                            localStorage.setItem("token", token);
                            localStorage.setItem("userId", userId);
                            localStorage.setItem("expireDate", expireDate);
                            localStorage.setItem("refreshToken", refreshToken);

                            dispatch(loginUserSuccess(token, userId, userRole));
                        });
                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                    });

                
                // dispatch(loginUserSuccess(token, userId, userRole));
            })
            .catch(err => {
                dispatch(loginUserError(err));
            });
    };
};

export const loginUserStart = () => {
    return {
        type: "LOGIN_USER_START"
    };
};

export const loginUserSuccess = (token, userId, userRole) => {
    return {
        type: "LOGIN_USER_SUCCESS",
        token,
        userId,
        userRole
    };
};

export const loginUserError = (error) => {
    return {
        type: "LOGIN_USER_ERROR",
        error
    };
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expireDate");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userRole");
    
    return {
        type: "LOGOUT"
    };
};

export const autoLoginAfterMilSeconds = (ms) => {
    return function(dispatch){
        //alert(Math.floor((ms/1000/60)) + " минут " + Math.floor(((ms/1000)%60)) + " секунд үлдлээ");
        // token шинэчлэх код
        axios
            .post(
                "https://securetoken.googleapis.com/v1/token?key=AIzaSyCBbW-5QrL4J92sFPzCTpO2ZesLrIvISw0", 
                {
                    grant_type: "refresh_token",
                    refresh_token: localStorage.get("refresh_token")
                }
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

                dispatch(loginUserSuccess(token, userId));
            })
            .catch(err => {
                dispatch(loginUserError(err));
            });
        
        
        // автомат logout
        setTimeout(()=>{
            dispatch(logout());
        }, ms);
    };
};