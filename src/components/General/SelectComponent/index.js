import React, { useEffect, useRef } from "react";
import css from "./style.module.css";
import Select from "react-select";
import AsyncSelect from "react-select/async";

const SelectComponent = props => {
    const customStyles = {
        menu: (provided) => ({
            ...provided,
            borderBottom: '1px dotted pink',
            padding: 10,
        }),
        
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

    const errorMarkRef = useRef();
    const correctMarkRef = useRef();
    const selectComponentRef = useRef(); 

    useEffect(() => {
        errorMarkRef.current.style.visibility = "hidden";
        correctMarkRef.current.style.visibility = "hidden";
    }, []);

    const onChange = (e) => {
        if(e.value.length>0) {
            correctMarkRef.current.style.visibility = "visible";
            console.log(e.value, e.componentLabel);
            switch(e.componentLabel) {
                case "patientCitizenship":
                    props.setComponentInfo({ ...props.componentAllInfo, citizenship: e.value });
                    props.setFormCheck({ ...props.formCheckInfo, citizenship: false });
                    break;
                
                case "patientGender":
                    props.setComponentInfo({ ...props.componentAllInfo, gender: e.value });
                    props.setFormCheck({ ...props.formCheckInfo, gender: false });
                    break;

                case "city":
                    props.setComponentInfo({ ...props.componentAllInfo, city: e.value });
                    props.setFormCheck({ ...props.formCheckInfo,  city: false });
                    break;

                case "district":
                    props.setComponentInfo({ ...props.componentAllInfo, district: e.value });
                    props.setFormCheck({ ...props.formCheckInfo, district: false });
                    break;

                default:
                    break;
            }
            // props.setPatientInfo({ ...props.patientAllInfo, lname: value });
        } else {
            correctMarkRef.current.style.visibility = "hidden";
        }
    };

    return (
        <div className={css.FormControl}>
            <label className={css.Label}>{props.label}</label>
            <div className={css.Container}>
                <div ref={correctMarkRef}>
                    <i className={`${css.IconStyleCorrect} fas fa-check-circle`} />
                </div>
                <div ref={errorMarkRef}>
                    <i className={`${css.IconStyleWrong} fas fa-exclamation-circle`} />
                </div>
                
                {/* <AsyncSelect */}
                <Select 
                    ref={selectComponentRef}
                    // ref={props.ref1}
                    styles={customStyles}
                    defaultValue={props.value}
                    onChange={e => {props.onchangefunc(e); onChange(e) }} 
                    options={props.options} />
                <span></span>
            </div>
        </div>
        
    );
}

export default SelectComponent;