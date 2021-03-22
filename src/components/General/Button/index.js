import React from "react";

const Button = (props) => (
    <button 
        onClick={props.clicked}
        className="button is-block is-primary is-fullwidth is-medium"
    >
        {props.text}
    </button>
);

export default Button;