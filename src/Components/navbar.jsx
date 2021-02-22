import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../images/Logo/icon.png";
import style from "../assets/css/navbar.module.css";
import TocIcon from "@material-ui/icons/Toc";

export const Nav = (props) => {
  return (
    <React.Fragment>
      <header>
        <nav className={style.navbar}>
          <div className={style.toggler} onClick={() => props.openHandler()}>
            <TocIcon />
          </div>
          <div className={`${style.brandlogo} mx-4`}>
            {" "}
            <img src={logo} alt="logo" />
          </div>
          <div className={style.navbarlinks}>
            <ul>
              <li>
                <Link to="/">home</Link>
              </li>
              <li>
                <Link to="#">programs</Link>
              </li>
              <li>
                <Link to="#">healthy living</Link>
              </li>
              <li>
                <Link to="#">community</Link>
              </li>
              <li>
                <Link to="#">contact us</Link>
              </li>
              <li>
                <Link to="#">about</Link>
              </li>
            </ul>
          </div>
          <div className={style.register}>
            <span className={style.login}>
              <Link
                onClick={() => {
                  props.openHandler2("/login");
                }}
              >
                login
              </Link>
            </span>
            <span className={style.line}>&#124;</span>
            <span className={style.signup}>
              <Link
                onClick={() => {
                  props.openHandler2("/signup");
                }}
              >
                sign up
              </Link>
            </span>
          </div>
        </nav>
      </header>
    </React.Fragment>
  );
};

export default Nav;
