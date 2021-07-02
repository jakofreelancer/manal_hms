import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/permissionSelector";
import css from "./style.module.css";
// import { css } from "react-select/src/components/Control";

const ProfileToolbar = props => {
    const location = {
        pathname: "/profile",
        state: { userId: props.userId }
    };

    // var currentPermission = localStorage.getItem("currentPermission");
    var permissions = localStorage.getItem("permission");

    const returnPermissionDescription = text => {
        switch(text) {
            case "doctor": return("Эмч")
            case "admin": return("Эрхлэгч")
            case "reception": return("Ресепшн")
            case "systemadmin": return ("Систем Админ")
            default: return (null)
        }
    }

    useEffect(() => {
        // setCurrentPermission(localStorage.getItem("currentPermission"));
    }, []);

    return (
        <div className="navbar-end">
            <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                    {props.currentPermissionFromApp && returnPermissionDescription(props.currentPermissionFromApp)}
                </a>
                <div className="navbar-dropdown">
                    <ul>
                    { permissions.split(",").map( (el, index) => {
                        if(el !== props.currentPermissionFromApp && el !== "systemadmin")
                            return (
                                // hover hiih
                                <li key={index} className={css.CustomLiBtn} onClick={() => {props.setCurrentPermissionFromApp(el); props.setCurrentPermission(el)}}>
                                    {returnPermissionDescription(el)}
                                </li>
                            )
                    })}
                    </ul>
                </div>
            </div>
            <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                    {`${props.lname}`.substring(0, 1)}.{props.fname}
                </a>
                <div className="navbar-dropdown">
                    <Link className="navbar-item" to="/dashboard">Хяналтын самбар</Link>
                    <Link className="navbar-item" to={location}>Бүртгэл</Link>
                    <Link className="navbar-item" to="/settings">Тохиргоо</Link>
                    <hr className="navbar-divider" />
                    <Link className="navbar-item" to="/logout">Гарах</Link>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        lname: state.signupLoginReducer.lname,
        fname: state.signupLoginReducer.fname,
        userId: state.signupLoginReducer.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setCurrentPermission: permission => dispatch(actions.setCurrentPermission(permission))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileToolbar);