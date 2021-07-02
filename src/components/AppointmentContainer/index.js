import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
// import Profile from "../Profile";
import css from "./style.module.css";
import Button from "../General/Button";
import PatientRegistrationForm from "../PatientRegistrationForm";
import * as actions from "../../redux/actions/appointmentActions";
import { db } from "../../firebase";
import TimePicker from "../TimePicker";
import DatePicker from "../DatePicker";
// import AutoCompleteText from "../AutoCompleteText";
// import countires from "../AutoCompleteText/countries";
// import countries from "../AutoCompleteText/countries";

const AppointmentContainer = props => {
    // const [selectCity, setSelectCity] = useState();
    // const [selectCity] = useState();
    // const [selectDistrict, setSelectDistrict] = useState();
    // const [selectKhoroo, setSelectKhoroo] = useState();

    // const FieldValue = require('firebase-admin').firestore.FieldValue;
    const [buttonText, setButtonText] = useState("Үйлчлүүлэгчийг бүртгэх");
    const [currentUser, setCurrentUser] = useState({});
    const [timeOptions, setTimeOptions] = useState("Parent-с дамжуулав");
    const [chosenDate, setChosenDate] = useState(props.selectedDate);
    const [chosenTime, setChosenTime] = useState(props.selectedTime);
    const [displayNewPatientForm, setDisplayNewPatientForm] = useState(false);
    const inputRef = React.createRef();

    useEffect(() => {
        // alert("now it works!!!");
        setChosenDate(props.selectedDate);
        setChosenTime(props.selectedTime);
        console.log("CHOSEN DATE: ", chosenDate);
        console.log("CHOSEN TIME: ", chosenTime);
    });

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const registerNewPatient = (obj) => {
        setDisplayNewPatientForm(!displayNewPatientForm);
        console.log("testing no1: ", obj);
        
        // const db = firebase.firestore();
        // const increment = firebase.firestore.FieldValue.increment(-1);
        // const curUser = db.collection("employees").doc("CwfbT7143zcA8ZgOSqp6sYOnWaw1");
        // curUser.update({ patientId: firebase.firestore.FieldValue.serverTimestamp() });
        // curUser.update({ patientId: increment });
        console.log(new Date().getTime());
        
        // console.log("timestamp", firebase.firestore.FieldValue.serverTimestamp());
        // console.log("firebase", firebase.firestore.FieldValue.increment(1));
        // console.log("testing value db fieldvalue", FieldValue );
    }

    const bookAppointment = () => {
        props.collectRegNo(currentUser.regNo);
    }

    var registerAppTimesToServer = () => {
        var x = 0;

        for(x=0; x<props.selectedTime.length; x++) {
            db.collection("appointments").doc(props.selectedDate).collection("appTime").doc().set({
                department: "Сэргээн засах эмчилгээ",
                doctor: "Ж. Пагмадулам",
                value: props.selectedTime[x].value,
                label: props.selectedTime[x].label,
                patientId: 1,
                regDate: new Date(),
                regBy: currentUser.regNo
            }).then(() => {
                console.log("Appointment time successfuly written!");
                alert("Цаг захиалга амжилттай!");
            })
            .catch((error) => {
                console.log("Appointment time failed!");
            });
        }
    }
    
    const submitForm = e => {
        e.preventDefault();
        console.log("CURRENT USER", currentUser);
        console.log("CURRENT OBJECT", Object.keys(currentUser));
        console.log("CURRENT OBJECT LENGTH", Object.keys(currentUser).length);

        if(undefined !== Object.keys(currentUser) && Object.keys(currentUser).length > 0) {
            bookAppointment(Object.keys(currentUser));
            if(undefined === chosenDate && undefined === chosenTime) {
                alert("Өдөр болон цагаа сонгоно уу");
            } else if (undefined === chosenDate && undefined !== chosenTime) {
                alert("Өдрөө сонгоно уу");
            } else if (undefined !== chosenDate && undefined === chosenTime) {
                alert("Цагаа сонгоно уу");
            } else if (undefined !== chosenDate && undefined !== chosenTime) {
                registerAppTimesToServer();
            }
        } else if(0 === Object.keys(currentUser).length) {
            registerNewPatient(Object.keys(currentUser));
        }
        // console.log("SEARCH", search);

        // if(currentUser)
        // alert("Сайн байна уу, "+currentUser.fname+"?");
        // if(buttonText === "Хайх") {
        //     alert("Хэрэглэгчийн бүртгэл олдсонгүй. Шинээр бүртгэнэ үү!");
        // } else if (buttonText === "Бүртгэх") {
        //     alert("case 2");
        // }
        // setButtonText("Бүртгэх");
        db.collection("appointmentsTimeOnly").doc();
    };

    // const changeCity = () => {
    //     setSelectCity(selectCity);
    // };

    // const changeDistrict = () => {
    //     setSelectDistrict(selectDistrict);
    // };

    // const changeKhoroo = () => {
    //     setSelectKhoroo(selectKhoroo);
    // };

    // const optionsCity = [
    //     {value: "ulaanbaatar", label: "Улаанбаатар"},
    //     {value: "arkhangai", label: "Архангай"},
    //     {value: "bayan-ulgii", label: "Баян-Өлгий"},
    //     {value: "bayankhongor", label: "Баянхонгор"},
    //     {value: "bulgan", label: "Булган"},
    //     {value: "govi-altai", label: "Говь-Алтай"},
    //     {value: "darkhan-uul", label: "Дархан-Уул"},
    //     {value: "dornogovi", label: "Дорноговь"},
    //     {value: "dornod", label: "Дорнод"},
    //     {value: "dundgovi", label: "Дундговь"},
    //     {value: "zavkhan", label: "Завхан"},
    //     {value: "orkhon", label: "Орхон"},
    //     {value: "uvurkhangai", label: "Өвөрхангай"},
    //     {value: "umnugovi", label: "Өмнөговь"},
    //     {value: "sukhbaatar", label: "Сүхбаатар"},
    //     {value: "selenge", label: "Сэлэнгэ"},
    //     {value: "tuv", label: "Төв"},
    //     {value: "uvs", label: "Увс"},
    //     {value: "khovd", label: "Ховд"},
    //     {value: "khuvsgul", label: "Хөвсгөл"},
    //     {value: "khentii", label: "Хэнтий"}
    // ];

    // const optionsDistrict = [
    //     {value: "baganuur", label: "Багануур", city: "ulaanbaatar"},
    //     {value: "bagakhangai", label: "Багахангай", city: "ulaanbaatar"},
    //     {value: "bayangol", label: "Баянгол", city: "ulaanbaatar"},
    //     {value: "bayanzurkh", label: "Баянзүрх", city: "ulaanbaatar"},
    //     {value: "nalaikh", label: "Налайх", city: "ulaanbaatar"},
    //     {value: "songinokhairkhan", label: "Сонгинохайрхан", city: "ulaanbaatar"},
    //     {value: "sukhbaatar", label: "Сүхбаатар", city: "ulaanbaatar"},
    //     {value: "khan-uul", label: "Хан-Уул", city: "ulaanbaatar"},
    //     {value: "chingeltei", label: "Чингэлтэй", city: "ulaanbaatar"}
    // ];

    // const filteredOptionsDistrict = optionsDistrict.filter(el => el.city === selectCity);

    const [display, setDisplay] = useState(false);
    const [search, setSearch] = useState("");
    // const [options, setOptions] = useState([]);
    // const [items, setItems] = useState([]);
    
    // Үйлчлүүлэгчийн цаг захиалахтай холбоотой үйлчүүлэгчийг сет хийх хувьсагчид
    const [documents, setDocuments] = useState([]);
    const wrapperRef = useRef(null);

    useEffect(() => {
    }, [search]);

    useEffect(() => {
        db.collection("patients")
            .get()
            .then((querySnapshot) => {
                // querySnapshot.forEach((doc) => {
                //     console.log("retrieved data=> ", doc.data());
                // });
                setDocuments(querySnapshot.docs.map(doc => doc.data()));
                // console.log("retrieved data=> ", documents);
            });

        setTimeout(() => {
            // console.log("outside data=> ", documents);
        }, 2500);
    }, []);

    useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside);
        // window.addEventListener("keydown", handleClickKeyDown);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
            // window.removeEventListener("keydown", handleClickKeyDown);
        };
    });

    const handleClickOutside = event => {
        const { current: wrap } = wrapperRef;
        if (wrap && !wrap.contains(event.target)) {
            setDisplay(false);
        }
    };

    const suggestionSelected = (obj) => {
        setSearch(obj.lname.charAt(0)+"."+obj.fname);
        setCurrentUser(obj);
        setDisplay(false);
    };

    const onTextChanged = e => {
        const value = e.target.value;
        setDisplay(true);
        if(value.length>0 && documents.length>0) {
            setDisplay(true);
        }
        if(value.length === 0 || documents.length===0){
            setButtonText("Үйлчлүүлэгчийг бүртгэх");
            setDisplay(false);
            setCurrentUser([]);
        }
        setSearch(value);
    };

    return (
        <div className={css.Profile}>
            <div className={css.ProfileUpdateForm}>
                <div>
                    <form>
                        {!displayNewPatientForm && (
                            <>
                                <div className={css.Title}>
                                    <h3>Цаг олгох</h3>
                                </div>
                            
                                <div className={css.FormControl}>
                                    <input 
                                        ref={inputRef}
                                        className={css.Input} 
                                        onChange={onTextChanged} 
                                        value={search} 
                                        valuetype="text" 
                                        placeholder="Хайх нэрээ оруулна уу..." />
                                    
                                    {display && (
                                        <div>
                                            {documents
                                                .filter(({fname}) => fname.toLowerCase().includes(search.toLowerCase()))
                                                .map((value, i) => {
                                                    return (
                                                        <ul className={css.SearchBar} key={i} >
                                                            <li key={ Math.random().toString(36).substr(2, 9)}
                                                                onClick={() => suggestionSelected(value)}>
                                                                <span>{`${value.lname}`} {value.fname}</span>
                                                                <span>{value.phoneNo}</span>
                                                                <span>{`${value.regNo}`.substring(4, 6)}/{`${value.regNo}`.substring(6, 8)}</span>
                                                            </li>
                                                        </ul>
                                                    )
                                                })
                                            }
                                        </div>
                                    )}
                                </div>

                                <DatePicker 
                                    setTimeOptions={setTimeOptions} />
                                <br/>
                                <TimePicker
                                    timeOptions={timeOptions} />

                                <Button text={buttonText} clicked={submitForm} />
                            </>)
                        }
                    </form>  
                    
                    {displayNewPatientForm && (
                        <PatientRegistrationForm />
                    )}
                    
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        userId: state.signupLoginReducer.userId,
        permission: state.signupLoginReducer.permission,
        lname: state.signupLoginReducer.lname,
        fname: state.signupLoginReducer.fname,
        selectedRegNo: state.appointmentReducer.selectedRegNo,
        selectedDate: state.appointmentReducer.selectedDate,
        selectedTime: state.appointmentReducer.selectedTime,
        testingValue: state.appointmentReducer.testingValue,
        test1: state.appointmentReducer.test1
    };
};

const mapDispatchToProps = dispatch => {
    return {
        collectRegNo: selectedRegNo => dispatch(actions.collectRegNo(selectedRegNo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentContainer);