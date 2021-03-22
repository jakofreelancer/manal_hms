import React from "react";
import css from "./style.module.css";
import HamburgerMenu from "../HamburgerMenu";

const Toolbar = props => (
    <nav className="navbar has-shadow">
        <div className="container">
            <div className="navbar-brand">
            <a className="navbar-item" href="../">
                <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" />
            </a>
            <div className="navbar-burger burger" data-target="navMenu">
                <span />
                <span />
                <span />
            </div>
            </div>
            <div className="navbar-end">
            <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                Account
                </a>
                <div className="navbar-dropdown">
                <a className="navbar-item">
                    Dashboard
                </a>
                <a className="navbar-item">
                    Profile
                </a>
                <a className="navbar-item">
                    Settings
                </a>
                <hr className="navbar-divider" />
                <a className="navbar-item">
                    Logout
                </a>
                </div>
            </div>
            </div>
        </div>
    </nav>

);

export default Toolbar;