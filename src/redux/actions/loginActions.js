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
                var permission = null;
                var fname = null;
                var lname = null;

                db.collection("employees").where("uId", "==", userId)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            // doc.data() is never undefined for query doc snapshots
                            var permissionArray = Object.entries(doc.data().permission);
                            var allowedPermissions = permissionArray.filter(([key, value]) => value == true);
                            var allowedPermissionsClr = [];

                            for(var x=0; x<allowedPermissions.length; x++) {
                                allowedPermissionsClr.push(allowedPermissions[x][0]);
                            }

                            fname = doc.data().fname;
                            lname = doc.data().lname;
                            //redux reducer дээрх [a,b] массив нь текст болон хөрвүүлэгддэг "a,b" тул бүтцийг адилхан текст болгон хөрвүүлэв
                            localStorage.setItem("permission", allowedPermissionsClr.toString());
                            // console.log("how many values", allowedPermissionsClr.toString());
                            localStorage.setItem("token", token);
                            localStorage.setItem("userId", userId);
                            localStorage.setItem("expireDate", expireDate);
                            localStorage.setItem("refreshToken", refreshToken);
                            localStorage.setItem("lname", lname);
                            localStorage.setItem("fname", fname);

                            dispatch(loginUserSuccess(token, userId, allowedPermissionsClr.toString(), lname, fname));
                        });
                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                    });

                
                // dispatch(loginUserSuccess(token, userId, permission));
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

export const loginUserSuccess = (token, userId, permission, lname, fname) => {
    return {
        type: "LOGIN_USER_SUCCESS",
        token,
        userId,
        permission,
        lname,
        fname
    };
};

export const loginUserError = (error) => {
    return {
        type: "LOGIN_USER_ERROR",
        error
    };
};

export const logout = () => {
    localStorage.clear();
    // localStorage.removeItem("token");
    // localStorage.removeItem("userId");
    // localStorage.removeItem("expireDate");
    // localStorage.removeItem("refreshToken");
    // localStorage.removeItem("permission");
    // localStorage.removeItem("lname");
    // localStorage.removeItem("fname");
    
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