import React, { useState } from 'react';
import * as actions from "../../redux/actions/appointmentActions";
import { connect } from "react-redux";
import AsyncSelect from 'react-select/async';

const TimePicker = props => {

    const filterColors = (inputValue) => {
        if(props.timeOptions===null || props.timeOptions===undefined || typeof(props.timeOptions)==='string') {
            return '';
        }
        else {
            console.log("RETURN NOT EMPTY!!!", props.timeOptions);
            return props.timeOptions.filter(i => {
                return i.label.toLowerCase().includes(inputValue);
            });
        }
    };

    const promiseOptions = (inputValue) =>
        new Promise(resolve => {
            setTimeout(() => {
                resolve(filterColors(inputValue));
            }, 1000);
        });

    const onChangeSelectedOption = inputValue => {
        props.collectAppTime(inputValue);
    };

    return (
        <>
            <AsyncSelect
                isMulti
                defaultOptions
                key={props.timeOptions}
                loadOptions={promiseOptions}
                onChange={onChangeSelectedOption}
            />
            <br/><br/>
            {/* {typeof(props.timeOptions) === "string" && 
                <div>{props.timeOptions}</div>}
            {typeof(props.timeOptions) === "object" &&
                <div>{JSON.stringify(props.timeOptions)}</div>} */}
        </>
    );
};

const mapStateToProps = state => {
    return {
        selectedDate: state.appointmentReducer.selectedDate,
        test1: state.appointmentReducer.test1
    };
};

const mapDispatchToProps = dispatch => {
    return {
        collectAppTime: (selectedTime) => dispatch(actions.collectAppTime(selectedTime))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimePicker);