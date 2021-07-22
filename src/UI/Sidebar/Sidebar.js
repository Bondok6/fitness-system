import React, { useEffect, useRef,useContext } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import img from '../../images/Logo/icon.png'
import AuthContext from "../../context/auth-context";


function Sidebar(props) {
  const auth = useContext(AuthContext);

  const clickHandler = (e) => {
    ele.current.style.transform = "translateX(-100%)";

    ele.current.style.visibility = "hidden";
    props.closeHandler();
  };
  const ele = useRef();
  useEffect(() => {
    if (props.open === true) {
      ele.current.style.transform = "translateX(0%)";
      ele.current.style.visibility = "visible";
    } else {
      ele.current.style.transform = "translateX(-100%)";
      ele.current.style.visibility = "hidden";
    }
  }, [props.open]);

  return (
    <div className="Sidebar" ref={ele} onClick={(e) => clickHandler(e)}>
      <img className="Sidebar__logo" src={img} alt="ss" />
      <ul className="Sidebar__list">
      {localStorage.getItem("token") && auth.auth.role === "trainee" ? (
              <ul>
                <li className="Sidebar__item">
                  <Link className="Sidebar__link" to="/">home</Link>
                </li>
                <li className="Sidebar__item">
                  <Link className="Sidebar__link" to="/videoCategories">categories</Link>
                </li>

                <li className="Sidebar__item">
                  <Link className="Sidebar__link" to="/searchTrainer">trainers</Link>
                </li>
                <li className="Sidebar__item">
                  <Link className="Sidebar__link" to="/searchTrainee">Users</Link>
                </li>
              </ul>
            ) : localStorage.getItem("token") && auth.auth.role === "gym" ? (
              <ul>
                <li className="Sidebar__item">
                  <Link className="Sidebar__link" to="/">home</Link>
                </li>
                <li className="Sidebar__item">
                  <Link className="Sidebar__link" to="/videoCategories">categories</Link>
                </li>
                <li className="Sidebar__item">
                  <Link className="Sidebar__link" to="/allTrainees">My Trainees</Link>
                </li>
                <li className="Sidebar__item">
                  <Link className="Sidebar__link" to="/approvedTrainees">Add Diet</Link>
                </li>
                <li className="Sidebar__item">
                  <Link className="Sidebar__link" to="/searchTrainer">trainers</Link>
                </li>
                <li className="Sidebar__item">
                  <Link className="Sidebar__link" to="/searchTrainee">Users</Link>
                </li>
              </ul>
            ) : (
              <ul>
                <li className="Sidebar__item">
                  <Link className="Sidebar__link" to="/">home</Link>
                </li>
                <li className="Sidebar__item">
                  <Link className="Sidebar__link" to="/contact">contact us</Link>
                </li>
                <li className="Sidebar__item">
                  <Link className="Sidebar__link" to="/about">about</Link>
                </li>
              </ul>
            )}
        {/* <li className="Sidebar__item">
          <Link className="Sidebar__link" to="/">
            {" "}
            Home
          </Link>
        </li>
        <li className="Sidebar__item">
          <Link className="Sidebar__link" to="/products">
            {" "}
            Products
          </Link>
        </li>
        <li className="Sidebar__item">
          <Link className="Sidebar__link" to="/">
            {" "}
            Contact Us
          </Link>
        </li>
        <li className="Sidebar__item">
          <Link className="Sidebar__link" to="/">
            {" "}
            About Us
          </Link>
        </li> */}
      </ul>
    </div>
  );
}

export default Sidebar;
