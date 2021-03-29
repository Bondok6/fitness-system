import React, { Component } from 'react';
import style from "../assets/css/online.module.css";
import search from "../images/online/search.png";
import person1 from "../images/online/person1.png";
import person2 from "../images/online/person2.png";
import person3 from "../images/online/person3.png";
import comment from "../images/online/comment.png";


export class Online extends Component {
  render() {
    return (
      <React.Fragment>
        <div className={style.online}>
          <div className="container">

            <div className={style.searchBox}>
              <img className={style.searchIcon} src={search} alt="search-icon"/>
              <input className={style.searchTxt} type="search" placeholder="type to search"/>
            </div>

            <div className={style.sliderContainer}>
              <div className={style.slider}>
                <img src="https://picsum.photos/200/200" alt=""/>
                <img src="https://picsum.photos/200/200" alt=""/>
                <img src="https://picsum.photos/200/200" alt=""/>
                <img src="https://picsum.photos/200/200" alt=""/>
                <img src="https://picsum.photos/200/200" alt=""/>
                <img src="https://picsum.photos/200/200" alt=""/>
                <img src="https://picsum.photos/200/200" alt=""/>
                <img src="https://picsum.photos/200/200" alt=""/>
              </div>
            </div>

            <a className="carousel-control-prev">
              <span className="carousel-control-prev-icon"></span>
            </a>
            <a className="carousel-control-next">
              <span className="carousel-control-next-icon"></span>
            </a>

            <div className={style.video}>
              <iframe width="600" height="315" src="https://www.youtube.com/embed/g3ZNprweps0" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
            </div>

            <div className={style.comments}>

              <div className={style.title}>
                <h3>Comments</h3>
              </div>

              <div className={style.comment}>
                <div>
                  <img className={style.person} src={person1} alt="person"/>
                </div>
                <div className={style.commentContent}>
                  <h6>Ronald Hughes</h6>
                  <span>12 july</span>
                  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi placeat alias velit minima tempore,
                    itaque pariatur laudantium molestiae sint dolorem aut! Deleniti qui possimus vero! Possimus nulla saepe
                    rerum repellat.
                  </p>

                  <div className={style.commentFooter}>
                    <span>❤</span>
                    <button className={style.btnReply}>reply</button>
                  </div>

                  <div className={style.replay}>
                    <textarea placeholder="Write a Replay ..." id="replay"></textarea>
                    <button className={style.postBtn}>Post</button>
                  </div>



                </div>
              </div>
              <div className={style.comment}>
                <div>
                  <img className={style.person} src={person2} alt="person"/>
                </div>
                <div className={style.commentContent}>
                  <h6>Ronald Hughes</h6>
                  <span>12 july</span>
                  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi placeat alias velit minima tempore,
                    itaque pariatur laudantium molestiae sint dolorem aut! Deleniti qui possimus vero! Possimus nulla saepe
                    rerum repellat.
                  </p>

                  <div className={style.commentFooter}>
                    <span>❤</span>
                    <button className={style.btnReply}>reply</button>
                  </div>

                  <div className={style.replay}>
                    <textarea placeholder="Write a Replay ..." id="replay"></textarea>
                    <button className={style.postBtn}>Post</button>
                  </div>

                </div>
              </div>
              <div className={style.comment}>
                <div>
                  <img className={style.person} src={person3} alt="person"/>
                </div>
                <div className={style.commentContent}>
                  <h6>Ronald Hughes</h6>
                  <span>12 july</span>
                  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi placeat alias velit minima tempore,
                    itaque pariatur laudantium molestiae sint dolorem aut! Deleniti qui possimus vero! Possimus nulla saepe
                    rerum repellat.
                  </p>

                  <div className={style.commentFooter}>
                    <span>❤</span>
                    <button className={style.btnReply}>reply</button>
                  </div>

                  <div className={style.replay}>
                    <textarea placeholder="Write a Replay ..." id="replay"></textarea>
                    <button className={style.postBtn}>Post</button>
                  </div>

                </div>
              </div>

            </div>

            <div className={style.writeComment}>
              <div className={style.commentIcon}>
                <img src={comment} alt="comment-icon"/>
              </div>
              <div className={style.commentText}>
                <textarea placeholder="Write a Comment ..."></textarea>
                <button className={style.postBtn}>Post</button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Online
