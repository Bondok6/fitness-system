import React, { useEffect, useRef } from "react";
import "./Backdrop.css";

function Backdrop(props) {
  const clickHandler = (e) => {
    e.target.style.opacity = 0;
    e.target.style.visibility = "hidden";

    props.closeHandler();
  };
  const ele = useRef();
  useEffect(() => {
    if (props.open === true) {
      ele.current.style.opacity = 1;
      ele.current.style.visibility = "visible";
    } else {
      ele.current.style.opacity = 0;
      ele.current.style.visibility = "hidden";
    }
  }, [props.open]);

  return (
    <div className="Backdrop" ref={ele} onClick={(e) => clickHandler(e)}></div>
  );
}

export default Backdrop;
