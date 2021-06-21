import React from "react";
import AsyncSelect from "react-select/async";
import css from "./style.module.css";

const AsyncSelectComponent = props => {
    const customStyles = {
        
        // control: (_, { selectProps: { width }}) => ({
        //     width: width
        // }),
        control: base => ({
            ...base,
            width: "100%",
            borderColor: "green",
            "&:active": {
                borderColor: "green",
            },
            "&:hover": {
                borderColor: "green",
                color: "purple"
            }
        }),

        container: base => ({
            ...base,
            marginTop: "3px",
            width: "100%",
            marginBottom: "10px",
        }),
    
        singleValue: base => ({
            ...base,
            width: "100%",
            color: "inherit"
        })
    };

    return (
        <div className={css.FormControl}>
            <label className={css.Label}>{props.label}</label>
            <div className={css.Container}>
                <AsyncSelect defaultOptions={props.optionsUserRole} styles={customStyles} value={props.defaultValue} onChange={props.changeUserRole} />
            </div>
        </div>
    );
};

export default AsyncSelectComponent;