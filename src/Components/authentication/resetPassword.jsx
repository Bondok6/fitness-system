import React, { Component } from 'react';
import axios from 'axios';
import style from '../../assets/css/authentication/login.module.css';
import logo from '../../images/Logo/pinkLogo.png';

export class ResetPassword extends Component {

  submitHandler = (e) => {
    e.preventDefault();
    
    const data = {
      phone: this.phone,
      code: this.code,
      password: this.password
    }

    
    axios({
      url: 'verify-reset',
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
            
            <div className={style.input}>
              <input type="text" placeholder="Enter the code"
              onChange={(e)=> this.code = e.target.value}/>
            </div>
            
            <div className={style.input}>
              <input type="password" placeholder="New Password"
                onChange={(e) => this.password = e.target.value} />
            </div>

            <button type="submit" className={style.btn}>Reset</button>
            <hr/>
          </form>
        </div>
     </React.Fragment>
    )
  }
}

export default ResetPassword;
