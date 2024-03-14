import { NavLink } from "react-router-dom";
import c from "./NavBar.module.css";
import imglogo from "../../assets/aptiv-logo.svg";
import { useSelector } from "react-redux";
import React from "react";

const NavBar = (p) => {
  const { isLoged } = useSelector((s) => s.login);

  return (
    <div className={c.navBar}>
      <div className={c.logo}>
        <NavLink to="/home">
          <img src={imglogo} alt="logo for aptiv" />
        </NavLink>
      </div>
      {isLoged.login && (
        <div className={c.links}>
          <ul>
            <li style={{ color: "#f84018", fontWeight: "600" }}>
              Wellcome
              {" " + isLoged.userName}
            </li>
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) => (isActive ? c.activeLink : c.link)}
              >
                home
              </NavLink>
            </li>
            {(isLoged.role === "ROOT" || isLoged.role === "ADMIN") && (
              <React.Fragment>
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive ? c.activeLink : c.link
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/reporting"
                    className={({ isActive }) =>
                      isActive ? c.activeLink : c.link
                    }
                  >
                    reporting
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/uploadFiles"
                    className={({ isActive }) =>
                      isActive ? c.activeLink : c.link
                    }
                  >
                    upload Files
                  </NavLink>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
export default NavBar;
