import React, { useState } from 'react';
import { connect } from 'react-redux';
import './style.css';
import Button from '../../components/General/Button';
import * as actions from '../../redux/actions/loginActions';
import Spinner from "../../components/General/Spinner";
import { Redirect } from 'react-router-dom';
//import css from "./style.module.css";

const Login = props => {
  const [form, setForm] = useState({ email: "", password: "" });

  const login = (e) => {
    e.preventDefault();
    props.login(form.email, form.password);
  };

  return (
    <div className="columns is-multiline">
      {props.userId && <Redirect to='/reception' />}
      <div className="column is-8 is-offset-2 register">
        <div className="columns">
          <div className="column left">
            <h1 className="title is-1">МАНАЛ</h1>
            <h2 className="subtitle colored is-4">
              Эмнэлгийн удирдлагын систем
            </h2>
          </div>
          <div className="column right has-text-centered">
            <form>
              <div className="field">
                <div className="control">
                  <input
                    onChange={el => setForm(formBefore => ({
                                      email: el.target.value,
                                      password: formBefore.password
                                    }))}
                    className="input is-medium"
                    type="email"
                    placeholder="И-мэйл хаяг"
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <input
                    onChange={el => setForm(formBefore => ({
                                      email: formBefore.email,
                                      password: el.target.value
                                    }))}
                    className="input is-medium"
                    type="password"
                    placeholder="Нууц үг"
                  />
                </div>
              </div>
              {props.authServerError && <div style={{ color: "red" }}>{props.authServerError}</div>}
              {props.logginIn && <Spinner />}
              <Button text="Нэвтрэх" clicked={login} />
              <br />
              <small>
                <em>Нууц үгээ мартсан?</em>
              </small>
            </form>
          </div>
        </div>
      </div>
      <div className="column is-8 is-offset-2">
        <br />
        <nav className="level">
          <div className="level-left">
            <div className="level-item">
              <span className="icon">
                <i className="fab fa-twitter" />
              </span>{" "}
               
              <span className="icon">
                <i className="fab fa-facebook" />
              </span>{" "}
               
              <span className="icon">
                <i className="fab fa-instagram" />
              </span>{" "}
               
              <span className="icon">
                <i className="fab fa-github" />
              </span>{" "}
               
              <span className="icon">
                <i className="fas fa-envelope" />
              </span>
            </div>
          </div>
          <div className="level-right">
            <small
              className="level-item"
              style={{ color: "var(--textLight)" }}
            >
              Chandmani Solutions © Зохиогчийн эрхээр хамгаалагдсан 2021
            </small>
          </div>
        </nav>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    logginIn: state.signupLoginReducer.logginIn,
    authServerError: state.signupLoginReducer.authServerError,
    authServerErrorCode: state.signupLoginReducer.authServerErrorCode,
    userId: state.signupLoginReducer.userId,
    userRole: state.signupLoginReducer.userRole
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => dispatch(actions.loginUser(email, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);