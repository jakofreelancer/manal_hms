import React, { useEffect, useState } from 'react';
import LoginPage from '../LoginPage';
import Logout from '../../components/Logout';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import HomePageDefault from '../HomePageDefault';
import { AuthProvider } from "../../auth/Auth";
import * as actions from "../../redux/actions/loginActions";
import Toolbar from '../../components/Toolbar';
import css from './style.module.css';

const App = props => {
  var permission = "";
  const [currentPermission, setCurrentPermission] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const expireDate = new Date(localStorage.getItem("expireDate"));
    // const refreshToken = localStorage.getItem("refreshToken");
    permission = localStorage.getItem("permission");
    const lname = localStorage.getItem("lname");
    const fname = localStorage.getItem("fname");
    setCurrentPermission(localStorage.getItem("currentPermission"));

    if(token) {
      if(expireDate > new Date()) {
        const leftSeconds = expireDate.getTime()-new Date().getTime();
        props.autoLogin(token, userId, permission, lname, fname, leftSeconds);
      } else {
        props.logout();
      }
    }
  }, []);

  return (
    <>
      <AuthProvider>
        {props.userId ?
          (
            <>
              <Toolbar currentPermissionFromApp={currentPermission}  setCurrentPermissionFromApp={setCurrentPermission} />
              <div>
                <Switch>
                  <Route path="/logout" component={Logout} />
                  <Route path="/" 
                    component={(props) => <HomePageDefault {...props} currentPermissionFromApp={currentPermission}  setCurrentPermissionFromApp={setCurrentPermission}  />} 
                    // render={
                    //   props => <HomePageDefault {...props} setCurrentPermission = {setCurrentPermission()} />
                    // } 
                    // currentPermissionFromApp={currentPermission}  
                  />
                </Switch>
              </div>
            </>
          ) :
          (
            <Switch>
              <Route path="/login" component={LoginPage} />
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
    permission: state.signupLoginReducer.permission
  };
};

const mapDispatchToProps = dispatch => {
  return {
    autoLogin: (token, userId, permission, lname, fname, leftSeconds) => dispatch(actions.loginUserSuccess(token, userId, permission, lname, fname, leftSeconds)),
    logout: () => dispatch(actions.logout),
    autoLoginAfterMilSeconds: (leftSeconds) => dispatch(actions.autoLoginAfterMilSeconds(leftSeconds))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);