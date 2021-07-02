import React, { useState, useEffect } from "react";
import css from "./style.module.css";
import TextBox from "../../components/General/TextBox";
import { db } from "../../firebase";
import SelectComponent from "../../components/General/SelectComponent";
import Button from "../General/Button";

const CreateDepartment = () => {
    const [departmentInfo, setDepartmentInfo] = useState({
        departmentName: "",
        phoneNo: "",
        departmentPhoneNo: "",
        email: "",
        departmentEmail: "",
        createdDate: "",
        modifiedDate: "",
        description: ""
    });

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
    });

    const optionsUserRole = [
        {value: "admin", label: "Админ"},
        {value: "reception", label: "Ресепшн"},
        {value: "doctor", label: "Эмч"}
    ];

    const optionsHospitals = [];
    const optionsEmployees = [];

    const [formCheck, setFormCheck] = useState({
        // errorMark: { required талбаруудын анхны утга true байх! энэ нь бөглөөгүй шууд submit хийсэн үед алдаа үзүүлэх зорилготой
        departmentName: true,
        phoneNo: true,
        departmentPhoneNo: true,
        email: true,
        departmentEmail: true
        // },
    });

    const [formErrors, setFormErrors] = useState({ lname: "", fname: "" });
    const [hospitals, setHospitals] = useState([]);
    const [employees, setEmployees] = useState([]);
    const tempStorageHospital = [];
    const tempStorageEmployee = [];

    const fetchData = async () => {
        let hospitalsRef = db.collection("hospitals")
        let employeesRef = db.collection("employees")
        let dataRefHospital = await hospitalsRef.get();
        let dataRefEmployee = await employeesRef.get();

        dataRefHospital.docs.map(hospital => {
            let currentID = hospital.id;
            let dateCreated = hospital.data().createdDate.toDate();
            let dateModified = hospital.data().modifiedDate.toDate();
            dateCreated = dateCreated.getUTCDate()+"/"+(dateCreated.getMonth()+1)+"/"+dateCreated.getUTCFullYear();
            dateModified = dateModified.getUTCDate()+"/"+(dateModified.getMonth()+1)+"/"+dateModified.getUTCFullYear();
            let dataStorage = { 
                ...hospital.data(), 
                ['id']: currentID, 
                ['createdDateFormatted']: dateCreated,
                ['modifiedDateFormatted']: dateModified,
            };
            tempStorageHospital.push(dataStorage);
        });

        dataRefEmployee.docs.map(employee => {
            let currentID = employee.id;
            let dateCreated = employee.data().createdDate.toDate();
            let dateModified = employee.data().modifiedDate.toDate();
            dateCreated = dateCreated.getUTCDate()+"/"+(dateCreated.getMonth()+1)+"/"+dateCreated.getUTCFullYear();
            dateModified = dateModified.getUTCDate()+"/"+(dateModified.getMonth()+1)+"/"+dateModified.getUTCFullYear();
            let dataStorage = { 
                ...employee.data(), 
                ['id']: currentID, 
                ['createdDateFormatted']: dateCreated,
                ['modifiedDateFormatted']: dateModified,
            };
            tempStorageEmployee.push(dataStorage);
        });

        setHospitals(tempStorageHospital);
        setEmployees(tempStorageEmployee);
    };

    useEffect(() => {
        fetchData();
    }, []);

    hospitals.map(el => {
        // console.log("haha", el.id, el.orgRegNo, el.hospitalName);
        optionsHospitals.push({
            value: el.id, 
            label: el.hospitalName 
        });
    });

    employees.map(el => {
        // console.log("hoho", el.lname, el.fname, el.id);
        optionsEmployees.push({
            value: el.id, 
            label: (el.lname.substring(0,1)+"."+el.fname) 
        });
    })

    // console.log("options Employees", optionsEmployees);

    const submitForm = e => {
        // console.log("checking the button to register patient", patientCitizenship, patientLname, patientFname, patientRegno, patientPhoneNo, patientCity, patientDistrict, patientKhoroo, patientBuilding);
        
        let textLeftWarningForSubmit = "";
        let textRightWarningForSubmit = "";

        if(formCheck.departmentName === true)
            textLeftWarningForSubmit += ` {Тасгийн нэр}`;
        if(formCheck.phoneNo === true)
            textLeftWarningForSubmit += ` {Утас}`;
        if(formCheck.departmentPhoneNo === true)
            textLeftWarningForSubmit += ` {Тасгийн Утас}`;
        if(formCheck.email === true)
            textLeftWarningForSubmit += ` {Имэйл}`;
        if(formCheck.departmentEmail === true)
            textLeftWarningForSubmit += ` {Тасгийн Имэйл}`;

        textRightWarningForSubmit += " талбаруудыг заавал, үнэн зөв бөглөнө үү!";
    
        // var patientId = db.collection("patients").doc().;

        // console.log(departmentInfo);

        if(!formCheck.departmentName && (!formCheck.phoneNo || 
            !formCheck.officePhoneNo) && (!formCheck.email || 
            !formCheck.departmentEmail)) {
            //Форм баталгаажсан бүртгэл хийгдэх хэсэг
            var departmentDocRef = db.collection("departments").doc();
            departmentDocRef.set({
                departmentId: departmentDocRef.id,
                departmentName: departmentInfo.departmentName,
                departmentPhoneNo: departmentInfo.departmentPhoneNo,
                phoneNo: departmentInfo.phoneNo,
                departmentEmail: departmentInfo.departmentEmail,
                email: departmentInfo.email,
                createdDate: new Date(),
                modifiedDate: new Date(),
                description: ""
            }).then(() => {
                alert("Тасгийг амжилттай бүртгэлээ!");
            })
            .catch((error) => {
                console.log("БҮРТГЭХЭД АЛДАА ГАРЛАА!");
            });
        } else {
            alert(textLeftWarningForSubmit + textRightWarningForSubmit);
        }

        textLeftWarningForSubmit = "";
    };

    return (
        <div className={css.Container}>
            <SelectComponent label="Эмнэлэг сонгох" options={optionsHospitals} onchangefunc={(e) => {setEmployeeInfo({...employeeInfo, permission: e.value})}} />

            <TextBox label="Тасгийн нэр"
                name="departmentName"
                setComponentInfo={setDepartmentInfo}
                componentInfo={departmentInfo["departmentName"]}
                componentAllInfo={departmentInfo}
                setWarning={setFormErrors}
                warning={formErrors["departmentName"]}
                allwarnings={formErrors}
                setFormCheck={setFormCheck}
                formCheckInfo={formCheck} />

            {/* <TextBox 
                label="Гар утас"
                name="phoneNo"
                setComponentInfo={setDepartmentInfo}
                componentInfo={departmentInfo["phoneNo"]}
                componentAllInfo={departmentInfo}
                setWarning={setFormErrors}
                warning={formErrors["phoneNo"]}
                allwarnings={formErrors}
                setFormCheck={setFormCheck}
                formCheckInfo={formCheck} /> */}
            
            <TextBox label="Тасгийн Утас"
                name="departmentPhoneNo"
                setComponentInfo={setDepartmentInfo}
                componentInfo={departmentInfo["departmentPhoneNo"]}
                componentAllInfo={departmentInfo}
                setWarning={setFormErrors}
                warning={formErrors["departmentPhoneNo"]}
                allwarnings={formErrors}
                setFormCheck={setFormCheck}
                formCheckInfo={formCheck} />
            
            {/* <TextBox 
                label="Имэйл"
                name="email"
                setComponentInfo={setDepartmentInfo}
                componentInfo={departmentInfo["email"]}
                componentAllInfo={departmentInfo}
                setWarning={setFormErrors}
                warning={formErrors["email"]}
                allwarnings={formErrors}
                setFormCheck={setFormCheck}
                formCheckInfo={formCheck} /> */}

            <TextBox label="Тасгийн Имэйл"
                name="departmentEmail"
                setComponentInfo={setDepartmentInfo}
                componentInfo={departmentInfo["departmentEmail"]}
                componentAllInfo={departmentInfo}
                setWarning={setFormErrors}
                warning={formErrors["departmentEmail"]}
                allwarnings={formErrors}
                setFormCheck={setFormCheck}
                formCheckInfo={formCheck} />

            <SelectComponent label="Тасгийн эрхлэгч" options={optionsEmployees} onchangefunc={(e) => {setEmployeeInfo({...employeeInfo, permissions: e.value})}} />

            <TextBox label="Тайлбар"
                name="description"
                setComponentInfo={setDepartmentInfo}
                componentInfo={departmentInfo["description"]}
                componentAllInfo={departmentInfo} />

            <br/><br/>
            <Button text="Тасгийг бүртгэх" clicked={submitForm} />
        </div>
    );
};

export default CreateDepartment;