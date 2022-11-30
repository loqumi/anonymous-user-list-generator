import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../pic/logo.png";

const Navbar = () => {
  return (
    <div>
      <nav
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <NavLink to="/" className="navbar-item">
            <img src={logo} width="112" height="28" alt="logo" />
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
