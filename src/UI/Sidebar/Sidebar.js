import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import img from '../../images/Logo/icon.png'

function Sidebar(props) {
  const clickHandler = (e) => {
    e.target.style.transform = "translateX(-100%)";

    e.target.style.visibility = "hidden";
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
        <li className="Sidebar__item">
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
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
