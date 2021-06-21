import React, { useEffect } from 'react';
import LoginPage from '../LoginPage';
import Logout from '../../components/Logout';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import HomePageDoctor from '../HomePageDoctor';
import HomePageReception from '../HomePageReception';
import CreateHospital from '../../components/CreateHospital';
import CreateDepartment from '../../components/CreateDepartment';
import HomePageDefault from '../HomePageDefault';
import SignupPage from '../SignupPage';
import { AuthProvider } from "../../auth/Auth";
import * as actions from "../../redux/actions/loginActions";
import Profile from '../../components/Profile';
import Toolbar from '../../components/Toolbar';
import Menu from '../../components/Menu';
import css from './style.module.css';
import AppointmentContainer from '../../components/AppointmentContainer';
import AppointmentPicker from '../../components/AppointmentPicker';
import { AppointmentStore } from "../../context/AppointmentContext";
import HospitalSettings from '../../components/HospitalSettings';
import ListHospitals from '../../components/ListHospitals';
import ListDepartment from '../../components/ListDepartments';
import ListEmployees from '../../components/ListEmployees';

const App = props => {

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const expireDate = new Date(localStorage.getItem("expireDate"));
    // const refreshToken = localStorage.getItem("refreshToken");
    const userRole = localStorage.getItem("userRole");
    const lname = localStorage.getItem("lname");
    const fname = localStorage.getItem("fname");

    if(token) {
      if(expireDate > new Date()) {
        const leftSeconds = expireDate.getTime()-new Date().getTime();
        props.autoLogin(token, userId, userRole, lname, fname, leftSeconds);
      } else {
        props.logout();
      }
    }
  }, []);

  return (
    <>
        {/* User ID: {props.userId} <br/>
        User Role: {props.userRole} */
        <b>{process.env.NODE_ENV}</b>}
        <AuthProvider>
        {props.userId ?
          (
            <>
              <Toolbar />
              <div className={css.HomePage}>
                <Menu />
                <Switch>
                  <Route path="/logout" component={Logout} />
                  {/* <Route path="/doctor" component={HomePageDoctor} />
                  <Route path="/reception" component={HomePageReception} />  */}
                  <Route path="/profile" component={Profile} />
                  <Route path="/settings" component={HospitalSettings} />
                  <Route path="/createHospital" component={CreateHospital} />
                  <Route path="/createDepartment" component={CreateDepartment} />
                  <Route path="/signupEmployee" component={SignupPage} />
                  <Route path="/listHospitals" component={ListHospitals} />
                  <Route path="/listDepartments" component={ListDepartment} />
                  <Route path="/listEmployees" component={ListEmployees} />
                  
                  <AppointmentStore>
                    <Route path="/bill" component={AppointmentPicker} />
                    <Route path="/appointment" component={AppointmentContainer} />
                  </AppointmentStore>
                  
                  <Route path="/" component={HomePageDefault} />
                </Switch>
              </div>
            </>
          ) :
          (
            <Switch>
              <Route path="/login" component={LoginPage} />
              {/* <Route path="/signup" component={SignupPage} /> */}
              {/* <Route path="/createaccess" component={CreateAccess} />
              <Route path="/createdepartment" component={CreateDepartment} /> */}
              <Route path="/" component={LoginPage} />
            </Switch>
          )
        }
      </AuthProvider>
    </>
  );
};

const mapStateToProps = state => {
  return {
    userId: state.signupLoginReducer.userId,
    userRole: state.signupLoginReducer.userRole
  };
};

const mapDispatchToProps = dispatch => {
  return {
    autoLogin: (token, userId, userRole, lname, fname, leftSeconds) =>
      dispatch(actions.loginUserSuccess(token, userId, userRole, lname, fname, leftSeconds)),
      logout: () => dispatch(actions.logout),
      autoLoginAfterMilSeconds: (leftSeconds) => dispatch(actions. autoLoginAfterMilSeconds(leftSeconds))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);