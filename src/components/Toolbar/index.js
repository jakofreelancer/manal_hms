import React from "react";
import Logo from "../Logo";
import ProfileToolbar from "../ProfileToolbar";
// import css from "./style.module.css";

const Toolbar = props => (
    <nav className="navbar has-shadow is-primary">
        <div className="container">
            <Logo />
            <ProfileToolbar />
        </div>
    </nav>

);

export default Toolbar;