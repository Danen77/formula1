import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ThemeContext from "../context/ThemeContext";

const Nav = ({ toggleTheme }) => {
  const theme = useContext(ThemeContext);
  return (
    <>
      <nav>
        <div className="header">
          <h1>
            <Link to="/">
              Formula<span className="num-one">1</span>
            </Link>
          </h1>
          <div>
            <button
              style={{ fontSize: 30 }}
              className="btn-clear"
              onClick={toggleTheme}
            >
              {theme.theme === "light" ? "Light" : "Dark"}
            </button>
          </div>
        </div>
        <ul className="menu">
          <li>
            <Link to="/" className="nav-link">
              Drivers
            </Link>
          </li>  
        </ul>
      </nav>
    </>
  );
};

export default Nav;
