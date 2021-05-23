import React, { Component, useContext, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import style from "../../assets/css/authentication/login.module.css";
import logo from "../../images/Logo/pinkLogo.png";
import Input from "../../Helper/Input/Input";
import { updatedObject, checkValidity } from "../../Helper/shared/shared";
import Spinner from "../../UI/Spinner/Spinner";
import AuthContext from "../../context/auth-context";

export function Login(props) {
  const Auth = useContext(AuthContext);

  const [controls, setControls] = useState({
    password: {
      value: "",
      valid: false,
      validation: {
        required: true,
        minLength: 4,
      },
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      touched: false,
    },

    phone: {
      value: "",
      valid: false,
      validation: {
        required: true,
        isPhone: true,
      },
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Phone",
        id: "phone",
      },
      touched: false,
    },
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);



  const on = (event, elementName) => {
    const updated = updatedObject(controls, {
      [elementName]: updatedObject(controls[elementName], {
        valid: checkValidity(
          event.target.value,
          controls[elementName].validation
        ),
        value: event.target.value,
        touched: true,
      }),
    });
    setControls(updated);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (controls.password.valid && controls.phone.valid) {
      // this.setState({ loading: true, error: null });
      setLoading(true);
      setError(null);

      let p = "+2";
      let phone = p.concat(controls.phone.value);

      const data = {
        phone: phone,
        password: controls.password.value,
      };

      axios({
        url: "login-phone",
        method: "POST",
        data: data,
      })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userId", res.data.user.id);
          window.location.href = "/";
          setLoading(false);
          Auth.isAuth = true;
          Auth.auth = res.data;
        })
        .catch((err) => {
          setLoading(false);
          setError(err.response.data.message);
          console.log(error);
        });
    }
  };

  let body = (
    <React.Fragment>
      {error ? <p className={style.Error}> {error} </p> : ""}
      <div className={style.login}>
        <form onSubmit={submitHandler}>
          <div>
            <img src={logo} alt="logo-icon" className={style.logo} />
          </div>

          <div className={style.input}>
            <Input
              inValid={!controls.phone.valid}
              changed={(e) => on(e, "phone")}
              value={controls.phone.value}
              elementType={controls.phone.elementType}
              hasValidity
              touched={controls.phone.touched}
              elementConfig={controls.phone.elementConfig}
              class={style.inp}
            />
          </div>

          <div className={style.input}>
            <Input
              inValid={!controls.password.valid}
              changed={(e) => on(e, "password")}
              value={controls.password.value}
              elementType={controls.password.elementType}
              hasValidity
              touched={controls.password.touched}
              elementConfig={controls.password.elementConfig}
              class={style.inp}
            />
          </div>

          <button type="submit" className={style.btn}>
            Login
          </button>

          <div className={style.anchor}>
            <Link onClick={() => props.openHandler2("/forget")}>
              {" "}
              forget password
            </Link>
          </div>
          <hr />
        </form>
      </div>
    </React.Fragment>
  );
  if (loading) body = <Spinner />;
  return body;
}

export default Login;
