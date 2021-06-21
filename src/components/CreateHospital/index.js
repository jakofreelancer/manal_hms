import React, { useState } from "react";
import Button from "../General/Button";
import TextBox from "../General/TextBox";
import css from "./style.module.css";
import { db } from "../../firebase";

const CreateHospital = () => {
    const [hospitalInfo, setHospitalInfo] = useState({
        orgRegNo: "",
        hospitalName: "",
        lname: "",
        fname: "",
        officePhoneNo: "",
        phoneNo: "",
        email: "",
        hospEmail: "",
        password1: "",
        password2: "",
        createdDate: "",
        modifiedDate: "",
        description: ""
    });

    const [formCheck, setFormCheck] = useState({
        // errorMark: { required талбаруудын анхны утга true байх! энэ нь бөглөөгүй шууд submit хийсэн үед алдаа үзүүлэх зорилготой
            orgRegNo: true,
            hospitalName: true,
            lname: true,
            fname: true,
            officePhoneNo: true,
            phoneNo: true,
            hospEmail: true,
            email: true,
            password1: true,
            password2: true,
            description: ""
        // },
    });

    const [formErrors, setFormErrors] = useState({ lname: "", fname: "" });

    const submitForm = () => {
        console.log("checking the button to register patient", hospitalInfo);
        console.log("checking submit form marks", formCheck);
        let textLeftWarningForSubmit = "";
        let textRightWarningForSubmit = "";
            
            // orgRegNo,hospitalName,lname,fname,officePhoneNo,phoneNo,hospEmail,
            // email,password1,password2,description

        if(formCheck.orgRegNo === true)
            textLeftWarningForSubmit += ` {Байгууллагын Регистр}`;
        if(formCheck.hospitalName === true)
            textLeftWarningForSubmit += ` {Эмнэлэгийн Нэр}`;
        if(formCheck.lname === true)
            textLeftWarningForSubmit += ` {Овог}`;
        if(formCheck.fname === true)
            textLeftWarningForSubmit += ` {Нэр}`;
        if(formCheck.officePhoneNo === true)
            textLeftWarningForSubmit += ` {Оффис Утас}`;
        if(formCheck.phoneNo === true)
            textLeftWarningForSubmit += ` {Дугаар}`;
        if(formCheck.email === true)
            textLeftWarningForSubmit += ` {Имэйл}`;
        if(formCheck.hospEmail === true)
            textLeftWarningForSubmit += ` {Оффис Имэйл}`;
        if(formCheck.password1 === true)
            textLeftWarningForSubmit += ` {Нууц үг1}`;
        if(formCheck.password2 === true)
            textLeftWarningForSubmit += ` {Нууц үг2}`;

        textRightWarningForSubmit += " талбаруудыг заавал, үнэн зөв бөглөнө үү!";

        if(!formCheck.orgRegNo && !formCheck.hospitalName && 
            !formCheck.lname && !formCheck.fname && 
            !formCheck.officePhoneNo && 
            !formCheck.phoneNo && !formCheck.email && 
            !formCheck.hospEmail && !formCheck.password1 && 
            !formCheck.password2 && (hospitalInfo.password1 === hospitalInfo.password2)) {
            //Форм баталгаажсан бүртгэл хийгдэх хэсэг
            var hospitalDocRef = db.collection("hospitals").doc();
            hospitalDocRef.set({
                hospitalRegId: hospitalDocRef.id,
                orgRegNo: hospitalInfo.orgRegNo,
                hospitalName: hospitalInfo.hospitalName,
                lname: hospitalInfo.lname,
                fname: hospitalInfo.fname,
                officePhoneNo: hospitalInfo.officePhoneNo,
                phoneNo: hospitalInfo.phoneNo,
                email: hospitalInfo.email,
                hospEmail: hospitalInfo.hospEmail,
                createdDate: new Date(),
                modifiedDate: new Date(),
                password1: hospitalInfo.password1,
                password2: hospitalInfo.password2
            }).then(() => {
                alert("Эмнэлэгийг амжилттай бүртгэлээ!");
            })
            .catch((error) => {
                console.log("БҮРТГЭХЭД АЛДАА ГАРЛАА!");
            });
        } else {
            alert(textLeftWarningForSubmit + textRightWarningForSubmit);
        }

        if(hospitalInfo.password1 !== hospitalInfo.password2)
            alert("Нууц үгүүд хоорондоо таарахгүй байна!");

        textLeftWarningForSubmit = "";
    };

    return (
        <div className={css.Container}>
            {/* <TextBox 
                label="Овог*" 
                name="lName" 
                setComponentInfo={setPatientInfo} 
                componentInfo={patientInfo['lname']} 
                componentAllInfo={patientInfo} 
                setWarning={setFormErrors} 
                warning={formErrors['lname']} 
                allwarnings={formErrors}
                setFormCheck={setFormCheck}
                formCheckInfo={formCheck} /> */}
            <TextBox
                label="Байгууллагын Регистр"
                name="orgRegNo"
                setComponentInfo={setHospitalInfo}
                componentInfo={hospitalInfo["orgRegNo"]}
                componentAllInfo={hospitalInfo}
                setWarning={setFormErrors}
                warning={formErrors["orgRegNo"]}
                allwarnings={formErrors}
                setFormCheck={setFormCheck}
                formCheckInfo={formCheck} />
            
            <TextBox
                label="Эмнэлэгийн нэр"
                name="hospitalName"
                setComponentInfo={setHospitalInfo}
                componentInfo={hospitalInfo["hospitalName"]}
                componentAllInfo={hospitalInfo}
                setWarning={setFormErrors}
                warning={formErrors["hospitalName"]}
                allwarnings={formErrors}
                setFormCheck={setFormCheck}
                formCheckInfo={formCheck} />
            
            <TextBox
                label="Овог"
                name="lName"
                setComponentInfo={setHospitalInfo}
                componentInfo={hospitalInfo["lname"]}
                componentAllInfo={hospitalInfo}
                setWarning={setFormErrors}
                warning={formErrors["lname"]}
                allwarnings={formErrors}
                setFormCheck={setFormCheck}
                formCheckInfo={formCheck} />
            
            <TextBox
                label="Нэр"
                name="fName"
                setComponentInfo={setHospitalInfo}
                componentInfo={hospitalInfo["fname"]}
                componentAllInfo={hospitalInfo}
                setWarning={setFormErrors}
                warning={formErrors["fname"]}
                allwarnings={formErrors}
                setFormCheck={setFormCheck}
                formCheckInfo={formCheck} />
            
            <TextBox
                label="Ажилтны Гар Утас"
                name="phoneNo"
                setComponentInfo={setHospitalInfo}
                componentInfo={hospitalInfo["phoneNo"]}
                componentAllInfo={hospitalInfo}
                setWarning={setFormErrors}
                warning={formErrors["phoneNo"]}
                allwarnings={formErrors}
                setFormCheck={setFormCheck}
                formCheckInfo={formCheck} />

            <TextBox
                label="Оффисийн Утас"
                name="officePhoneNo"
                setComponentInfo={setHospitalInfo}
                componentInfo={hospitalInfo["officePhoneNo"]}
                componentAllInfo={hospitalInfo}
                setWarning={setFormErrors}
                warning={formErrors["officePhoneNo"]}
                allwarnings={formErrors}
                setFormCheck={setFormCheck}
                formCheckInfo={formCheck} />
            
            <TextBox
                label="Ажилтны Имэйл"
                name="email"
                setComponentInfo={setHospitalInfo}
                componentInfo={hospitalInfo["email"]}
                componentAllInfo={hospitalInfo}
                setWarning={setFormErrors}
                warning={formErrors["email"]}
                allwarnings={formErrors}
                setFormCheck={setFormCheck}
                formCheckInfo={formCheck} />

            <TextBox
                label="Оффисийн Имэйл"
                name="hospEmail"
                setComponentInfo={setHospitalInfo}
                componentInfo={hospitalInfo["hospEmail"]}
                componentAllInfo={hospitalInfo}
                setWarning={setFormErrors}
                warning={formErrors["hospEmail"]}
                allwarnings={formErrors}
                setFormCheck={setFormCheck}
                formCheckInfo={formCheck} />
            
            <TextBox
                label="Нууц үг"
                name="password1"
                setComponentInfo={setHospitalInfo}
                componentInfo={hospitalInfo["password1"]}
                componentAllInfo={hospitalInfo}
                setWarning={setFormErrors}
                warning={formErrors["password1"]}
                allwarnings={formErrors}
                setFormCheck={setFormCheck}
                formCheckInfo={formCheck}
                type="password" />
            
            <TextBox
                label="Нууц үг давтах"
                name="password2"
                setComponentInfo={setHospitalInfo}
                componentInfo={hospitalInfo["password2"]}
                componentAllInfo={hospitalInfo}
                setWarning={setFormErrors}
                warning={formErrors["password2"]}
                allwarnings={formErrors}
                setFormCheck={setFormCheck}
                formCheckInfo={formCheck}
                type="password" />
            
            {/* <TextBox
                label="Хэрэглэгчийн эрх"
                name="orgRegNo"
                setComponentInfo={}
                componentInfo={}
                componentAllInfo={}
                setWarning={}
                warning={}
                allwarnings={}
                setFormCheck={}
                formCheckInfo={} /> */}
            <TextBox
                label="Тайлбар"
                name="description"
                setComponentInfo={setHospitalInfo}
                componentInfo={hospitalInfo["description"]}
                componentAllInfo={hospitalInfo}
                setWarning={setFormErrors}
                warning={formErrors["description"]}
                allwarnings={formErrors}
                setFormCheck={setFormCheck}
                formCheckInfo={formCheck} />
            <br/><br/>
            <Button text="Бүртгэх" clicked={submitForm} />
        </div>
    );
};

export default CreateHospital;