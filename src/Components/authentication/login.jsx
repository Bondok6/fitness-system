import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import style from '../../assets/css/authentication/login.module.css';
import logo from '../../images/Logo/pinkLogo.png';

export class Login extends Component {

  submitHandler = (e) => {
    e.preventDefault();

    const data = {
      phone: this.phone,
      password: this.password
    }

    axios({
      url: 'login-phone',
      method: 'POST',
      data: data
    })
      .then(res => {
        localStorage.setItem('token', res.data.token);
      }).catch(err => {
        console.log(err);
      })

  }

  render() {
    return (
      <React.Fragment>

        <div className={style.login}>
          <form onSubmit={this.submitHandler}>
            
            <div>
              <img src={logo} alt="logo-icon" className={style.logo}/>
            </div>

            <div className={style.input}>
              <input type="text"
                onChange={(e) => this.phone = e.target.value} placeholder="Phone"
              />
            </div>

            <div className={style.input}>
              <input type="password" placeholder="Password"
                onChange={(e) => this.password = e.target.value} 
              />
            </div>

            <button type="submit" className={style.btn}>Login</button>

            <div className={style.anchor}>
             <Link to="/forget"> forget password</Link>
            </div>
            <hr />
          </form>
      </div>

     </React.Fragment>
    )
  }
}

export default Login
