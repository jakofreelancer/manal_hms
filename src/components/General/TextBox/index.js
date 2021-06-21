import React, { useState, useEffect, useRef } from "react";
import css from "./style.module.css";

const TextBox = props => {
    const [warning, setWarning] = useState();
    const errorMarkRef = useRef();
    const correctMarkRef = useRef();

    let styles = {
        color: "red",
        backgroundColor: "black",
        visibility: "hidden",
    };

    useEffect(() => {
        errorMarkRef.current.style.visibility = "hidden";
        correctMarkRef.current.style.visibility = "hidden";
    }, []);

    // errorMarkRef.current.style.visibility = "hidden";
    // const [errorMark, setErrorMark] = useState(false);
    // const [correctMark, setCorrectMark] = useState(props);
    
    // useEffect(() => {
    //     console.log("componentDidMount worked!", props.genObject);
    // }, []);

    // useEffect(() => {
    //     console.log("CHECKING...............", props.errorMark);
    //     setErrorMark()
    // }, [errorMark, correctMark]);

    // const warning = ""
    const handleChange = e => {
        e.target.value = e.target.value.toUpperCase();
        const { value, name } = e.target;
        
        switch (name) {
            case "lName": //required input*
                setTimeout(() => {
                    props.setWarning({ 
                        ...props.allwarnings, 
                        lname: value.length<2 && value.length>0 
                            ? "хамгийн багадаа 2 тэмдэгт оруулна уу" : ""
                    });
                    if(value.length<2 && value.length>0) {
                        props.setFormCheck({ ...props.formCheckInfo, lname: true });
                        errorMarkRef.current.style.visibility = "visible";
                        correctMarkRef.current.style.visibility = "hidden";
                    } else if(value.length === 0) {
                        props.setFormCheck({ ...props.formCheckInfo, lname: true });
                        correctMarkRef.current.style.visibility = "hidden";
                        errorMarkRef.current.style.visibility = "hidden";
                    } else {
                        props.setFormCheck({ ...props.formCheckInfo, lname: false });
                        errorMarkRef.current.style.visibility = "hidden";
                        correctMarkRef.current.style.visibility = "visible";
                    }
                }, 0);
                
                props.setComponentInfo({ ...props.componentAllInfo, lname: value });
                break;
            case "fName": //required input*
                setTimeout(() => {
                    props.setWarning({ 
                        ...props.allwarnings, 
                        fname: value.length<2 && value.length>0 
                            ? "хамгийн багадаа 2 тэмдэгт оруулна уу" : ""
                    });
                }, 0);

                if(value.length<2 && value.length>0) {
                    props.setFormCheck({ ...props.formCheckInfo, fname: true });
                    errorMarkRef.current.style.visibility = "visible";
                    correctMarkRef.current.style.visibility = "hidden";
                } else if(value.length === 0) {
                    props.setFormCheck({ ...props.formCheckInfo, fname: true });
                    correctMarkRef.current.style.visibility = "hidden";
                    errorMarkRef.current.style.visibility = "hidden";
                } else {
                    props.setFormCheck({ ...props.formCheckInfo, fname: false });
                    errorMarkRef.current.style.visibility = "hidden";
                    correctMarkRef.current.style.visibility = "visible";
                }

                props.setComponentInfo({ ...props.componentAllInfo, fname: value });
                break;
            case "regNo": //required input*
                props.setComponentInfo({ ...props.componentAllInfo, regNo: value });
                setTimeout(() => {
                    props.setWarning({ 
                        ...props.allwarnings, 
                        regNo: (value.length<10 && value.length>0) || value.length>10
                            ? "регистрийн дугаараа зөв эсэхийг шалгана уу" : ""
                    });
                }, 0);

                if((value.length<10 && value.length>0) || value.length>10) {
                    props.setFormCheck({ ...props.formCheckInfo, regNo: true });
                    errorMarkRef.current.style.visibility = "visible";
                    correctMarkRef.current.style.visibility = "hidden";
                } else if(value.length === 0) {
                    props.setFormCheck({ ...props.formCheckInfo, regNo: true });
                    correctMarkRef.current.style.visibility = "hidden";
                    errorMarkRef.current.style.visibility = "hidden";
                } else {
                    props.setFormCheck({ ...props.formCheckInfo, regNo: false });
                    errorMarkRef.current.style.visibility = "hidden";
                    correctMarkRef.current.style.visibility = "visible";
                };

                break;
            case "phoneNo": //required input*
                props.setComponentInfo({ ...props.componentAllInfo, phoneNo: value });
                setTimeout(() => {
                    props.setWarning({
                        ...props.allwarnings, 
                        phoneNo: (value.length<8 && value.length>0) || value.length>8
                            ? "утасны дугаараа зөв эсэхийг шалгана уу" : ""
                    });
                }, 0);

                if((value.length<8 && value.length>0) || value.length>8) {
                    props.setFormCheck({ ...props.formCheckInfo, phoneNo: true });
                    errorMarkRef.current.style.visibility = "visible";
                    correctMarkRef.current.style.visibility = "hidden";
                    // console.log("change show error mark true", props.errorMark);
                } else if(value.length === 0) {
                    props.setFormCheck({ ...props.formCheckInfo, phoneNo: true });
                    correctMarkRef.current.style.visibility = "hidden";
                    errorMarkRef.current.style.visibility = "hidden";
                } else {
                    props.setFormCheck({ ...props.formCheckInfo, phoneNo: false });
                    errorMarkRef.current.style.visibility = "hidden";
                    correctMarkRef.current.style.visibility = "visible";
                    // console.log("change show error mark false", props.errorMark);
                };
                
                break;
            case "email":
                props.setComponentInfo({ ...props.componentAllInfo, email: value });
                setTimeout(() => {
                    props.setWarning({ 
                        ...props.allwarnings, 
                        // email: value.length<2 && value.length>0 
                        //     ? "хамгийн багадаа 2 тэмдэгт оруулна уу" : ""
                    });
                }, 0);

                if(value.length<2 && value.length>0) {
                    props.setFormCheck({ ...props.formCheckInfo, email: true });
                    errorMarkRef.current.style.visibility = "visible";
                    correctMarkRef.current.style.visibility = "hidden";
                } else if(value.length === 0) {
                    props.setFormCheck({ ...props.formCheckInfo, email: true });
                    correctMarkRef.current.style.visibility = "hidden";
                    errorMarkRef.current.style.visibility = "hidden";
                } else {
                    props.setFormCheck({ ...props.formCheckInfo, email: false });
                    errorMarkRef.current.style.visibility = "hidden";
                    correctMarkRef.current.style.visibility = "visible";
                }
                break;
            case "khoroo": //required input*
                props.setComponentInfo({ ...props.componentAllInfo, khoroo: value });
                if(value.length<1 && value.length>0) {
                    props.setFormCheck({ ...props.formCheckInfo, khoroo: true });
                    errorMarkRef.current.style.visibility = "visible";
                    correctMarkRef.current.style.visibility = "hidden";
                } else if(value.length === 0) {
                    props.setFormCheck({ ...props.formCheckInfo, khoroo: true });
                    correctMarkRef.current.style.visibility = "hidden";
                    errorMarkRef.current.style.visibility = "hidden";
                } else {
                    props.setFormCheck({ ...props.formCheckInfo, khoroo: false });
                    errorMarkRef.current.style.visibility = "hidden";
                    correctMarkRef.current.style.visibility = "visible";
                }
                // props.setWarning({ 
                //     ...props.allwarnings, 
                //     khoroo: value.length<2 && value.length>0 
                //         ? "хамгийн багадаа 2 тэмдэгт оруулна уу" : ""
                // });
                break;
            case "building":
                props.setComponentInfo({ ...props.componentAllInfo, building: value });
                // props.setFormCheck({ ...props.formCheckInfo, building: true });
                // props.setWarning({ 
                //     ...props.allwarnings, 
                //     building: value.length<2 && value.length>0 
                //         ? "хамгийн багадаа 2 тэмдэгт оруулна уу" : ""
                // });
                break;

            case "orgRegNo": //required input*
                setTimeout(() => {
                    props.setWarning({ 
                        ...props.allwarnings, 
                        orgRegNo: value.length<7 && value.length>0 
                            ? "хамгийн багадаа 7 тэмдэгт оруулна уу" : ""
                    });
                    if((value.length<7 && value.length>0) || value.length>7) {
                        props.setFormCheck({ ...props.formCheckInfo, orgRegNo: true });
                        errorMarkRef.current.style.visibility = "visible";
                        correctMarkRef.current.style.visibility = "hidden";
                    } else if(value.length === 0) {
                        props.setFormCheck({ ...props.formCheckInfo, orgRegNo: true });
                        correctMarkRef.current.style.visibility = "hidden";
                        errorMarkRef.current.style.visibility = "hidden";
                    } else {
                        props.setFormCheck({ ...props.formCheckInfo, orgRegNo: false });
                        errorMarkRef.current.style.visibility = "hidden";
                        correctMarkRef.current.style.visibility = "visible";
                    }
                }, 0);
                
                props.setComponentInfo({ ...props.componentAllInfo, orgRegNo: value });
                break;

            case "hospitalName": //required input*
                setTimeout(() => {
                    props.setWarning({ 
                        ...props.allwarnings, 
                        hospitalName: value.length<7 && value.length>0 
                            ? "" : ""
                    });
                    if(value.length<2 && value.length>0) {
                        props.setFormCheck({ ...props.formCheckInfo, hospitalName: true });
                        errorMarkRef.current.style.visibility = "visible";
                        correctMarkRef.current.style.visibility = "hidden";
                    } else if(value.length === 0) {
                        props.setFormCheck({ ...props.formCheckInfo, hospitalName: true });
                        correctMarkRef.current.style.visibility = "hidden";
                        errorMarkRef.current.style.visibility = "hidden";
                    } else {
                        props.setFormCheck({ ...props.formCheckInfo, hospitalName: false });
                        errorMarkRef.current.style.visibility = "hidden";
                        correctMarkRef.current.style.visibility = "visible";
                    }
                }, 0);
                
                props.setComponentInfo({ ...props.componentAllInfo, hospitalName: value });
                break;

            case "departmentName": //required input*
                setTimeout(() => {
                    props.setWarning({ 
                        ...props.allwarnings, 
                        departmentName: value.length<7 && value.length>0 
                            ? "" : ""
                    });
                    if(value.length<2 && value.length>0) {
                        props.setFormCheck({ ...props.formCheckInfo, departmentName: true });
                        errorMarkRef.current.style.visibility = "visible";
                        correctMarkRef.current.style.visibility = "hidden";
                    } else if(value.length === 0) {
                        props.setFormCheck({ ...props.formCheckInfo, departmentName: true });
                        correctMarkRef.current.style.visibility = "hidden";
                        errorMarkRef.current.style.visibility = "hidden";
                    } else {
                        props.setFormCheck({ ...props.formCheckInfo, departmentName: false });
                        errorMarkRef.current.style.visibility = "hidden";
                        correctMarkRef.current.style.visibility = "visible";
                    }
                }, 0);
                
                props.setComponentInfo({ ...props.componentAllInfo, departmentName: value });
                break;

            case "officePhoneNo": //required input*
                setTimeout(() => {
                    props.setWarning({ 
                        ...props.allwarnings, 
                        officePhoneNo: value.length<7 && value.length>0 
                            ? "" : ""
                    });
                    if(value.length<8 && value.length>0) {
                        props.setFormCheck({ ...props.formCheckInfo, officePhoneNo: true });
                        errorMarkRef.current.style.visibility = "visible";
                        correctMarkRef.current.style.visibility = "hidden";
                    } else if(value.length === 0) {
                        props.setFormCheck({ ...props.formCheckInfo, officePhoneNo: true });
                        correctMarkRef.current.style.visibility = "hidden";
                        errorMarkRef.current.style.visibility = "hidden";
                    } else {
                        props.setFormCheck({ ...props.formCheckInfo, officePhoneNo: false });
                        errorMarkRef.current.style.visibility = "hidden";
                        correctMarkRef.current.style.visibility = "visible";
                    }
                }, 0);
                
                props.setComponentInfo({ ...props.componentAllInfo, officePhoneNo: value });
                break;

            case "password1": //required input*
                setTimeout(() => {
                    props.setWarning({ 
                        ...props.allwarnings, 
                        password1: value.length<7 && value.length>0 
                            ? "" : ""
                    });
                    if(value.length<8 && value.length>0) {
                        props.setFormCheck({ ...props.formCheckInfo, password1: true });
                        errorMarkRef.current.style.visibility = "visible";
                        correctMarkRef.current.style.visibility = "hidden";
                    } else if(value.length === 0) {
                        props.setFormCheck({ ...props.formCheckInfo, password1: true });
                        correctMarkRef.current.style.visibility = "hidden";
                        errorMarkRef.current.style.visibility = "hidden";
                    } else {
                        props.setFormCheck({ ...props.formCheckInfo, password1: false });
                        errorMarkRef.current.style.visibility = "hidden";
                        correctMarkRef.current.style.visibility = "visible";
                    }
                }, 0);
                
                props.setComponentInfo({ ...props.componentAllInfo, password1: value });
                break;

            case "password2": //required input*
                setTimeout(() => {
                    props.setWarning({ 
                        ...props.allwarnings, 
                        password2: value.length<7 && value.length>0 
                            ? "" : ""
                    });
                    if(value.length<8 && value.length>0) {
                        props.setFormCheck({ ...props.formCheckInfo, password2: true });
                        errorMarkRef.current.style.visibility = "visible";
                        correctMarkRef.current.style.visibility = "hidden";
                    } else if(value.length === 0) {
                        props.setFormCheck({ ...props.formCheckInfo, password2: true });
                        correctMarkRef.current.style.visibility = "hidden";
                        errorMarkRef.current.style.visibility = "hidden";
                    } else {
                        props.setFormCheck({ ...props.formCheckInfo, password2: false });
                        errorMarkRef.current.style.visibility = "hidden";
                        correctMarkRef.current.style.visibility = "visible";
                    }
                }, 0);
                
                props.setComponentInfo({ ...props.componentAllInfo, password2: value });
                break;

            case "description":
                props.setComponentInfo({ ...props.componentAllInfo, description: value });
                break;

            case "hospEmail": //required input*
                setTimeout(() => {
                    props.setWarning({ 
                        ...props.allwarnings, 
                        hospEmail: value.length<7 && value.length>0 
                            ? "" : ""
                    });
                    if(value.length<8 && value.length>0) {
                        props.setFormCheck({ ...props.formCheckInfo, hospEmail: true });
                        errorMarkRef.current.style.visibility = "visible";
                        correctMarkRef.current.style.visibility = "hidden";
                    } else if(value.length === 0) {
                        props.setFormCheck({ ...props.formCheckInfo, hospEmail: true });
                        correctMarkRef.current.style.visibility = "hidden";
                        errorMarkRef.current.style.visibility = "hidden";
                    } else {
                        props.setFormCheck({ ...props.formCheckInfo, hospEmail: false });
                        errorMarkRef.current.style.visibility = "hidden";
                        correctMarkRef.current.style.visibility = "visible";
                    }
                }, 0);
                
                props.setComponentInfo({ ...props.componentAllInfo, hospEmail: value });
                break;

            case "departmentEmail": //required input*
                setTimeout(() => {
                    props.setWarning({ 
                        ...props.allwarnings, 
                        departmentEmail: value.length<7 && value.length>0 
                            ? "" : ""
                    });
                    if(value.length<8 && value.length>0) {
                        props.setFormCheck({ ...props.formCheckInfo, departmentEmail: true });
                        errorMarkRef.current.style.visibility = "visible";
                        correctMarkRef.current.style.visibility = "hidden";
                    } else if(value.length === 0) {
                        props.setFormCheck({ ...props.formCheckInfo, departmentEmail: true });
                        correctMarkRef.current.style.visibility = "hidden";
                        errorMarkRef.current.style.visibility = "hidden";
                    } else {
                        props.setFormCheck({ ...props.formCheckInfo, departmentEmail: false });
                        errorMarkRef.current.style.visibility = "hidden";
                        correctMarkRef.current.style.visibility = "visible";
                    }
                }, 0);

                props.setComponentInfo({ ...props.componentAllInfo, departmentEmail: value });
                break;

            case "departmentPhoneNo": //required input*
                setTimeout(() => {
                    props.setWarning({ 
                        ...props.allwarnings, 
                        departmentPhoneNo: value.length<7 && value.length>0 
                            ? "" : ""
                    });
                    if(value.length<8 && value.length>0) {
                        props.setFormCheck({ ...props.formCheckInfo, departmentPhoneNo: true });
                        errorMarkRef.current.style.visibility = "visible";
                        correctMarkRef.current.style.visibility = "hidden";
                    } else if(value.length === 0) {
                        props.setFormCheck({ ...props.formCheckInfo, departmentPhoneNo: true });
                        correctMarkRef.current.style.visibility = "hidden";
                        errorMarkRef.current.style.visibility = "hidden";
                    } else {
                        props.setFormCheck({ ...props.formCheckInfo, departmentPhoneNo: false });
                        errorMarkRef.current.style.visibility = "hidden";
                        correctMarkRef.current.style.visibility = "visible";
                    }
                }, 0);
                
                props.setComponentInfo({ ...props.componentAllInfo, departmentPhoneNo: value });
                break;

            default:
                break;
        };
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
                <input name={props.name} value={props.value} onChange={e => {handleChange(e) }} type={props.type} />
            </div>
            {/* <br/> */}
            {/* Correct: {} <br/> */}
            {/* Error: {} */}
            <span className={css.Error}>{props.warning}</span>
        </div>
    );
}

export default TextBox;