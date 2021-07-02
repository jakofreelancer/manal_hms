import React, { useState } from 'react';
import { connect } from 'react-redux';
import './style.css';
import Button from '../../components/General/Button';
import * as actions from '../../redux/actions/signupActions';
import Spinner from "../../components/General/Spinner";
import { Redirect } from 'react-router-dom';
import firebase from "../../firebase";
import css from "./style.module.css";
import TextBox from '../../components/General/TextBox';
import SelectComponent from '../../components/General/SelectComponent';
//import css from "./style.module.css";

const Signup = props => {
    const [error, setError] = useState("");
    const optionsUserRole = [
        {value: "admin", label: "Админ"},
        {value: "reception", label: "Ресепшн"},
        {value: "doctor", label: "Эмч"}
    ];

    const [employeeInfo, setEmployeeInfo] = useState({
        email: "",
        lname: "",
        fname: "",
        regNo: "",
        phoneNo: "",
        permission: "",
        password1: "",
        password2: "",
        description: "",
        permission: {
            admin: false,
            systemadmin: false,
            doctor: false,
            reception: false,
        },
    });

    const [formCheck, setFormCheck] = useState({
        // errorMark: { required талбаруудын анхны утга true байх! энэ нь бөглөөгүй шууд submit хийсэн үед алдаа үзүүлэх зорилготой
        email: true,
        lname: true,
        fname: true,
        regNo: true,
        phoneNo: true,
        permission: true,
        password1: true,
        password2: true,
        description: "",
    });

    const [formErrors, setFormErrors] = useState({ lname: "", fname: "" });

    const asyncGetData = async () => {
        const currentDate = new Date();

        firebase
            .auth()
            .createUserWithEmailAndPassword(employeeInfo.email, employeeInfo.password1)
            .then((user) => {
                // console.log("3. inside of fb function!");
                resetInput();
                props.signupUser(
                    user.user.uid, 
                    employeeInfo.email, 
                    employeeInfo.password1, 
                    employeeInfo.lname, 
                    employeeInfo.fname, 
                    employeeInfo.regNo, 
                    employeeInfo.phoneNo, 
                    employeeInfo.description, 
                    employeeInfo.permission, 
                    currentDate, 
                    currentDate
                );
            })
            .then(() => {
                console.log("Appointment time successfuly written!");
                alert("Бүртгэл амжилттай");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const resetInput = () => {
        alert("resetInput worked!");
        console.log("4. resetInput worked!");
        setEmployeeInfo({...employeeInfo, 
            email: "", 
            password1: "",
            password2: "",
            lname: "",
            fname: "",
            regNo: "",
            phoneNo: "",
            description: ""
        });
    };

    const handleCheckbox = e => {
        console.log("e.target.value=>", e.target.value);
    }
    
    const onChange = e => {
        var {name, checked} = e.target;

        setEmployeeInfo(prevAttributes => ({
            ...prevAttributes,
            permission: { ...prevAttributes.permission, [name]: checked }
        }));
            // {...employeeInfo, permission: {...permission, admin: true}})
        console.log("e.target.value=>", e.target.name, e.target.checked);
    }

    const submit = (e) => {
        console.log("1. abc", employeeInfo);
        console.log(employeeInfo.permission);

        if(employeeInfo.password1 === employeeInfo.password2) {
            console.log("2. inside of if");
            asyncGetData();
        } else {
            setError("Нууц үгнүүд хоорондоо таарахгүй байна");
        }

        console.log(error);
        console.log(error.error);
    };

    var jumpPage = null;
    
    // if(props.userId) {
    //     switch(props.permission) {
    //         case "doctor" :
    //             jumpPage = <Redirect to='/doctor' />;
    //             break;

    //         case "reception" :
    //             jumpPage = <Redirect to='/reception' />;
    //             break;

    //         default:
    //             jumpPage = <Redirect to='/home' />;
    //     };
    // };

    return (
        <div className={css.Container}>
            {/* {
                (jumpPage !== null) ? jumpPage : ""

            } */}

            <TextBox label="Имэйл" 
                name="email"
                type="email"
                setComponentInfo={setEmployeeInfo}
                componentInfo={employeeInfo["email"]}
                componentAllInfo={employeeInfo}
                setWarning={setFormErrors}
                warning={formErrors["email"]}
                allwarnings={formErrors}
                setFormCheck={setFormCheck}
                formCheckInfo={formCheck} />
            <TextBox label="Овог"
                name="lName"
                setComponentInfo={setEmployeeInfo}
                componentInfo={employeeInfo["lname"]}
                componentAllInfo={employeeInfo}
                setWarning={setFormErrors}
                warning={formErrors["lname"]}
                allwarnings={formErrors}
                setFormCheck={setFormCheck}
                formCheckInfo={formCheck} />
            <TextBox label="Нэр" 
                name="fName" 
                setComponentInfo={setEmployeeInfo}
                componentInfo={employeeInfo["fname"]}
                componentAllInfo={employeeInfo}
                setWarning={setFormErrors}
                warning={formErrors["fname"]}
                allwarnings={formErrors}
                setFormCheck={setFormCheck}
                formCheckInfo={formCheck} />
            <TextBox label="Регистрийн дугаар" 
                name="regNo"
                setComponentInfo={setEmployeeInfo}
                componentInfo={employeeInfo["regNo"]}
                componentAllInfo={employeeInfo}
                setWarning={setFormErrors}
                warning={formErrors["regNo"]}
                allwarnings={formErrors}
                setFormCheck={setFormCheck}
                formCheckInfo={formCheck} />
            <TextBox label="Утас" 
                name="phoneNo"
                setComponentInfo={setEmployeeInfo}
                componentInfo={employeeInfo["phoneNo"]}
                componentAllInfo={employeeInfo}
                setWarning={setFormErrors}
                warning={formErrors["phoneNo"]}
                allwarnings={formErrors}
                setFormCheck={setFormCheck}
                formCheckInfo={formCheck} />
            {/* Энд permission checkbox хийж inputvalue-г submit үед console-оор шалгах */}
            <hr/>
                <div>
                    <input type="checkbox" name="admin" onChange={e => onChange(e)} />Эрхлэгч
                    <input type="checkbox" name="doctor" onChange={e => onChange(e)} />Эмч
                    <input type="checkbox" name="reception" onChange={e => onChange(e)} />Ресепшн
                </div>
            <hr/>
            {/* <SelectComponent label="Хэрэглэгчийн эрх" options={optionsUserRole} onchangefunc={(e) => {setEmployeeInfo({...employeeInfo, permission: e.value}); onChange(e)}} /> */}
            <TextBox label="Тайлбар" 
                name="description"
                setComponentInfo={setEmployeeInfo}
                componentInfo={employeeInfo["description"]}
                componentAllInfo={employeeInfo}
                setWarning={setFormErrors}
                warning={formErrors["description"]}
                allwarnings={formErrors}
                setFormCheck={setFormCheck}
                formCheckInfo={formCheck} />
            <TextBox label="Нууц үг" 
                name="password1" 
                type="password"
                setComponentInfo={setEmployeeInfo}
                componentInfo={employeeInfo["password1"]}
                componentAllInfo={employeeInfo}
                setWarning={setFormErrors}
                warning={formErrors["password1"]}
                allwarnings={formErrors}
                setFormCheck={setFormCheck}
                formCheckInfo={formCheck} />
            <TextBox label="Нууц үг давтах" 
                name="password2"
                type="password"
                setComponentInfo={setEmployeeInfo}
                componentInfo={employeeInfo["password2"]}
                componentAllInfo={employeeInfo}
                setWarning={setFormErrors}
                warning={formErrors["password2"]}
                allwarnings={formErrors}
                setFormCheck={setFormCheck}
                formCheckInfo={formCheck} />

            <br/><br/>
            {props.authServerError && <div style={{ color: "red" }}>{props.authServerError}</div>}
            {props.saving && <Spinner />}
            <Button text="Бүртгүүлэх" clicked={submit} />
            <br />
            {/* <small>
                <em>Нууц үгээ мартсан?</em>
            </small> */}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        saving: state.signupLoginReducer.saving,
        authServerError: state.signupLoginReducer.authServerError,
        authServerErrorCode: state.signupLoginReducer.authServerErrorCode,
        userId: state.signupLoginReducer.userId,
        permission: state.signupLoginReducer.permission
    };
};

const mapDispatchToProps = dispatch => {
    return {
        signupUser: (   uId,
            email, 
            password, 
            lname, 
            fname, 
            regNo, 
            phoneNo, 
            description, 
            permission,
            createdDate, 
            modifiedDate
        ) => 
            dispatch(actions.signupUser(uId,
                email, 
                password, 
                lname, 
                fname, 
                regNo, 
                phoneNo, 
                description, 
                permission,
                createdDate, 
                modifiedDate
            ))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
// export default Signup;