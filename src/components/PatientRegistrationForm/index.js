import React, { useState, useRef, useEffect } from "react";
import css from "./style.module.css";
import { db } from "../../firebase";
import Button from "../General/Button";
import TextBox from "../General/TextBox";
import SelectComponent from "../General/SelectComponent";

const PatientRegistrationForm = () => {
    const [patientInfo, setPatientInfo] = useState({
        citizenship: "",
        fname: "",
        lname: "",
        gender: "",
        regNo: "",
        phoneNo: "",
        email: "",
        city: "",
        district: "",
        khoroo: "",
        building: ""
    });

    const [formCheck, setFormCheck] = useState({
        // errorMark: { required талбаруудын анхны утга true байх! энэ нь бөглөөгүй шууд submit хийсэн үед алдаа үзүүлэх зорилготой
            citizenship: true,
            fname: true,
            lname: true,
            gender: true,
            regNo: true,
            phoneNo: true,
            email: "",
            city: true,
            district: true,
            khoroo: true,
            building: ""
        // },
    });

    const [formErrors, setFormErrors] = useState({ lname: "", fname: "" });
    //const [buttonText, setButtonText] = useState("Хайх");
    
    /*const submitForm = e => {
        e.preventDefault();

        if(buttonText === "Хайх") {
            alert("Хэрэглэгчийн бүртгэл олдсонгүй. Шинээр бүртгэнэ үү!");
        } else if (buttonText === "Бүртгэх") {
            alert("case 2");
        }
        setButtonText("Бүртгэх");
    };*/

    const submitForm = e => {
        // console.log("checking the button to register patient", patientCitizenship, patientLname, patientFname, patientRegno, patientPhoneNo, patientCity, patientDistrict, patientKhoroo, patientBuilding);
        console.log("checking the button to register patient", patientInfo);
        console.log("checking submit form marks", formCheck);
        let textLeftWarningForSubmit = "";
        let textRightWarningForSubmit = "";


        if(formCheck.citizenship === true)
            textLeftWarningForSubmit += ` {Харъяалал}`;
        if(formCheck.lname === true)
            textLeftWarningForSubmit += ` {Овог}`;
        if(formCheck.fname === true)
            textLeftWarningForSubmit += ` {Нэр}`;
        if(formCheck.gender === true)
            textLeftWarningForSubmit += ` {Хүйс}`;
        if(formCheck.regNo === true)
            textLeftWarningForSubmit += ` {Регистр}`;
        if(formCheck.phoneNo === true)
            textLeftWarningForSubmit += ` {Дугаар}`;
        if(formCheck.city === true)
            textLeftWarningForSubmit += ` {Хот, аймаг}`;
        if(formCheck.district === true)
            textLeftWarningForSubmit += ` {Дүүрэг, сум}`;
        if(formCheck.khoroo === true)
            textLeftWarningForSubmit += ` { Хороо, баг}`;

        textRightWarningForSubmit += " талбаруудыг заавал, үнэн зөв бөглөнө үү!";
    
        // var patientId = db.collection("patients").doc().;

        if(!formCheck.citizenship && !formCheck.lname && 
            !formCheck.fname && !formCheck.gender && 
            !formCheck.regNo && !formCheck.phoneNo && 
            !formCheck.city && !formCheck.district && !formCheck.khoroo) {
            //Форм баталгаажсан бүртгэл хийгдэх хэсэг
            var patientDocRef = db.collection("patients").doc();
            patientDocRef.set({
                patientId: patientDocRef.id,
                citizenship: patientInfo.citizenship,
                fname: patientInfo.fname,
                lname: patientInfo.lname,
                gender: patientInfo.gender,
                regNo: patientInfo.regNo,
                phoneNo: patientInfo.phoneNo,
                email: patientInfo.email,
                city: patientInfo.city,
                district: patientInfo.district,
                khoroo: patientInfo.khoroo,
                building: patientInfo.building
            }).then(() => {
                alert("Хэрэглэгчийг амжилттай бүртгэлээ!");
            })
            .catch((error) => {
                console.log("БҮРТГЭХЭД АЛДАА ГАРЛАА!");
            });
        } else {
            alert(textLeftWarningForSubmit + textRightWarningForSubmit);
        }

        textLeftWarningForSubmit = "";
    };

    const changeGender = e => {
        setPatientInfo({ ...patientInfo, gender: e.value });
    };

    const changeCitizenship = e => {
        setPatientInfo({ ...patientInfo, citizenship: e.value });
    };

    const changeCity = e => {
        setPatientInfo({ ...patientInfo, city: e.value });
    };

    const changeDistrict = e => {
        setPatientInfo({ ...patientInfo, district: e.value });
    };

    const optionsCity = [
        {value: "ulaanbaatar", label: "Улаанбаатар", componentLabel: "city"},
        {value: "arkhangai", label: "Архангай", componentLabel: "city"},
        {value: "bayan-ulgii", label: "Баян-Өлгий", componentLabel: "city"},
        {value: "bayankhongor", label: "Баянхонгор", componentLabel: "city"},
        {value: "bulgan", label: "Булган", componentLabel: "city"},
        {value: "govi-altai", label: "Говь-Алтай", componentLabel: "city"},
        {value: "darkhan-uul", label: "Дархан-Уул", componentLabel: "city"},
        {value: "dornogovi", label: "Дорноговь", componentLabel: "city"},
        {value: "dornod", label: "Дорнод", componentLabel: "city"},
        {value: "dundgovi", label: "Дундговь", componentLabel: "city"},
        {value: "zavkhan", label: "Завхан", componentLabel: "city"},
        {value: "orkhon", label: "Орхон", componentLabel: "city"},
        {value: "uvurkhangai", label: "Өвөрхангай", componentLabel: "city"},
        {value: "umnugovi", label: "Өмнөговь", componentLabel: "city"},
        {value: "sukhbaatar", label: "Сүхбаатар", componentLabel: "city"},
        {value: "selenge", label: "Сэлэнгэ", componentLabel: "city"},
        {value: "tuv", label: "Төв", componentLabel: "city"},
        {value: "uvs", label: "Увс", componentLabel: "city"},
        {value: "khovd", label: "Ховд", componentLabel: "city"},
        {value: "khuvsgul", label: "Хөвсгөл", componentLabel: "city"},
        {value: "khentii", label: "Хэнтий", componentLabel: "city"}
    ];

    const optionsDistrict = [
        {value: "baganuur", label: "Багануур", city: "ulaanbaatar", componentLabel: "district"},
        {value: "bagakhangai", label: "Багахангай", city: "ulaanbaatar", componentLabel: "district"},
        {value: "bayangol", label: "Баянгол", city: "ulaanbaatar", componentLabel: "district"},
        {value: "bayanzurkh", label: "Баянзүрх", city: "ulaanbaatar", componentLabel: "district"},
        {value: "nalaikh", label: "Налайх", city: "ulaanbaatar", componentLabel: "district"},
        {value: "songinokhairkhan", label: "Сонгинохайрхан", city: "ulaanbaatar", componentLabel: "district"},
        {value: "sukhbaatar", label: "Сүхбаатар", city: "ulaanbaatar", componentLabel: "district"},
        {value: "khan-uul", label: "Хан-Уул", city: "ulaanbaatar", componentLabel: "district"},
        {value: "chingeltei", label: "Чингэлтэй", city: "ulaanbaatar", componentLabel: "district"}
    ];

    const optionsGender = [
        {value: "MALE", label: "Эрэгтэй", componentLabel: "patientGender"},
        {value: "FEMALE", label: "Эмэгтэй", componentLabel: "patientGender"}
    ];

    const optionsCitizenship = [
        {value: "MGL", label: "Монгол", componentLabel: "patientCitizenship"},
        {value: "ITL", label: "Гадаад", componentLabel: "patientCitizenship"}
    ];

    // const filteredOptionsDistrict = optionsDistrict.filter(el => el.city === selectCity);
    
    return (
        <>
            {/* <input placeholder="haha...." ref={inputRef} /> */}
            <br/><br/>
            <SelectComponent 
                onchangefunc={(e) => changeCitizenship(e)} 
                options={optionsCitizenship} 
                label="Хэрэглэгчийн эрх*"
                setComponentInfo={setPatientInfo}
                componentAllInfo={patientInfo}
                setFormCheck={setFormCheck}
                formCheckInfo={formCheck} />

            <TextBox 
                label="Овог*" 
                name="lName" 
                setComponentInfo={setPatientInfo} 
                componentInfo={patientInfo['lname']} 
                componentAllInfo={patientInfo} 
                setWarning={setFormErrors} 
                warning={formErrors['lname']} 
                allwarnings={formErrors}
                setFormCheck={setFormCheck}
                formCheckInfo={formCheck} />

            <TextBox 
                label="Нэр*" 
                name="fName" 
                setComponentInfo={setPatientInfo} 
                componentInfo={patientInfo['fname']} 
                componentAllInfo={patientInfo} 
                setWarning={setFormErrors} 
                warning={formErrors['fname']} 
                allwarnings={formErrors}
                setFormCheck={setFormCheck}
                formCheckInfo={formCheck} />

            <SelectComponent 
                onchangefunc={(e) => changeGender(e)} 
                options={optionsGender} 
                label="Хүйс*"
                setComponentInfo={setPatientInfo}
                componentAllInfo={patientInfo}
                setFormCheck={setFormCheck}
                formCheckInfo={formCheck} />

            <TextBox 
                name="regNo"
                label="Регистрийн дугаар*" 
                setComponentInfo={setPatientInfo}
                componentInfo={patientInfo['regNo']}
                componentAllInfo={patientInfo}
                setWarning={setFormErrors}
                warning={formErrors['regNo']}
                allwarnings={formErrors}
                setFormCheck={setFormCheck}
                formCheckInfo={formCheck} />

            <TextBox 
                name="phoneNo"
                label="Утас*" 
                setComponentInfo={setPatientInfo}
                componentInfo={patientInfo['phoneNo']}
                componentAllInfo={patientInfo}
                setWarning={setFormErrors}
                warning={formErrors['phoneNo']}
                allwarnings={formErrors}
                setFormCheck={setFormCheck}
                formCheckInfo={formCheck} />
            
            <TextBox 
                name="email"
                label="Email" 
                setComponentInfo={setPatientInfo}
                componentInfo={patientInfo['email']}
                componentAllInfo={patientInfo}
                setWarning={setFormErrors}
                warning={formErrors['email']}
                allwarnings={formErrors}
                setFormCheck={setFormCheck}
                formCheckInfo={formCheck} />
            
            <SelectComponent 
                onchangefunc={(e) => changeCity(e)} 
                options={optionsCity} label="Хот, аймаг"
                setComponentInfo={setPatientInfo}
                componentAllInfo={patientInfo}
                setFormCheck={setFormCheck}
                formCheckInfo={formCheck} />
            
            <SelectComponent 
                onchangefunc={(e) => changeDistrict(e)} 
                options={optionsDistrict} 
                label="Сум, дүүрэг"
                setComponentInfo={setPatientInfo}
                componentAllInfo={patientInfo}
                setFormCheck={setFormCheck}
                formCheckInfo={formCheck} />
            
            <TextBox 
                name="khoroo"
                label="Баг, хороо"
                setComponentInfo={setPatientInfo}
                componentInfo={patientInfo['khoroo']}
                componentAllInfo={patientInfo}
                setFormCheck={setFormCheck}
                formCheckInfo={formCheck} />
            
            <TextBox  
                name="building"
                label="Хороолол, байр, тоот"
                setComponentInfo={setPatientInfo}
                componentInfo={patientInfo['building']}
                componentAllInfo={patientInfo}
                setFormCheck={setFormCheck}
                formCheckInfo={formCheck}/>
            <br />
            <br />
            <Button text="Бүртгэх" clicked={submitForm} />
        </>
    );
};

export default PatientRegistrationForm;