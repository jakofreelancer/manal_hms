import { db } from "../../firebase";

export const collectAppointmentsAction = (appDate, appTime, isClicked) => {
    return {
        type: "COLLECT_APPOINTMENTS_ALL",
        apps: {appDate,
            appTime,
            isClicked
        }
    };
};

export const collectAppDate = (selectedDate) => {
    // db.collection("appointments").doc(selectedDate)
    var busyTimes = [];
    db.collection('appointments').doc(selectedDate).collection('appTime').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.data().value);
            busyTimes.push(doc.data().value);
        });
    });

    return {
        type: "COLLECT_APP_DATE",
        selectedDate,
        busyTimes
    };
};

export const prepareTimeOptions = (selectedDate, busyTimes) => {
    console.log("IT WORKS!!!");
    const timeOptions = [
        { value: 540, label: "09:00" },
        { value: 555, label: "09:15" },
        { value: 570, label: "09:30" },
        { value: 585, label: "09:45" },
        { value: 600, label: "10:00" },
        { value: 615, label: "10:15" },
        { value: 630, label: "10:30" },
        { value: 645, label: "10:45" },
        { value: 660, label: "11:00" },
        { value: 675, label: "11:15" },
        { value: 690, label: "11:30" },
        { value: 705, label: "11:45" },
        { value: 720, label: "12:00" },
        { value: 735, label: "12:15" },
        { value: 750, label: "12:30" },
        { value: 765, label: "12:45" },
        { value: 780, label: "13:00" },
        { value: 795, label: "13:15" },
        { value: 810, label: "13:30" },
        { value: 825, label: "13:45" },
        { value: 840, label: "14:00" },
        { value: 855, label: "14:15" },
        { value: 870, label: "14:30" },
        { value: 885, label: "14:45" },
        { value: 900, label: "15:00" },
        { value: 915, label: "15:15" },
        { value: 930, label: "15:30" },
        { value: 945, label: "15:45" },
        { value: 960, label: "16:00" },
        { value: 975, label: "16:15" },
        { value: 990, label: "16:30" },
        { value: 1005, label: "16:45" },
        { value: 1020, label: "17:00" },
        { value: 1035, label: "17:15" },
        { value: 1050, label: "17:30" },
        { value: 1065, label: "17:45" }
    ];

    const removeUsedItemsFromList = () => {
        var l = busyTimes.length;

        for ( var i=0; i<l; i++ ) {
            var timeOptionsIndexes = timeOptions.map( el => {
                return el.value;
            });

            timeOptions.splice(timeOptionsIndexes.indexOf(busyTimes[0]),1); //570 removed, [540, 555, 585, 600...] 540 removed, 
            busyTimes.shift();
        }
    };

    removeUsedItemsFromList();

    return {
        type: "PREPARE_APP_TIMES",
        test1: timeOptions,
        removeValues: busyTimes
    };
};

export const collectAppTime = (selectedTime) => {
    return {
        type: "COLLECT_APP_TIME",
        selectedTime
    };
};

export const collectRegNo = (selectedRegNo) => {
    return {
        type: "COLLECT_REG_NO",
        selectedRegNo
    };
};