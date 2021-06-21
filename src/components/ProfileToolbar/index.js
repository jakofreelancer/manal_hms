import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const ProfileToolbar = props => {
    const location = {
        pathname: "/profile",
        state: { userId: props.userId }
    };

    return (
        <div className="navbar-end">
            <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                    {`${props.lname}`.substring(0, 1)}.{props.fname}
                </a>
                <div className="navbar-dropdown">
                    <Link className="navbar-item" to="/dashboard">
                        Хяналтын самбар
                    </Link>
                    <Link className="navbar-item" to={location}>
                        Бүртгэл
                    </Link>
                    <Link className="navbar-item" to="/settings">
                        Тохиргоо
                    </Link>
                    <hr className="navbar-divider" />
                    <Link className="navbar-item" to="/logout">
                        Гарах
                    </Link>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
      lname: state.signupLoginReducer.lname,
      fname: state.signupLoginReducer.fname,
      userId: state.signupLoginReducer.userId
    };
  };

export default connect(mapStateToProps)(ProfileToolbar);