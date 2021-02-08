import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import style from '../../assets/css/authentication/signup.module.css';
import logo from '../../images/Logo/icon.png';


export class Signup extends Component {

  submitHandler = (e) => {
    e.preventDefault();

    const data = {
      username: this.userName,
      password: this.password,
      email: this.email,
      phone: this.phone
    };  

    axios({
      url: '/signup-phone',
      method: 'POST',
      data: data
    })
      .then(res => {
        console.log(res.data);
      }).catch(err => {
        console.log(err);
      });

  }


  render() {
    return (
      <React.Fragment>
        <div className={style.signup}>
          <form onSubmit={this.submitHandler}>
            
            <div>
              <img src={logo} className={style.logo} alt="logo"/>
            </div>
          
            <div className={style.input}>
              <input type="text" placeholder="User Name" className={style.inp}
                onChange={e => this.userName = e.target.value} />
            </div>

            <div className={style.input}>
              <input type="email" placeholder="Email Address"  className={style.inp}
                onChange={(e) => this.email = e.target.value} />
            </div>
              
            <div className={style.input}>
              <input type="password" placeholder="Password" className={style.inp}
                onChange={(e) => this.password = e.target.value} />
            </div>
            
            <div className={style.input}>
              <input type="text" placeholder="phone"  className={style.inp}
                onChange={(e) => this.phone = e.target.value} />
            </div>
        
            <button type="submit" className={style.btn}>sign up</button>

            <div className={style.anchor}>
              <Link to="/verify" className="d-block mb-3">verify account</Link>
            </div>
           <hr/>
          </form>
        </div>
      </React.Fragment>
    )
  }
}

export default Signup;