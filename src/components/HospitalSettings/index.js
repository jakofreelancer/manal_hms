import React, { useState } from "react";
import css from "./style.module.css";
import TextBox from "../General/TextBox";
import SelectComponent from "../General/SelectComponent";
import Button from "../General/Button";

const HospitalSettings = () => {
    const [hospitalInfo, setHospitalInfo] = useState({
        // hospitalId: "",
        regNo: "",
        lname: "",
        fname: "",
        phoneNo: "",
        password: "",
        email: "",
        userRole: "",
        // createdDate: "",
        // modifiedDate: "",
        description: ""
    });

    const [formErrors, setFormErrors] = useState({
        regNo: "",
        lname: "",
        fname: "",
        phoneNo: "",
        password: "",
        email: "",
        userRole: "",
        description: ""
    });

    const [formCheck, setFormCheck] = useState({
        // errorMark: { required талбаруудын анхны утга true байх! энэ нь бөглөөгүй шууд submit хийсэн үед алдаа үзүүлэх зорилготой
            regNo: true,
            lname: true,
            fname: true,
            phoneNo: true,
            password: true,
            email: true,
            userRole: true,
            description: true
        // },
    });

    return (
        <>
            <div className={css.Container}>
                <TextBox 
                    label="Овог*" 
                    name="lName" 
                    setComponentInfo={setHospitalInfo} 
                    componentInfo={hospitalInfo['lname']}
                    componentAllInfo={hospitalInfo} 
                    setWarning={setFormErrors} 
                    warning={formErrors['lname']} 
                    allwarnings={formErrors}
                    setFormCheck={setFormCheck}
                    formCheckInfo={formCheck} />

                <TextBox 
                    label="Нэр*" 
                    name="fName" 
                    setComponentInfo={setHospitalInfo} 
                    componentInfo={hospitalInfo['fname']}
                    componentAllInfo={hospitalInfo} 
                    setWarning={setFormErrors} 
                    warning={formErrors['fname']} 
                    allwarnings={formErrors}
                    setFormCheck={setFormCheck}
                    formCheckInfo={formCheck} />

                <TextBox 
                    label="Утас*" 
                    name="phoneNo" 
                    setComponentInfo={setHospitalInfo} 
                    componentInfo={hospitalInfo['phoneNo']}
                    componentAllInfo={hospitalInfo} 
                    setWarning={setFormErrors} 
                    warning={formErrors['phoneNo']} 
                    allwarnings={formErrors}
                    setFormCheck={setFormCheck}
                    formCheckInfo={formCheck} />

                <TextBox 
                    label="Имэйл*" 
                    name="email" 
                    setComponentInfo={setHospitalInfo} 
                    componentInfo={hospitalInfo['email']}
                    componentAllInfo={hospitalInfo} 
                    setWarning={setFormErrors} 
                    warning={formErrors['email']} 
                    allwarnings={formErrors}
                    setFormCheck={setFormCheck}
                    formCheckInfo={formCheck} />

                <TextBox 
                    label="Нууц үг*" 
                    name="password1" 
                    setComponentInfo={setHospitalInfo} 
                    componentInfo={hospitalInfo['password1']}
                    componentAllInfo={hospitalInfo} 
                    setWarning={setFormErrors} 
                    warning={formErrors['password1']} 
                    allwarnings={formErrors}
                    setFormCheck={setFormCheck}
                    formCheckInfo={formCheck} />

                <TextBox 
                    label="Нууц үг давтах*" 
                    name="password2" 
                    setComponentInfo={setHospitalInfo} 
                    componentInfo={hospitalInfo['password2']}
                    componentAllInfo={hospitalInfo} 
                    setWarning={setFormErrors} 
                    warning={formErrors['password2']} 
                    allwarnings={formErrors}
                    setFormCheck={setFormCheck}
                    formCheckInfo={formCheck} />

                {/* <SelectComponent 
                    onchangefunc={(e) => changeDistrict(e)} 
                    options={optionsDistrict} 
                    label="Сум, дүүрэг"
                    setComponentInfo={setPatientInfo}
                    componentAllInfo={patientInfo}
                    setFormCheck={setFormCheck}
                    formCheckInfo={formCheck} /> */}

                <TextBox 
                    label="Тайлбар" 
                    name="description" 
                    setComponentInfo={setHospitalInfo} 
                    componentInfo={hospitalInfo['description']}
                    componentAllInfo={hospitalInfo} 
                    setWarning={setFormErrors} 
                    warning={formErrors['description']} 
                    allwarnings={formErrors}
                    setFormCheck={setFormCheck}
                    formCheckInfo={formCheck} />
                
                <br />
                <br />
                {/* clicked={submitForm} */}
                <Button text="Бүртгэх"  />
            </div>
        </>
    );
};

export default HospitalSettings;