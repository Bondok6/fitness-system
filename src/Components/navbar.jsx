import React, { useEffect, useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../images/Logo/icon.png";
import style from "../assets/css/navbar.module.css";
import TocIcon from "@material-ui/icons/Toc";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import ChatIcon from "@material-ui/icons/Chat";
import FaceIcon from "@material-ui/icons/Face";
import Axios from "axios";
import AuthContext from "../context/auth-context";
import Spinner from "../UI/Spinner/Spinner";
import AlertContext from "../context/alerts-context";

export const Nav = (props) => {
  const nav = useRef();

  const auth = useContext(AuthContext);
  const alerts = useContext(AlertContext);

  const [notifications, setNotifications] = useState(0);

  const [requests, setRequests] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth.auth.role === "gym")
      Axios.get("count-requests").then((res) => {
        setNotifications(res.data);
      });
  }, [auth.auth.role, loading, alerts]);
  useEffect(() => {
    if (auth.auth.role === "gym")
      Axios.get("fetch-requests").then((res) => {
        setRequests(res.data.docs);
        alerts.alerts = res.data.docs;
      });
  }, [auth.auth.role, loading, alerts]);

  let alers =
    requests.length > 0
      ? requests.map((request) => {
          return (
            <div className={style.user}>
              <img
                src={request.user.photo}
                className={style.user__image}
                onClick={() =>
                  (window.location.href = `/profile/${request.user.id}`)
                }
              />
              <div>
                <div
                  className={style.user__name}
                  onClick={() =>
                    (window.location.href = `/profile/${request.user.id}`)
                  }
                >
                  {request.user.username}
                </div>
                <button
                  className={style.accept}
                  onClick={() => {
                    setLoading(true);
                    Axios.put(`approve?request=${request.id}`)
                      .then((res) => {
                        setLoading(false);
                        console.log(res);
                      })
                      .catch((err) => {
                        setLoading(false);
                        console.log(err);
                      });
                  }}
                >
                  Accept
                </button>
                <button
                  className={style.decline}
                  onClick={() => {
                    setLoading(true);
                    Axios.put(`gymRefuse?request=${request.id}`)
                      .then((res) => {
                        setLoading(false);
                        console.log(res);
                      })
                      .catch((err) => {
                        setLoading(false);
                        console.log(err);
                      });
                  }}
                >
                  Decline
                </button>
              </div>
            </div>
          );
        })
      : "";

  if (loading) alers = <Spinner />;

  return (
    <React.Fragment>
      <header>
        <nav className={style.navbar} style={{marginTop:localStorage.getItem("token") && auth.auth.role === "admin" ?'15px':'',padding:localStorage.getItem("token") && auth.auth.role === "admin" ?'10px':''}}>
          <div className={style.toggler} onClick={() => props.openHandler()}>
            <TocIcon />
          </div>
          <div className={`${style.brandlogo} mx-4`}>
            {" "}
            <img src={logo} alt="logo" />
          </div>
          <div className={style.navbarlinks}>
            {localStorage.getItem("token") && auth.auth.role === "trainee" ? (
              <ul>
                <li>
                  <Link to="/">home</Link>
                </li>
                <li>
                  <Link to="/videoCategories">categories</Link>
                </li>

                <li>
                  <Link to="/searchTrainer">trainers</Link>
                </li>
                <li>
                  <Link to="/searchTrainee">Users</Link>
                </li>
              </ul>
            ) : localStorage.getItem("token") && auth.auth.role === "gym" ? (
              <ul>
                <li>
                  <Link to="/">home</Link>
                </li>
                <li>
                  <Link to="/videoCategories">categories</Link>
                </li>
                <li>
                  <Link to="/Qr">Add Qr</Link>
                </li>
                <li>
                  <Link to="/allTrainees">My Trainees</Link>
                </li>
                <li>
                  <Link to="/approvedTrainees">Add Diet</Link>
                </li>
                <li>
                  <Link to="/searchTrainer">trainers</Link>
                </li>
                <li>
                  <Link to="/searchTrainee">Users</Link>
                </li>
              </ul>
            ) : localStorage.getItem("token") && auth.auth.role === "admin" ? (
              ""
            ) : (
              <ul>
                <li>
                  <Link to="/">home</Link>
                </li>
                <li>
                  <Link to="/contact">contact us</Link>
                </li>
                <li>
                  <Link to="/about">about</Link>
                </li>
              </ul>
            )}
          </div>
          {localStorage.getItem("token") && auth.auth.role === "gym" ? (
            <div className={style.register}>
              <span className={style.signup}>
                <Link
                  className={style.icons}
                  onClick={() => {
                    nav.current.style.display === "none"
                      ? (nav.current.style.display = "block")
                      : (nav.current.style.display = "none");
                  }}
                >
                  <NotificationsNoneIcon />
                  <span className={style.count}>{notifications}</span>
                </Link>
                {/* add hidden class ${style.hidden} */}
                <div
                  className={`${style.menu} `}
                  style={{ display: "none" }}
                  ref={nav}
                >
                  {alers}
                </div>

                <Link to="/chat" className={style.icons}>
                  <ChatIcon />
                </Link>

                <Link
                  className={style.icons}
                  onClick={() => {
                    localStorage.removeItem("token");
                    return (window.location.href = "/");
                  }}
                >
                  <ExitToAppIcon />
                </Link>
              </span>
            </div>
          ) : localStorage.getItem("token") && auth.auth.role === "trainee" ? (
            <div className={style.register}>
              <span className={style.signup}>
                <Link to="/chat" className={style.icons}>
                  <ChatIcon />
                </Link>
                <Link to="/profile" className={style.icons}>
                  <FaceIcon />
                </Link>
                <Link
                  className={style.icons}
                  onClick={() => {
                    localStorage.removeItem("token");
                    return (window.location.href = "/");
                  }}
                >
                  <ExitToAppIcon />
                </Link>
              </span>
            </div>
          ) : localStorage.getItem("token") && auth.auth.role === "admin" ? (
            <div className={style.register}>
              <span className={style.signup}>
                <Link
                  className={style.icons}
                  onClick={() => {
                    localStorage.removeItem("token");
                    return (window.location.href = "/");
                  }}
                >
                  <ExitToAppIcon />
                </Link>
              </span>
            </div>
          ) : (
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
                    props.openHandler2("/chooseWay");
                  }}
                >
                  sign up
                </Link>
              </span>
            </div>
          )}
        </nav>
      </header>
    </React.Fragment>
  );
};

export default Nav;
