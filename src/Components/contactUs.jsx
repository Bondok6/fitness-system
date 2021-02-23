import React, { Component } from 'react';
import style from '../assets/css/contact.module.css';

export class Contact extends Component {
  render() {
    return (
      <React.Fragment>
        <div className={style.contact}>
          <div className="container">

            <h2>Get <hp-in>in</hp-in> <br /> touch</h2>
            
          <div className={style.contactInfo}>
        
              <div className={style.cinput }>
                  <input type="text" 
                    placeholder="First Name"
                  />
              </div>
              <div className={style.cinput}>
                  <input type="text" 
                    placeholder="Second Name"
                  />
              </div>
              <div className={style.cinput}>
                  <input type="email"
                    placeholder="Email"
                    />
              </div>
            </div>
            <div className={style.msg}>
                <textarea placeholder="Enter Your Message Here ..."></textarea>
            </div>
            <button> send </button>
        </div>
      </div>
      </React.Fragment>
    )
  }
}

export default Contact
