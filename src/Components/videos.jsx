import React, { useEffect, useRef, useState } from "react";
import style from "../assets/css/online.module.css";
import style1 from "../assets/css/home.module.css";
import caption from "../images/Logo/icon-caption.png";
import icon from "../images/Logo/icon.png";
import hover from "../images/Logo/icon-hover.png";

import search from "../images/online/search.png";
import Video from "./video";
import axios from "axios";

function Videos(props) {
  const slider = useRef();
  const prevBtn = useRef();
  const nextBtn = useRef();

  const [counter, setCounter] = useState(1);
  const size = 200;

  const [recommendations, setRecommendations] = useState([]);
  const [videos, setVideos] = useState([]);

  const [sear,setSearch]=useState("")

  useEffect(() => {
    // console.log(props.match.params.id)
    axios
      .get("/getRecommindations?limit=10")
      .then((res) => setRecommendations(res.data.docs));

    axios
      .get(`/videos?limit=8&&category=${props.match.params.id}&&title=${sear}`)
      .then((res) => setVideos(res.data.docs));
  }, [props.match.params.id,sear]);


  useEffect(() => {
    slider.current.style.transform = "translateX(" + -size * counter + "px)";
  }, []);

  const nextHandler = () => {
    if (counter === recommendations.length - 6) return;
    slider.current.style.transition = "transform 0.4s ease-in-out";
    let c = counter + 1;
    slider.current.style.transform = "translateX(" + -size * c + "px)";
    setCounter(c);
  };
  const prevHandler = () => {
    if (counter <= 0) return;
    slider.current.style.transition = "transform 0.4s ease-in-out";
    let c = counter - 1;
    slider.current.style.transform = "translateX(" + -size * c + "px)";
    setCounter(c);
  };

  return (
    <section class={style.online}>
      <div class="container">
        <div class={style.searchBox}>
          <img class={style.searchIcon} src={search} alt="search-icon" />
          <input
            class={style.searchTxt}
            type="search"
            placeholder="type to search"
            onChange={(e)=>setSearch(e.target.value)}
          />
        </div>

        <div class={style.sliderContainer}>
          <div class={style.slider} ref={slider}>
            {recommendations.length > 0
              ? recommendations.map((r) => {
                  return (
                    <img
                      key={r.id}
                      id={r.id}
                      src={r.image}
                      alt=""
                      style={{ width: "200px", height: "180px",cursor:'pointer',marginRight:'10px' }}
                      onClick={()=>{
                        window.location.href=`/online/${r.id}`
                      }}
                    />
                  );
                })
              : ""}
          </div>
        </div>

        <a
          class={style.carouselControlPrev}
          ref={prevBtn}
          onClick={() => nextHandler()}
        >
          <span class={style.carouselControlPrevIcon}></span>
        </a>
        <a
          class={style.carouselControlNext}
          ref={nextBtn}
          onClick={() => prevHandler()}
        >
          <span class={style.carouselControlNextIcon}></span>
        </a>

        <div className={style.videos}>
          {videos.length > 0
            ? videos.map((v) => {
                return (
                  <Video
                    key={v.id}
                    id={v.id}
                    views={v.views.length}
                    image={v.image}
                    username={v.user.username}
                    title={v.title}
                    rating={v.rating}
                    photo={v.user.photo}
                    createdAt={v.createdAt}
                  />
                );
              })
            : ""}
          {/* <Video />
          <Video />
          <Video />
          <Video />
          <Video />
          <Video />
          <Video />
          <Video />
          <Video /> */}
        </div>
      </div>
      <footer
        className="links"
        style={{ padding: "25px", background: "black", marginTop: "15px" }}
      >
        <ul>
          <li className={style1.icon}>
            <img src={icon} alt="icon" />
          </li>
          <li className={style1.iconhover}>
            <img src={hover} alt="icon-hover" />
          </li>
        </ul>
        <div className={style1.iconcaption}>
          <img src={caption} alt="icon-caption" />
        </div>
      </footer>
    </section>
  );
}

export default Videos;
