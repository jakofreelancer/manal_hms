import React from "react";
import css from "./style.module.css";
import Shadow from "../Shadow";

const Modal = props => {
    return (
        <>
            <Shadow show={!props.isSelectedPermission} />
            <div style={{
                transform: !props.isSelectedPermission ? "translateY(0)" : "translateY(-100vh)", 
                opacity: !props.isSelectedPermission ? "1" : "0"
                }} 
                className={css.Modal}
            >
                {props.children}
            </div>
        </>
    )
}

export default Modal;