import React, { Component } from 'react';
import axios from 'axios';
import style from '../assets/css/home.module.css';
import Star from '../images/svg/star.svg';
import QR from '../images/svg/qr.svg';
import gym1 from '../images/gym-1.jpg';
import gym2 from '../images/gym-2.jpg';
import gym3 from '../images/gym-3.jpg';

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
      </React.Fragment>
    )
  }
}

export default Home;
