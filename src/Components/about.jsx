import React, { Component } from 'react';
import style from '../assets/css/about.module.css';

export class About extends Component {
  render() {
    return (
      <React.Fragment>

        <section className={style.about}>
          <div className="container">
            <div className={style.about__img}>
              <div className={style.about__content}>
                <h2>About Us</h2>
                <p>
                  We are trying to solve Obesity Problem and encourage people to do sports anywhere and conduct them with gym centers.
                </p>
                <h4>Stakeholders</h4>
                <ul>
                  <li>Obese people</li>
                  <li>Youth</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

      </React.Fragment>
    )
  }
}

export default About
