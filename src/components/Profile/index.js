import React, { useEffect, useState } from "react";
import css from "./style.module.css";
import { db } from "../../firebase";
import Button from "../../components/General/Button";
import TextBox from "../General/TextBox";
import SelectComponent from "../General/SelectComponent";
import AsyncSelect from "react-select/async";
import AsyncSelectComponent from "../../components/General/AsyncSelectComponent";
// import firebase from "firebase/app";

const Profile = props => {
    // alert(props.location.state.userId);
    const [email, setEmail] = useState();
    const [lname, setLname] = useState();
    const [fname, setFname] = useState();
    const [userRole, setUserRole] = useState();
    const [description, setDescription] = useState();
    const [createdDate, setCreatedDate] = useState();
    const [modifiedDate, setModifiedDate] = useState();
    const [phoneNo, setPhoneNo] = useState();
    const [regNo, setRegNo] = useState();
    const [defaultValue, setDefaultValue] = useState();
    const optionsUserRole = [
        // <option value="admin">Админ</option>
        // <option value="reception">Ресепшн</option>
        // <option value="doctor">Эмч</option>
        {value: "admin", label: "Админ"},
        {value: "reception", label: "Ресепшн"},
        {value: "doctor", label: "Эмч"}
    ];

    const optionsTest = [
        {value: "haha", label: "hoho"}
    ];

    const asyncGetData = async () => {
        db.collection("employees").where("uId", "==", props.location.state.userId).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                setEmail(doc.data().email);
                setLname(doc.data().lname);
                setFname(doc.data().fname);
                setUserRole(doc.data().userRole);
                setDescription(doc.data().description);
                setCreatedDate(new Date(doc.data().createdDate.toDate()).toLocaleDateString("en-US"));
                setModifiedDate(new Date(doc.data().modifiedDate.toDate()).toLocaleDateString("en-US"));
                setPhoneNo(doc.data().phoneNo);
                setRegNo(doc.data().regNo);
                setDefaultValue(optionsUserRole.filter(d => d.value.includes(doc.data().userRole))[0]);
                // console.log(defaultValue);
                // console.log(userRole);
                console.log(doc.data().userRole);
                console.log(optionsUserRole.filter(d => d.value.includes(doc.data().userRole))[0]);
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        })
    };
    

    useEffect(() => {
        asyncGetData();
    }, []);

    const updateProfile = e => {
        // e.preventDefault();

        db.collection("employees").doc(props.location.state.userId).update({
            lname: lname,
            fname: fname,
            userRole: userRole,
            description: description,
            phoneNo: phoneNo,
            regNo: regNo
        })
        .then(() => {
            alert("Updated!!!");
        })
        .catch((error) => {
            alert("error occured!!!");
        })
    };

    const changeUserRole = el => {
        // console.log("hahaha", el);
        setUserRole(el.value);
    };

    const changeEmail = el => {
        console.log("email change", el.target);
        setEmail(el.target.value);
    }

    const changeLname = el => {
        console.log("object", el.target.value);
        setLname(el.target.value);
    };

    const changeFname = el => {
        setFname(el.value);
    };

    const changeDescription = el => {
        setDescription(el.value);
    };

    const changePhoneNo = el => {
        setPhoneNo(el.value);
    };

    const changeRegNo = el => {
        setRegNo(el.value);
    };

    const promiseOptions = (inputValue) =>
        new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });

    return (
        <div className={css.Profile}>
            <div className={css.ProfileUpdateForm}>
                <div className={css.Form}>
                    <TextBox label="Имэйл" name="email" value={email} onchangefunc={(e) => changeEmail(e)} />
                    <TextBox label="Овог" name="lname" value={lname} onchangefunc={(e) => changeLname(e)} />
                    <TextBox label="Нэр" name="fname" value={fname} onchangefunc={(e) => changeFname(e)} />
                    {/* <AsyncSelect defaultOptions={optionsUserRole} value={defaultValue} onChange={changeUserRole} /> */}
                    <AsyncSelectComponent label="Хэрэглэгчийн эрх" optionsUserRole={optionsUserRole} defaultValue={defaultValue} changeUserRole={changeUserRole} />
                    {/* <SelectComponent label="Хэрэглэгчийн эрх" value={defaultValue} options={optionsUserRole} onchangefunc={(e) => changeUserRole(e)} /> */}
                    <TextBox label="Тайлбар" value={description} onchangefunc={(e) => changeDescription(e)} />
                    <TextBox label="Утасны дугаар" value={phoneNo} onchangefunc={(e) => changePhoneNo(e)} />
                    <TextBox label="Регистрийн дугаар" value={regNo} onchangefunc={(e) => changeRegNo(e)} />
                    
                    {/* <div className={css.FormControl}>
                        <label className={css.Label}>Хэрэглэгчийн эрх</label>
                        <div>
                            <select name="userRole" className={css.SelectStyle} value={userRole} onChange={changeUserRole}>
                                <option value="admin">Админ</option>
                                <option value="reception">Ресепшн</option>
                                <option value="doctor">Эмч</option>
                            </select>
                            {/* <div className={css.}></div> 
                        </div>
                        <span className={css.FocusInput}></span>
                    </div> */}

                    
                    
                    <br/> <br/>
                    <Button text="Шинэчлэх" clicked={updateProfile} />
                </div>
            </div>
        </div>
    )
}

export default Profile;