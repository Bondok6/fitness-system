import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import style from '../../assets/css/authentication/login.module.css';
import logo from '../../images/Logo/pinkLogo.png';

export class ForgetPassword extends Component {

  submitHandler = (e) => {
    e.preventDefault();
    const data = {
      phone: this.phone
    }

    
    axios({
      url: 'forget',
      method: 'POST',
      data: data
    })
      .then(res => {
        console.log(res);
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
              <input type="text" placeholder="Phone"
              onChange={(e)=> this.phone = e.target.value}/>
            </div>

            
            <button className={style.btn}>Send code</button>

            <div className={style.anchor}>
            <Link to="/reset">Reset Password</Link>
            </div>
          <hr/>
        </form>       
      </div>
    </React.Fragment>
    )
  }
}

export default ForgetPassword;
