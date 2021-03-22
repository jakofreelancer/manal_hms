import React from 'react';
import Toolbar from "../../components/General/Toolbar";
import { connect } from "react-redux";

const Home = props => {
    return (
        <>
            <Toolbar />
            {props.userId} <br/>
            {props.userId} <br/>
            {props.userId} <br/>
            {props.userId} <br/>
            {props.userId} <br/>
            {props.userId} <br/>
            {props.userId} <br/>
            {props.userId}
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