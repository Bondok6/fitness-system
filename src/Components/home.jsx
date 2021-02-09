import React, { Component } from 'react';
import axios from 'axios';
import style from '../assets/css/home.module.css';
import Star from '../images/svg/star.svg';
import Wave1 from '../images/svg/wave-1.svg';
import Wave2 from '../images/svg/wave-2.svg';
import QR from '../images/svg/qr.svg';
import gym1 from '../images/gym-1.jpg';
import gym2 from '../images/gym-2.jpg';
import gym3 from '../images/gym-3.jpg';
import join from '../images/join-now.jpg';
import doctor from '../images/doctor.png';
import icon from '../images/Logo/icon.png';
import caption from '../images/Logo/icon-caption.png';
import hover from '../images/Logo/icon-hover.png';

export class Home extends Component {

  state = {};

  componentDidMount() {

    axios.get('profile')
      .then(res => {
        this.setState({
          user: res.data
        })
      }).catch(err => {
        console.error(err);
      });
    
  }

  render() {
    // if (this.state.user) {
    //   return (
    //     <div className="conatiner mt-5">
    //       <h2> You are login successfully </h2>
    //       <h3>Welcome, {this.state.user.username}</h3>
    //     </div>
    //   )
    // }
    return (
      <React.Fragment>
       <section id="top">
          <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">

              <div className="carousel-item active">

                <div className={`${style.images} ${style.image1}`}></div>

                <div className={style.fcaption}>

                  <h3>play your favorite workout</h3>
                  <div className={style.btncontainer}>
                    <button className={style.fbtn}>get in contact</button>
                    <button className={style.fbtn}>learn more</button>
                  </div>

                </div>
              </div>

              <div className="carousel-item">

                <div className={`${style.images} ${style.image2}`}></div>

                <div className={style.scaption}>
                  <h3>Take the next step to be more fit</h3>
                  <p>
                    Online personal training makes it easy to fit a good workout into any routine. Get a small portion of
                    the time and dedicate it to your health and fitness. You deserve it, and we can't wait to meet you.
                  </p>
                  
                  <div className={style.btncontainer}>
                    <button className={style.sbtn}>View Schedule</button>
                    <button className={style.sbtn}>Tutorial</button>
                  </div>

                </div>
              </div>

              <div className="carousel-item">

                <div className={`${style.images} ${style.image3}`}></div>

                <div className={style.tcaption}>

                  <h3>Have you ever felt bored with the diet ?</h3>
                  <p>we will suggest alternatives to you with the same number of calories for fruits and vegetables that you
                    want to change in easy ways</p>
                  <button className={style.tbtn}>learn more</button>

                </div>
              </div>

              <div className="carousel-item">

                <div className={`${style.images} ${style.image4}`}></div>

                <div className={style.ftcaption}>

                  <h3>do you have a problem with dealing with <br/> the gym machines?</h3>
                  <p>scan QR-code and will show you <br/> how to use the gym machines</p>
                  <div className={style.link}>
                    <a href="#"> learn more</a> 
                  </div>
                </div>

              </div>
            </div>

            <a className={`${style["carousel-control-prev"]}`} href="#carouselExampleControls" role="button" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
            </a>
            <a className={`${style["carousel-control-next"]}`} href="#carouselExampleControls" role="button" data-bs-slide="next">
              <span className="carousel-control-next-icon"></span>
            </a>
        </div>
      </section>
       
       <section className={style.recommend}>
        <div className="container">
          <div className={style.qrsection}>
            <img src={QR} alt="qr-code" className={style.qrimg}/>
            <h4>
              you can scan QR-code which available on sports machines, and We show him the correct way to perform this
              exercise.
            </h4>
          </div>
          <button className={style.qrbtn}>learn more</button>
          <h2>Recommended gym for you</h2>
            
          <div className={style.cards}>
              <div className={style.card}>
                
                <img src={gym1} alt="gym" className={style.cardimg}/>  
                
              <div className={style.cardcaption}>
                <h3>Elsheik zayed city</h3>
                <span>
                  <img src={Star} alt="stars" className={style.svg}/>
                  <img src={Star} alt="stars" className={style.svg}/>
                  <img src={Star} alt="stars" className={style.svg}/>
                  <img src={Star} alt="stars" className={style.svg}/>
                </span>
              </div>
            </div>
              <div className={style.card}>

                <img src={gym2} alt="gym" className={style.cardimg} /> 
                
                <div className={style.cardcaption}>
              <h3>Elsheik zayed city</h3>
              <span>
                <img src={Star} alt="stars" className={style.svg}/>
                <img src={Star} alt="stars" className={style.svg}/>
                <img src={Star} alt="stars" className={style.svg}/>
                <img src={Star} alt="stars" className={style.svg}/>
              </span>
            </div>
          </div>
              <div className={style.card}>
              <img src={gym3} alt="gym" className={style.cardimg}/>  
                <div className={style.cardcaption}>
              <h3>Elsheik zayed city</h3>
              <span>
                <img src={Star} alt="stars" className={style.svg}/>
                <img src={Star} alt="stars" className={style.svg}/>
                <img src={Star} alt="stars" className={style.svg}/>
                <img src={Star} alt="stars" className={style.svg}/>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
      
       <div className={style.onlinetraining}>
          <div className={`container ${style.flexsection}`}>
            <div className={style.textsection}>
            <h2>online training</h2>
            <p> Live training is the best way to make exercises at home to keep fit and improve personal fitness and
              health, Since the workout sessions aren’t done in person, you can choose to workout anytime you like. We’re
              all busy. You don’t want to have to coordinate schedules with someone who trains in a gym across town, or
              rush to and from work to get to the gym. Another bonus is that many online workouts contain a lot of
              bodyweight exercises, which can be completed at home.</p>
          </div>
            <div className={style.joinnow}>
            <img src={join} alt="join now"/>
          </div>
        </div>
      </div>
      
       <div className={style.waveone}>
        <img src={Wave1} alt="wave"/>
       </div>
       <div className={style.wavetwo}>
        <img src={Wave2} alt="wave"/>
       </div>
        
       <div className={style.askdoctor}>
        <div className="container">
          <img src={doctor} alt="doctor"/>
            <div className={style.asktext}>
            <h2>ask doctor</h2>
            <p>If you want to communicate with a doctor, gym trainer, or a nutritionist you can do this , just signup and
              the official will respond to you with a diet suitable for your condition</p>
          </div>
        </div>
      </div>

       <footer className="links">
      <ul>
            <li className={style.icon}>
          <img src={icon} alt="icon"/>
        </li>
            <li className={style.iconhover}>
          <img src={hover} alt="icon-hover"/>
        </li>
      </ul>
      <div className={style.iconcaption}>
        <img src={caption} alt="icon-caption"/>
      </div>
      <p>&copy;
        <script>document.write(new Date().getFullYear());</script> team work smart fitness system .
      </p>
      <p>&ldquo;its going to be hard, but hard is not impossible.&rdquo; &mdash; Project owners</p>
    </footer> 
      </React.Fragment>
    )
  }
}

export default Home;
