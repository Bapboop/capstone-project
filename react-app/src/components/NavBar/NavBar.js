import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav>
      <div className="nav-container">
        <div className="nav-bar">
            <div className="nav-left">
          {/* <ul> */}
              {/* <li> */}
                <NavLink to="/feed" exact={true} activeClassName="active">
                  Logo
                </NavLink>
              {/* </li> */}
            </div>

            <div className="nav-right">
              {/* <li> */}
                <LogoutButton />
              {/* </li> */}
            </div>
          {/* </ul> */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
