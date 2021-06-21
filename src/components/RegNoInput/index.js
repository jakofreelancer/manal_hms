import React from "react";
import css from "./style.module.css";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/appointmentActions";

const RegNoInput = props => {
    const handleChange = e => {
        props.collectRegNo(e.target.value);
    }

    return (
        <input className={css.Input} valuetype="text" onChange={handleChange} placeholder="Хайлт: [Регистрийн дугаар, Гадаад пасспортын дугаар]" />
    );
};

const mapDispatchToProps = dispatch => {
    return {
        collectRegNo: selectedRegNo => dispatch(actions.collectRegNo(selectedRegNo))
    };
};

export default connect(null, mapDispatchToProps)(RegNoInput);