import React, { useState } from "react";

const AppointmentContext = React.createContext();

const initialState = {
    appsDate: null,
    appsTime: null,
    isClicked: false
};

export const AppointmentStore = props => {
    const [appointments, setAppointments] = useState(initialState);
    const [toggleAppBtnState, setToggleAppBtnState] = useState(false);

    const funcToggleAppBtn = (date, time, clicked) => {
        setToggleAppBtnState(!toggleAppBtnState);
        setAppointments({
            ...appointments,
            appsDate: date,
            appsTime: time,
            isClicked: toggleAppBtnState
        });
    };

    return (
        <AppointmentContext.Provider
            value={{appointments,
            funcToggleAppBtn}}
        >
            {props.children}
        </AppointmentContext.Provider>
    );
};

export default AppointmentContext;