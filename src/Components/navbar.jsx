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
                <Link to="/online">online</Link>
              </li>
              <li>
                <a href="https://bondok6.github.io/SoundCloud-player/" target="_blank">Music</a>
              </li>
              <li>
                <Link to="/contact">contact us</Link>
              </li>
              <li>
                <Link to="#">about</Link>
              </li>
            </ul>
          </div>
          {
            localStorage.getItem("token")?  <div className={style.register}>
            <span className={style.signup}>
              <Link
                onClick={() => {
                  localStorage.removeItem("token")
                return  window.location.href="/"
                }}
              >
                Logout
              </Link>
            </span>
          </div> : <div className={style.register}>
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
                  props.openHandler2("/chooseWay");
                }}
              >
                sign up
              </Link>
            </span>
          </div>
          }
         
        </nav>
      </header>
    </React.Fragment>
  );
};

export default Nav;
