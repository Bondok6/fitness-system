import React, { useEffect, useRef, useState } from "react";
import style from "../assets/css/online.module.css";
import search from "../images/online/search.png";
import comment from "../images/online/comment.png";
import style1 from "../assets/css/home.module.css";
import caption from "../images/Logo/icon-caption.png";
import icon from "../images/Logo/icon.png";
import hover from "../images/Logo/icon-hover.png";
import axios from "axios";
import Spinner from "../UI/Spinner/Spinner";

export function Online(props) {
  const slider = useRef();
  const prevBtn = useRef();
  const nextBtn = useRef();

  const [counter, setCounter] = useState(1);
  const size = 200;

  const [video, setVideo] = useState({});
  const [videos, setVideos] = useState({});

  const [loading, setLoading] = useState(false);

  // const [me, setMe] = useState({});
  const [comm, setComment] = useState("");

  const [sear,setSearch]=useState("")

  useEffect(() => {
    axios.get(`/getVideo?id=${props.match.params.id}`).then((res) => {
      setVideo(res.data);

      axios
        .get(`/videos?limit=8&&category=${res.data.category}&&title=${sear}`)
        .then((res) => setVideos(res.data.docs));
    });
  }, [props.match.params.id,loading,sear]);

  useEffect(() => {
    slider.current.style.transform = "translateX(" + -size * counter + "px)";
  }, []);


  const nextHandler = () => {
    if (counter === videos.length - 5) return;
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

  let c = (
    <div class={style.writeComment}>
      <div class={style.commentIcon}>
        <img src={comment} alt="comment-icon" />
      </div>
      <div class={style.commentText}>
        <textarea
          placeholder="Write a Comment ..."
          onChange={(e) => {
            setComment(e.target.value);
          }}
        ></textarea>
        <button
          class={style.postBtn}
          onClick={() => {
            if (comm !== "") {
              setLoading(true);
              axios
                .post("/addComent", {
                  comment: comm,
                  videoId: props.match.params.id,
                })
                .then((res) => {
                  setLoading(false);
                });
            }
          }}
        >
          Post
        </button>
      </div>
    </div>
  );

  if (loading) c = <Spinner />;

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
            {videos.length > 0
              ? videos.map((r) => {
                  return (
                    <img
                      key={r.id}
                      id={r.id}
                      src={r.image}
                      alt=""
                      style={{ width: "200px", height: "200px",cursor:'pointer' }}
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

        <div class={style.video}>
          <iframe
            width="900"
            height="415"
            src={video.video?video.video:""}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>

        <div class={style.comments}>
          <div class={style.title}>
            <h3>Comments</h3>
            <div className={style.triangleDown}></div>
          </div>

          {video.comments
            ? video.comments.length > 0
              ? video.comments.map((c) => {
                  return (
                    <div class={style.comment} style={{marginLeft:'120px'}}>
                      <div>
                        <img
                          class={style.person}
                          src={c.user.photo}
                          alt="person"
                          style={{
                            borderRadius: "50%",
                            width: "80px",
                            height: "80px",
                          }}
                        />
                      </div>
                      <div class={style.commentContent}>
                        <h6>{c.user.username}</h6>
                        <span>{new Date(c.date).toLocaleDateString()}</span>
                        <p>{c.comment}</p>

                        <div class={style.commentFooter}></div>

                        <div class={style.replay}>
                          <textarea
                            placeholder="Write a Replay ..."
                            id="replay"
                          ></textarea>
                          <button class={style.postBtn}>Post</button>
                        </div>
                      </div>
                    </div>
                  );
                })
              : ""
            : ""}
        </div>
        {c}
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

export default Online;
