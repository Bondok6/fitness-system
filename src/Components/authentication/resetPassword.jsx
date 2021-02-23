import React, { Component } from "react";
import axios from "axios";
import style from "../../assets/css/authentication/login.module.css";
import logo from "../../images/Logo/pinkLogo.png";
import Input from "../../Helper/Input/Input";
import { updatedObject, checkValidity } from "../../Helper/shared/shared";
import Spinner from "../../UI/Spinner/Spinner";

export class ResetPassword extends Component {
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
          placeholder: "New Password",
        },
        touched: false,
      },
      code: {
        value: "",
        valid: false,
        validation: {
          required: true,
          minLength: 4,
        },
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Verify Code",
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
    if (
      this.state.controls.phone.valid &&
      this.state.controls.password.valid &&
      this.state.controls.code.valid
    ) {
      let p = "+2";
      let phone = p.concat(this.state.controls.phone.value);

      const data = {
        phone,
        code: this.state.controls.code.value,
        password: this.state.controls.password.valid,
      };

      axios({
        url: "verify-reset",
        method: "POST",
        data: data,
      })
        .then((res) => {
          this.props.openHandler2("/login");
        })
        .catch((err) => {
          this.setState({ loading: false, error: err.response.data.message });
        });
    }
  };

  render() {
    let body = (
      <React.Fragment>
        <div className={style.login}>
          <form onSubmit={this.submitHandler}>
            <div>
              <img src={logo} alt="logo-icon" className={style.logo} />
            </div>

            <div className={style.input}>
              {/* <input type="text" placeholder="Phone"
            onChange={(e)=> this.phone = e.target.value}/> */}
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

            <div className={style.input}>
              {/* <input type="text" placeholder="Enter the code"
            onChange={(e)=> this.code = e.target.value}/> */}
              <Input
                inValid={!this.state.controls.code.valid}
                changed={(e) => this.on(e, "code")}
                value={this.state.controls.code.value}
                elementType={this.state.controls.code.elementType}
                hasValidity
                touched={this.state.controls.code.touched}
                elementConfig={this.state.controls.code.elementConfig}
                class={style.inp}
              />
            </div>

            <div className={style.input}>
              {/* <input type="password" placeholder="New Password"
              onChange={(e) => this.password = e.target.value} /> */}
              <Input
                inValid={!this.state.controls.password.valid}
                changed={(e) => this.on(e, "password")}
                value={this.state.controls.password.value}
                elementType={this.state.controls.password.elementType}
                hasValidity
                touched={this.state.controls.password.touched}
                elementConfig={this.state.controls.password.elementConfig}
                class={style.inp}
              />
            </div>

            <button type="submit" className={style.btn}>
              Reset
            </button>
            <hr />
          </form>
        </div>
      </React.Fragment>
    );
    if (this.state.loading) body = <Spinner />;
    return body;
  }
}

export default ResetPassword;
