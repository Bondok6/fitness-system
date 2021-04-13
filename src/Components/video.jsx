import React from "react";
import style from "../assets/css/online.module.css";
import vidIcon from "../images/Path 20.svg";
import star from "../images/Path 2171.svg";

function video(props) {
  return (
    <div className={style.videos__child} onClick={()=>{
      window.location.href=`/online/${props.id}`
    }}>
      <div className={style.videos__video}>
        <div className={style.videos__image}>
          <img src={props.image} alt="video" className={style.videos__photo} />
          <img src={vidIcon} alt="videoIcon" className={style.videos__icon} />
        </div>
        <div className={style.videos__bio}>
          <img src={props.photo} />
          <div className={style.videos__about}>
            <div className={style.videos__creatorName}>
              <h3>{props.username}</h3>
              <p>{props.createdAt}</p>
            </div>

            <p className={style.videos__info}>{props.title}</p>
            <div className={style.videos__rating}>
              <p>{props.views}</p>
              <div>
                {props.rating}
                <img src={star} alt="star" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default video;
