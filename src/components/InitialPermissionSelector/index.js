import React, { useState, useEffect } from "react";
import Button from "../General/Button";
import Modal from "../General/Modal";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/permissionSelector";
import css from "./style.module.css";
import Menu from "../Menu";

const InitialPermissionSelector = props => {
    const [selectPermission, setSelectPermission] = useState(false);

    const closeModal = () => {
        setSelectPermission(true);
    };

    const handleChange = thePermission => {
        console.log("change", thePermission);
        props.setCurrentPermission(thePermission);
    }

    const returnPermissionDescription = (el) => {
        switch(el) {
            case "doctor": return("Эмч")
            case "admin": return("Эрхлэгч")
            case "reception": return("Ресепшн")
            case "systemadmin": return ("Систем Админ")
            default: return (null)
        }
    };

    useEffect(() => {
        var permissions = localStorage.getItem("permission");
        var currentPermission = localStorage.getItem("currentPermission");
        if(permissions.includes(currentPermission) === true) {
            switch(currentPermission) {
                case "doctor":
                    setSelectPermission(true);
                    alert("doctor");
                    break;
                case "reception":
                    setSelectPermission(true);
                    alert("reception");
                    break;
                case "systemadmin":
                    setSelectPermission(true);
                    alert("system admin");
                    break;
                case "admin":
                    setSelectPermission(true);
                    alert("admin");
                    break;
                default: 
                    setSelectPermission(false);
                    break;
            }
        } else {
            props.setCurrentPermission(null);
        }
    }, []);

    return (
        <div>
            <Modal isSelectedPermission={selectPermission}>
                <h3 style={{textAlign: "center"}}>Нэвтрэх эрхээ сонгоно уу</h3> <br/>

                { props.permission.split(",").map( (el, index) => (
                    <div key={index}>
                        <Button text={returnPermissionDescription(el)} clicked={() => {closeModal(); handleChange(el)}} /><br/>
                    </div>
                )) }
            </Modal>
            {selectPermission ? <Menu /> : null}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        permission: state.signupLoginReducer.permission,
        currentPermission: state.permissionSelectorReducer.currentPermission
    };
};
const mapDispatchToProps = dispatch => {
    return {
        setCurrentPermission: permission => dispatch(actions.setCurrentPermission(permission))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InitialPermissionSelector);