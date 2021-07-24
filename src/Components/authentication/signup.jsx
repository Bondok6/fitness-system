import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import style from "../../assets/css/authentication/signup.module.css";
import logo from "../../images/Logo/icon.png";

import Input from "../../Helper/Input/Input";
import { updatedObject, checkValidity } from "../../Helper/shared/shared";
import Spinner from "../../UI/Spinner/Spinner";

export class Signup extends Component {
  state = {
    controls: {
      email: {
        value: "",
        valid: false,
        validation: {
          required: true,
          isEmail: true,
        },
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email Address",
          id: "Email",
        },
        touched: false,
      },
      name: {
        value: "",
        valid: false,
        validation: {
          required: true,
          minLength: 4,
        },
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Username",
          id: "name",
        },
        touched: false,
      },

      password: {
        value: "",
        valid: false,
        validation: {
          required: true,
          minLength: 6,
        },
        elementType: "input",
        elementConfig: {
          type: "Password",
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
    age: null,
    bodyFat: null,
    time: null,
    weight: null,
    totalBodyWater: null,
    gender: "male",
    loseWeight: null,
    dryLean: null,
    illness: 1,
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
    let url;
    console.log(this.props.method);
    url = this.props.method === "phone" ? "signup-phone" : "signup";
    if (
      this.state.controls.name.valid &&
      this.state.controls.email.valid &&
      this.state.controls.password.valid &&
      this.state.controls.phone.valid &&
      this.state.illness &&
      this.state.dryLean &&
      this.state.gender &&
      this.state.loseWeight &&
      this.state.totalBodyWater &&
      this.state.age &&
      this.state.weight
    ) {
      this.setState({ loading: true, error: null });

      let p = "+2";
      let phone = p.concat(this.state.controls.phone.value);

      const data = {
        username: this.state.controls.name.value,
        password: this.state.controls.password.value,
        email: this.state.controls.email.value,
        phone: phone,
        age: this.state.age,
        gender: this.state.gender,
        dryLeanMass: this.state.dryLean,
        bodyFatMass: this.state.bodyFat,
        time: this.state.time,
        lostWeight: this.state.loseWeight,
        initialWeight: this.state.weight,
        totalBodyWater: this.state.totalBodyWater,
        illness: this.state.illness,
      };

      axios({
        // url: '/signup-phone',
        url,
        method: "POST",
        data: data,
      })
        .then((res) => {
          // console.log(res.data);
          this.setState({ loading: false, error: null });
          this.props.method === "phone"
            ? this.props.openHandler2("/verify")
            : this.props.openHandler2("/verifyEmail");
        })
        .catch((err) => {
          console.log(err.response.data.message);
          this.setState({ loading: false, error: err.response.data.message });
        });
    }
  };

  openModal = () => {
    const modal = document.querySelector("#modal");
    modal.style.display = "flex";
  };
  closeModal = () => {
    const modal = document.querySelector("#modal");
    modal.style.display = "none";
  };

  render() {
    let code = (
      <React.Fragment>
        {this.state.error ? (
          <p className={style.Error}> {this.state.error} </p>
        ) : (
          ""
        )}
        <div className={style.signup}>
          <form onSubmit={this.submitHandler} autoComplete="off">
            <div>
              <img src={logo} className={style.logo} alt="logo" />
            </div>
            <div className={style.signup__container}>
              <div className={style.input}>
                {/* <input type="text" placeholder="User Name" className={style.inp}
              onChange={e => this.userName = e.target.value} /> */}
                <Input
                  inValid={!this.state.controls.name.valid}
                  changed={(e) => this.on(e, "name")}
                  value={this.state.controls.name.value}
                  elementType={this.state.controls.name.elementType}
                  hasValidity
                  touched={this.state.controls.name.touched}
                  elementConfig={this.state.controls.name.elementConfig}
                  class={style.inp}
                />
              </div>

              <div className={style.input}>
                {/* <input type="email" placeholder="Email Address"  className={style.inp}
              onChange={(e) => this.email = e.target.value} /> */}
                <Input
                  inValid={!this.state.controls.email.valid}
                  changed={(e) => this.on(e, "email")}
                  value={this.state.controls.email.value}
                  elementType={this.state.controls.email.elementType}
                  hasValidity
                  touched={this.state.controls.email.touched}
                  elementConfig={this.state.controls.email.elementConfig}
                  class={style.inp}
                />
              </div>

              <div className={style.input}>
                {/* <input type="password" placeholder="Password" className={style.inp}
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

              <div className={style.input}>
                {/* <input type="text" placeholder="phone"  className={style.inp}
              onChange={(e) => this.phone = e.target.value} /> */}
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

              <div className={style.data_entry}>
                <span onClick={this.openModal}>Please Fill This Data </span>
              </div>
            </div>

            <div className={style.modal} id="modal">
              <button className={style.close_modal} onClick={this.closeModal}>
                &times;
              </button>

              <h3 className={style.modal_title}>
                This data helps us recommend the best things for you ...
              </h3>

              <div className={style.input}>
                <input
                  type="number"
                  placeholder="Total Body Water"
                  className={style.inp}
                  onChange={(e) =>
                    this.setState({ totalBodyWater: e.target.value })
                  }
                />
              </div>

              <div className={style.input}>
                <input
                  type="number"
                  placeholder="Your Weight (kg)"
                  className={style.inp}
                  onChange={(e) => this.setState({ weight: e.target.value })}
                />
              </div>

              <div className={style.input}>
                <input
                  type="number"
                  placeholder="How many kg do you want to lose?"
                  className={style.inp}
                  onChange={(e) =>
                    this.setState({ loseWeight: e.target.value })
                  }
                />
              </div>

              <div className={style.input}>
                <input
                  type="number"
                  placeholder="Expected duration of weight loss (days)"
                  className={style.inp}
                  onChange={(e) => this.setState({ time: e.target.value })}
                />
              </div>
              <div className={style.gender}>
                <span>Gender</span>
                <input
                  type="radio"
                  value="male"
                  name="gender"
                  onChange={(e) => this.setState({ gender: e.target.value })}
                />{" "}
                Male
                <input
                  type="radio"
                  value="female"
                  name="gender"
                  onChange={(e) => this.setState({ gender: e.target.value })}
                />{" "}
                Female
              </div>
              <div className={style.input}>
                <input
                  type="number"
                  placeholder="Body Fat Mass"
                  className={style.inp}
                  onChange={(e) => this.setState({ bodyFat: e.target.value })}
                />
              </div>

              <div className={style.input}>
                <input
                  type="number"
                  placeholder="Dry Lean Mass"
                  className={style.inp}
                  onChange={(e) => this.setState({ dryLean: e.target.value })}
                />
              </div>

              <div className={style.input}>
                <input
                  type="number"
                  placeholder="Your Age"
                  className={style.inp}
                  onChange={(e) => this.setState({ age: e.target.value })}
                />
              </div>
              <div className={style.input}>
                <select
                  onChange={(e) => {
                    console.log(e.target.value);
                    this.setState({ illness: e.target.value });
                  }}
                  value={this.state.illness}
                >
                  <option value={1}>Diabetes</option>
                  <option value={2}>Heart Disease</option>
                  <option value={3}>Liver Disease</option>
                  <option value={4}>Hypertension</option>
                  <option value={5}>high Cholesterol</option>
                  <option value={6}>None</option>
                </select>
                {/* <input
                  type="number"
                  placeholder="Your Age"
                  className={style.inp}
                  onChange={(e) => this.setState({ age: e.target.value })}
                /> */}
              </div>

              <button className={style.okBtn}>OK</button>
            </div>

            <button type="submit" className={style.btn}>
              sign up
            </button>

            <div className={style.anchor}>
              <Link
                className="d-block mb-3"
                onClick={() => {
                  this.props.method === "phone"
                    ? this.props.openHandler2("/verify", this.props.method)
                    : this.props.openHandler2(
                        "/verifyEmail",
                        this.props.method
                      );
                }}
              >
                verify account
              </Link>
            </div>
            <hr />
          </form>
        </div>
      </React.Fragment>
    );
    if (this.state.loading) {
      code = <Spinner />;
    }
    return code;
  }
}

export default Signup;
