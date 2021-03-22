import React, { useState } from 'react';
import { connect } from 'react-redux';
import './style.css';
import Button from '../../components/General/Button';
import * as actions from '../../redux/actions/signupActions';
import Spinner from "../../components/General/Spinner";
import { Redirect } from 'react-router-dom';
import firebase from "../../firebase";
//import css from "./style.module.css";

const Signup = props => {
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState("");
    const [lname, setLname] = useState("");
    const [fname, setFname] = useState("");
    const [regNo, setRegNo] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [description, setDescription] = useState("");
    const [userRole, setUserRole] = useState("");
    // const [createdDate, setCreatedDate] = useState("");
    // const [lastModifiedDate, setLastModifiedDate] = useState("");

    const signup = (e) => {
        e.preventDefault();
        if(password1 === password2) {
            const currentDate = new Date();

            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password1)
                .then((user) => {
                    resetInput();
                    props.signupUser(user.user.uid, email, password1, lname, fname, regNo, phoneNo, description, userRole, currentDate, currentDate);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setError("Нууц үгнүүд хоорондоо таарахгүй байна");
        }
    };

    const resetInput = () => {
        setEmail("");
        setPassword1("");
        setPassword2("");
        setLname("");
        setFname("");
        setRegNo("");
        setPhoneNo("");
        setDescription("");
    };

    var jumpPage = null;
    
    if(props.userId) {
        switch(props.userRole) {
            case "doctor" :
                jumpPage = <Redirect to='/doctor' />;
                break;

            case "reception" :
                jumpPage = <Redirect to='/reception' />;
                break;

            default:
                jumpPage = <Redirect to='/home' />;
        };
    };

    return (
        <div className="columns is-multiline">
            {
                (jumpPage !== null) ? jumpPage : ""

            }
            
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
                                    onChange={el => setEmail(el.target.value)}
                                    className="input is-medium"
                                    type="email"
                                    placeholder="И-мэйл хаяг"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <input
                                    onChange={el => setLname(el.target.value)}
                                    className="input is-medium"
                                    type="text"
                                    placeholder="Овог"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <input
                                    onChange={el => setFname(el.target.value)}
                                    className="input is-medium"
                                    type="text"
                                    placeholder="Нэр"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <input
                                    onChange={el => setRegNo(el.target.value)}
                                    className="input is-medium"
                                    type="text"
                                    placeholder="Регистрийн дугаар"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <input
                                    onChange={el => setPhoneNo(el.target.value)}
                                    className="input is-medium"
                                    type="text"
                                    placeholder="Утас"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <div className="select is-medium">
                                        <select onChange={el => {
                                            (el.target.value !== "0") ? setUserRole(el.target.value) : alert("Эрхээ сонгоно уу");
                                        }}>
                                            <option value="0">Эрхээ сонгоно уу</option>
                                            <option value="admin">Админ</option>
                                            <option value="reception">Ресепшн</option>
                                            <option value="doctor">Эмч</option>
                                        </select>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <textarea 
                                        onChange={el => setDescription(el.target.value)}
                                        className="input is-medium"
                                        type="text"
                                        placeholder="Тайлбар"
                                    ></textarea>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <input
                                    onChange={el => setPassword1(el.target.value)}
                                    className="input is-medium"
                                    type="password"
                                    placeholder="Нууц үг"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <input
                                    onChange={el => setPassword2(el.target.value)}
                                    className="input is-medium"
                                    type="password"
                                    placeholder="Нууц үгээ давтана уу"
                                    />
                                </div>
                            </div>
                            {props.authServerError && <div style={{ color: "red" }}>{props.authServerError}</div>}
                            {props.saving && <Spinner />}
                            <Button text="Бүртгүүлэх" clicked={signup} />
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
        saving: state.signupLoginReducer.saving,
        authServerError: state.signupLoginReducer.authServerError,
        authServerErrorCode: state.signupLoginReducer.authServerErrorCode,
        userId: state.signupLoginReducer.userId,
        userRole: state.signupLoginReducer.userRole
    };
};

const mapDispatchToProps = dispatch => {
    return {
        signupUser: (   uId,
                        email, 
                        password, 
                        lname, 
                        fname, 
                        regNo, 
                        phoneNo, 
                        description, 
                        userRole,
                        createdDate, 
                        lastModifiedDate
                    ) => 
            dispatch(actions.signupUser(uId,
                                        email, 
                                        password, 
                                        lname, 
                                        fname, 
                                        regNo, 
                                        phoneNo, 
                                        description, 
                                        userRole,
                                        createdDate, 
                                        lastModifiedDate))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
// export default Signup;