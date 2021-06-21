import React from "react";
import { Link } from "react-router-dom";

const Logo = () => (
    <div className="navbar-brand">
        <Link className="navbar-item" to="/">
            <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" />
        </Link>
    </div>
);

export default Logo;