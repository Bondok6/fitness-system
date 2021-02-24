import React, { Component } from 'react';
import style from '../assets/css/contact.module.css';

export class Contact extends Component {
  Y
  
  render() {
    return (
      <React.Fragment>
        <div className={style.contact}>
          <div className="container">

            <h2>Get <span>in</span> <br /> touch</h2>
            
            <div className={style.contactInfo}>
        
              <div className={style.cinput }>
                  <input type="text" placeholder="First Name"/>
              </div>

              <div className={style.cinput}>
                  <input type="text" placeholder="Second Name"/>
              </div>

              <div className={style.cinput}>
                  <input type="email" placeholder="Email"/>
              </div>

            </div>

            <div className={style.msg}>
                <textarea placeholder="Enter Your Message Here ..."></textarea>
            </div>

            <button> <a href="mailto:kyrilloshany99@gmail.com"> send </a> </button>

        </div>
      </div>
      </React.Fragment>
    )
  }
}

export default Contact
