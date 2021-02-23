import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import style from "../../assets/css/authentication/login.module.css";
import logo from "../../images/Logo/pinkLogo.png";
import Input from "../../Helper/Input/Input";
import { updatedObject, checkValidity } from "../../Helper/shared/shared";
import Spinner from "../../UI/Spinner/Spinner";
export class ForgetPassword extends Component {
  state = {
    controls: {
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
    },
    loading: false,
    error: null,
  };
  on(event, elementName) {
    const updated = updatedObject(this.state.controls, {
      [elementName]: updatedObject(this.state.controls[elementName], {
        valid: checkValidity(
          event.target.value,
          this.state.controls[elementName].validation
        ),
        value: event.target.value,
        touched: true,
      }),
    });
    this.setState({ controls: updated });
  }

  submitHandler = (e) => {
    e.preventDefault();
    if (this.state.controls.phone.valid) {
      this.setState({ loading: true, error: null });
      let p = "+2";
      let phone = p.concat(this.state.controls.phone.value);
      const data = {
        phone,
      };

      axios({
        url: "forget",
        method: "POST",
        data: data,
      })
        .then((res) => {
          // console.log(res);
          this.props.openHandler2("/reset");
        })
        .catch((err) => {
          this.setState({ loading: false, error: err.response.data.message });
        });
    }
  };

  render() {
    let body = (
      <React.Fragment>
        {this.state.error ? (
          <p className={style.Error}> {this.state.error} </p>
        ) : (
          ""
        )}
        <div className={style.login}>
          <form onSubmit={this.submitHandler}>
            <div>
              <img src={logo} alt="logo-icon" className={style.logo} />
            </div>

            <div className={style.input}>
              <Input
                inValid={!this.state.controls.phone.valid}
                changed={(e) => this.on(e, "phone")}
                value={this.state.controls.phone.value}
                elementType={this.state.controls.phone.elementType}
                hasValidity
                touched={this.state.controls.phone.touched}
                elementConfig={this.state.controls.phone.elementConfig}
                class={style.inp}
              />
            </div>

            <button className={style.btn}>Send code</button>

            <div className={style.anchor}>
              <Link onClick={() => this.props.openHandler2("/reset")}>
                Reset Password
              </Link>
            </div>
            <hr />
          </form>
        </div>
      </React.Fragment>
    );
    if (this.state.loading) body = <Spinner />;
    return body;
  }
}

export default ForgetPassword;
