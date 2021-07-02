import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import * as actions from "../../redux/actions/permissionSelector";
import { Route, Switch } from "react-router-dom";
import Logout from "../../components/Logout";
import HospitalSettings from "../../components/HospitalSettings";
import SignupPage from "../../pages/SignupPage";
import ListEmployees from "../../components/ListEmployees";
import ListDepartments from "../../components/ListDepartments";
import ListHospitals from "../../components/ListHospitals";
import CreateDepartment from "../../components/CreateDepartment";
import CreateHospital from "../../components/CreateHospital";
import AppointmentContainer from '../../components/AppointmentContainer';
import AppointmentPicker from '../../components/AppointmentPicker';
import Button from '../../components/General/Button';
import Modal from '../../components/General/Modal';
import { AppointmentStore } from "../../context/AppointmentContext";

import Menu from '../../components/Menu';
import Profile from '../../components/Profile';
import css from "./style.module.css";
import { AuthProvider } from "../../auth/Auth";
// import AppointmentContainer from '../../components/AppointmentContainer';
// import css from "./style.module.css";

const HomePageDefault = props => {
    const [selectPermission, setSelectPermission] = useState(false);

    const closeModal = () => {
        setSelectPermission(true);
    };

    const handleChange = thePermission => {
        console.log("change", thePermission);
        props.setCurrentPermissionFromApp(thePermission);
        props.setCurrentPermission(thePermission);
    }

    const returnPermissionDescription = (el) => {
        switch(el) {
            case "doctor": return("Эмч")
            case "admin": return("Эрхлэгч")
            case "reception": return("Ресепшн")
            case "systemadmin": return ("Систем Админ")
            default: return (null)
        }
    };

    const returnPath = subPath => {
        return ((props.match.url+"").slice(-1)==="/" ? (props.match.url+subPath) : props.match.url+subPath);
    };

    // route guards
    const renderingForDifferentRoles = () => {
        switch(props.currentPermissionFromApp) {
            case "doctor": return (
                <Switch>
                    <Route path={returnPath("logout")} exact={true} component={Logout} />
                    <Route path={returnPath("profile")} exact={true} component={Profile} />
                    <Route path={returnPath("settings")} exact={true} component={HospitalSettings} />
                    <Route path={returnPath("listEmployees")} exact={true} component={ListEmployees} />
                    <Route path={returnPath("listDepartments")} exact={true} component={ListDepartments} />
                </Switch>
            )
            case "reception": return (
                <Switch>
                    <Route path={returnPath("logout")} exact={true} component={Logout} />
                    <Route path={returnPath("profile")} exact={true} component={Profile} />
                    <Route path={returnPath("settings")} exact={true} component={HospitalSettings} />
                    <Route path={returnPath("listHospitals")} exact={true} component={ListHospitals} />

                    <AppointmentStore>
                        <Route path={returnPath("bill")} exact={true} component={AppointmentPicker} />
                        <Route path={returnPath("appointment")} exact={true} component={AppointmentContainer} />
                    </AppointmentStore>
                </Switch>
            )
            case "admin": return (
                <Switch>
                    <Route path={returnPath("logout")} exact={true} component={Logout} />
                    <Route path={returnPath("profile")} exact={true} component={Profile} />
                    <Route path={returnPath("settings")} exact={true} component={HospitalSettings} />
                    <Route path={returnPath("listDepartments")} exact={true} component={ListDepartments} />
                    <Route path={returnPath("listEmployees")} exact={true} component={ListEmployees} />
                    <Route path={returnPath("listHospitals")} exact={true} component={ListHospitals} /> {/* Эргэлзээтэй зөвхөн өөрийнхөө эмнэлэгийг харах өөрчлөх */}
                    <Route path={returnPath("createDepartment")} exact={true} component={CreateDepartment} />
                    <Route path={returnPath("createhospital")} exact={true} component={CreateHospital} />
                    <Route path={returnPath("signupEmployee")} exact={true} component={SignupPage} />
                </Switch>
            )

            case "systemadmin": return (
                <Switch>
                    <Route path={returnPath("logout")} exact={true} component={Logout} />
                    <Route path={returnPath("signup")} exact={true} component={SignupPage} />
                    <Route path={returnPath("createhospital")} exact={true} component={CreateHospital} />
                    <Route path={returnPath("listHospitals")} exact={true} component={ListHospitals} />
                </Switch>
            )

            default: return (
                <Switch>
                    <div>Танд ямар ч эрх байхгүй байна. Эмнэлгийн эрхлэгчид хандаж эрхээ авна уу</div>
                    <Switch>
                        <Route path={returnPath("profile")} exact={true} component={Profile} />
                        <Route path={returnPath("logout")} exact={true} component={Logout} />
                    </Switch>
                </Switch>
            )
        }
    }

    useEffect(() => {
        var permissions = localStorage.getItem("permission");
        var currentPermission = localStorage.getItem("currentPermission");
        
        // select permission and close the modal component
        if(permissions.split(",").length === 1) {
            setSelectPermission(true);
            props.setCurrentPermissionFromApp(permissions);
            props.setCurrentPermission(permissions);
            // localStorage.setItem("currentPermission", permissions);
        } else if(permissions.includes(props.currentPermissionFromApp) === true) { // @fixSpaghetti@ change like get permissions from reducer, not from localStorage
            switch(props.currentPermissionFromApp) {
                case "doctor":
                    setSelectPermission(true);
                    break;
                case "reception":
                    setSelectPermission(true);
                    break;
                case "systemadmin":
                    setSelectPermission(true);
                    break;
                case "admin":
                    setSelectPermission(true);
                    break;
                default: 
                    setSelectPermission(false);
                    break;
            }
        } else {
            props.setCurrentPermissionFromApp(null);
            props.setCurrentPermission(null);
        }
    }, []);

    return (
        <>
        <AuthProvider>
            <div>
                {/* Choose the employee permission to use the hospital system */}
                <Modal isSelectedPermission={selectPermission}>
                    <h3 style={{textAlign: "center"}}>Нэвтрэх эрхээ сонгоно уу</h3> <br/>

                    { props.permission.split(",").map( (el, index) => {
                        // systemadmin эрхтэй би байх юм бол бүх эрхийн сонголтыг харуулна
                        if(el === "systemadmin" && props.userId === "hny81L8ymWTyvRhQf92oLpddiYR2" ) {
                            return (
                                <div key={index}>
                                    <Button text={returnPermissionDescription(el)} clicked={() => {closeModal(); handleChange(el)}} /><br/>
                                </div>
                            )
                        } else {    // үгүй бол систем админ ээлжин дээр хоосонг харуулна
                            if(el === "systemadmin") {
                                return ""
                            }
                            else {
                                return (
                                    <div key={index}>
                                        <Button text={returnPermissionDescription(el)} clicked={() => {closeModal(); handleChange(el)}} /><br/>
                                    </div>
                                )
                            }
                        }
                    })}
                </Modal>
                
                <div className={css.HomePage}>
                    {selectPermission ? <Menu /> : null}

                    {renderingForDifferentRoles()}
                </div>
                
            </div>
        </AuthProvider>
        </>
    );
};

const mapStateToProps = state => {
    return {
        userId: state.signupLoginReducer.userId,
        permission: state.signupLoginReducer.permission,
        currentPermission1: state.permissionSelectorReducer.currentPermission
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setCurrentPermission: permission => dispatch(actions.setCurrentPermission(permission))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePageDefault);