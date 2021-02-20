import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import style from '../../assets/css/authentication/signup.module.css';
import logo from '../../images/Logo/icon.png';


export class Verify extends Component {

  submitHandler = (e) => {
    e.preventDefault();
    const data = {
      phone: this.phone,
      code: this.code
    }

    
    axios({
      url: 'verify',
      method: 'POST',
      data: data
    })
      .then(res => {
        console.log(res);
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
              <input type="text" placeholder="Phone" className={style.inp}
              onChange={(e)=> this.phone = e.target.value}/>
            </div>

            <div className={style.input}>
              <input type="text" placeholder="Enter the code"
                className={style.inp}
              onChange={(e)=> this.code = e.target.value}/>
            </div>

            <button type="submit" className={style.btn} >Verify</button>

            <div className={style.anchor}>
              <Link onClick={()=> this.props.openHandler2("/login")}> go to login </Link>
            </div>

            <hr/>
          </form> 
        </div>
     </React.Fragment>
    )
  }
}

export default Verify
