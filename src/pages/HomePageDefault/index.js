import React from 'react';
import { connect } from "react-redux";
// import AppointmentContainer from '../../components/AppointmentContainer';
// import css from "./style.module.css";

const Home = props => {
    return (
        <>
        </>
    );
};

const mapStateToProps = state => {
    return {
        userId: state.signupLoginReducer.userId,
        userRole: state.signupLoginReducer.userRole
    };
};

export default connect(mapStateToProps)(Home);