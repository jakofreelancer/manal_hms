import React, { useState } from "react";
import css from "./style.module.css";
// import Moment from "moment";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/appointmentActions";
import DatePicker from "../DatePicker";
import Button from "../../components/General/Button";
import TimePicker from "../TimePicker";
import RegNoInput from "../../components/RegNoInput";
import { db } from "../../firebase";

const AppointmentPicker = props => {
    // const [selectedDate, setSelectedDate] = useState(Moment(new Date()).format("YYYY-MM-DD"));
    const [timeOptions, setTimeOptions] = useState("Parent-с дамжуулав");

    // const handleChange = (e) => {
    //     setSelectedDate(e.target.value);
    // };

    // const loadOptions = () => {
    //     setTimeout(()=>{
    //         const response = props.test1;
    //         // const response = fetch(`https://www.anapioficeandfire.com/api/houses?region=The%20Vale&page=1&pageSize=10`);

    //         return {
    //             options: timeOptions
    //         }
    //     }, 2000);
    // };

    // const filterColors = inputValue => {
    //     return timeOptions.filter(i => {
    //             return i.label.toLowerCase().includes(inputValue)
    //         }
    //     );
    // };
    
    // const promiseOptions = inputValue =>
    //     new Promise(resolve => {
    //         setTimeout(() => {
    //             resolve(filterColors(inputValue));
    //         }, 1000);
    //     });

    const submitForm = (e) => {
        // props.collectRegNo()
        //appointmentsiin object
        // var myObj = {
        //     "user": props.selectedRegNo,
        //     "appDate": props.selectedDate,
        //     "appTime": props.selectedTime
        // };

        var registerAppTimesToServer = () => {
            var x = 0;

            for(x=0; x<props.selectedTime.length; x++) {
                db.collection("appointments").doc(props.selectedDate).collection("appTime").doc().set({
                    department: "Сэргээн засах эмчилгээ",
                    doctor: "Ж. Пагмадулам",
                    value: props.selectedTime[x].value,
                    label: props.selectedTime[x].label,
                    patientId: 1,
                    regDate: new Date(),
                    regBy: "Ж. Эрдэнэтөгс"
                }).then(() => {
                    console.log("Appointment time successfuly written!");
                    alert("Цаг захиалга амжилттай!");
                })
                .catch((error) => {
                    console.log("Appointment time failed!");
                });
            }
        }

        registerAppTimesToServer();
    };

    return (
        <div className={css.Profile}>
            <div className={css.ProfileUpdateForm}>
                Get a appointment<br/><br/>
                <RegNoInput /><br/>
                
                <DatePicker 
                    setTimeOptions={setTimeOptions} />
                <br/>
                <TimePicker 
                    timeOptions={timeOptions} />

                <Button text={"Цаг өгөх"} clicked={submitForm} />
                <hr/>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        selectedRegNo: state.appointmentReducer.selectedRegNo,
        selectedDate: state.appointmentReducer.selectedDate,
        selectedTime: state.appointmentReducer.selectedTime,
        testingValue: state.appointmentReducer.testingValue,
        test1: state.appointmentReducer.test1
    };
};

const mapDispatchToProps = dispatch => {
    return {
        collectRegNo: (selectedRegNo) => dispatch(actions.collectRegNo(selectedRegNo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentPicker);