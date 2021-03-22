import React, { useEffect } from 'react';
import LoginPage from '../LoginPage';
import Logout from '../../components/Logout';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePageDoctor from '../HomePageDoctor';
import HomePageReception from '../HomePageReception';
import HomePageDefault from '../HomePageDefault';
import SignupPage from '../SignupPage';
import { AuthProvider } from "../../auth/Auth";
import * as actions from "../../redux/actions/loginActions";

const App = props => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const expireDate = new Date(localStorage.getItem("expireDate"));
    const refreshToken = localStorage.getItem("refreshToken");
    const userRole = localStorage.getItem("userRole");

    if(token) {
      if(expireDate > new Date()) {
        const leftSeconds = expireDate.getTime()-new Date().getTime();
        props.autoLogin(token, userId, userRole, leftSeconds);
      } else {
        props.logout();
      }
    }
  }, [])

  return (
    <>
        {/* User ID: {props.userId} <br/>
        User Role: {props.userRole} */}
        <AuthProvider>
        {props.userId ?
          (
              <Switch>
                <Route path="/logout" component={Logout} />
                <Route path="/doctor" component={HomePageDoctor} />
                <Route path="/reception" component={HomePageReception} /> 
                <Route path="/" component={HomePageDefault} />
              </Switch>
          ) :
          (
            <Switch>
              <Route path="/login" component={LoginPage} />
              <Route path="/signup" component={SignupPage} />
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
    autoLogin: (token, userId, userRole, leftSeconds) =>
      dispatch(actions.loginUserSuccess(token, userId, userRole, leftSeconds)),
      logout: () => dispatch(actions.logout),
      autoLoginAfterMilSeconds: (leftSeconds) => dispatch(actions. autoLoginAfterMilSeconds(leftSeconds))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);