import React, { useEffect, useState } from "react";
import style from "../assets/css/online.module.css";
import search from "../images/online/search.png";
// import person1 from "../images/gym-3.jpg";
import style1 from "../assets/css/home.module.css";
import caption from "../images/Logo/icon-caption.png";
import icon from "../images/Logo/icon.png";
import hover from "../images/Logo/icon-hover.png";
import axios from "axios";

function VideoCategories(props) {
  const [sear,setSearch]=useState("")
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get(`/categories?title=${sear}`).then((res) => {
      setCategories(res.data);
    });
  }, [sear]);
  return (
    <section class={style.onlineVideo}>
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
        <div className={style.categories}>
          <h2 className={style.categories__header}>Categories</h2>
          <div className={style.categories__videos}>
            {categories.length > 0
              ? categories.map((c) => {
                  return (
                    <div className={style.categories__video} key={c.id} onClick={()=>{
                      window.location.href=`/Videos/${c.id}`
                    }}>
                      <img src={c.image} alt={c.title} />
                      <h4>{c.title}</h4>
                      <div></div>
                    </div>
                  );
                })
              : ""}
          </div>
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

export default VideoCategories;
