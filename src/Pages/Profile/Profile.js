import React from "react";
import  s from "./Profile.module.css";
import add from "../../images/add.png";
import profile from "../../images/profile.jpg";
import line from "../../images/svg/line.svg";
function Profile(props) {
  return (
    <section className={s.profile}>
      <div className="container">
        <div>
          <img className={s.line} src={line} alt="line" />
          <div className={s.circle}>
            <img 
              className={s.profile_img}
              src="https://picsum.photos/220/220"
              alt="profile"
            />
            <img className={s.add_img} src={add} alt="add" />
          </div>
          <div className={s.info}>
            <h4>kyrillos hany</h4>
            <div className={s.details}>
              <div>
                <span>Weight: </span>60kg
              </div>
              <div>
                <span>height: </span>160cm
              </div>
              <div>
                <span>Diet Plan: </span>Intermittent Fasting
              </div>
            </div>
          </div>
        </div>

        {/* images section */}
        <hr />
        <div className={s.Images}>
          <h2 className={s.Images__heading}>
            {" "}
            A comparison indicating your changes every month{" "}
          </h2>
          <div className={s.Images__info}>
            <div className={s.Images__photo}>
              <img src={profile} alt="profile pic" />
            </div>
            <div className={s.Images__btns}>
                <div className={s.Images__btns_monthes} >

                <button> Month 1 </button>
                <button> Month 2 </button>
                <button> Month 3 </button>
                <button> Month 4 </button>
                <button> Month 5 </button>
                <button> Month 6 </button>
                <button> Month 7 </button>
                <button> Month 8 </button>
                <button> Month 9 </button>
                <button> Month 10 </button>
                </div>
            <button className={s.Images__update}> update </button>
            </div>
          </div>
        </div>

        <hr />

        <hr />

        <div className={s.charts}>
          <h3>Motivation Charts</h3>
          <div id="calendar_basic" className={s.chart_content}></div>
        </div>

        <hr />

        <div className={s.cards}>
          <div className={s.card_container}>
            <div className={s.upper_container}>
              <div className={s.image_container}>
                <img src={profile} />
              </div>
            </div>

            <div className={s.lower_container}>
              <div>
                <h3>Alaina Wick</h3>
                <h4>Front-end Developer</h4>
              </div>
              <div>
                <p>
                  sodales accumsan ligula. Aenean sed diam tristique, fermentum
                  mi nec, ornare arcu.
                </p>
              </div>
              <div>
                <a href="#" className={s.btn}>
                  View profile
                </a>
              </div>
            </div>
          </div>

          <div className={s.card_container}>
            <div className={s.upper_container}>
              <div className={s.image_container}>
                <img src={profile} />
              </div>
            </div>

            <div className={s.lower_container}>
              <div>
                <h3>Alaina Wick</h3>
                <h4>Front-end Developer</h4>
              </div>
              <div>
                <p>
                  sodales accumsan ligula. Aenean sed diam tristique, fermentum
                  mi nec, ornare arcu.
                </p>
              </div>
              <div>
                <a href="#" className={s.btn}>
                  View profile
                </a>
              </div>
            </div>
          </div>

          <div className={s.card_container}>
            <div className={s.upper_container}>
              <div className={s.image_container}>
                <img src={profile} />
              </div>
            </div>

            <div className={s.lower_container}>
              <div>
                <h3>Alaina Wick</h3>
                <h4>Front-end Developer</h4>
              </div>
              <div>
                <p>
                  sodales accumsan ligula. Aenean sed diam tristique, fermentum
                  mi nec, ornare arcu.
                </p>
              </div>
              <div>
                <a href="#" className={s.btn}>
                  View profile
                </a>
              </div>
            </div>
          </div>
          <div className={s.card_container}>
            <div className={s.upper_container}>
              <div className={s.image_container}>
                <img src={profile} />
              </div>
            </div>

            <div className={s.lower_container}>
              <div>
                <h3>Alaina Wick</h3>
                <h4>Front-end Developer</h4>
              </div>
              <div>
                <p>
                  sodales accumsan ligula. Aenean sed diam tristique, fermentum
                  mi nec, ornare arcu.
                </p>
              </div>
              <div>
                <a href="#" className={s.btn}>
                  View profile
                </a>
              </div>
            </div>
          </div>
          <div className={s.card_container}>
            <div className={s.upper_container}>
              <div className={s.image_container}>
                <img src={profile} />
              </div>
            </div>

            <div className={s.lower_container}>
              <div>
                <h3>Alaina Wick</h3>
                <h4>Front-end Developer</h4>
              </div>
              <div>
                <p>
                  sodales accumsan ligula. Aenean sed diam tristique, fermentum
                  mi nec, ornare arcu.
                </p>
              </div>
              <div>
                <a href="#" className={s.btn}>
                  View profile
                </a>
              </div>
            </div>
          </div>
          <div className={s.card_container}>
            <div className={s.upper_container}>
              <div className={s.image_container}>
                <img src={profile} />
              </div>
            </div>

            <div className={s.lower_container}>
              <div>
                <h3>Alaina Wick</h3>
                <h4>Front-end Developer</h4>
              </div>
              <div>
                <p>
                  sodales accumsan ligula. Aenean sed diam tristique, fermentum
                  mi nec, ornare arcu.
                </p>
              </div>
              <div>
                <a href="#" className={s.btn}>
                  View profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
