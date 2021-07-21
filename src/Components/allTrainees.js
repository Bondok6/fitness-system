import React, { useEffect } from "react";
import style from "../assets/css/allTrainees.module.css";
function AllTrainees(props) {
    console.log("puplished")
  useEffect(() => {
    const slider = document.querySelector(".inner_slider");
    const sliderImages = document.querySelectorAll(".inner_slider img");
    const month = document.querySelector(".month");

    const mainSlider = document.querySelector(".main_slider");

    const leftSlider = document.querySelector(".slider");
    const leftSliderImgs = document.querySelectorAll(".slider img");

    //Buttons
    const prevBtn = document.querySelector(".carousel-control-prev");
    const nextBtn = document.querySelector(".carousel-control-next");

    const backBtn = document.querySelector(".arrow_back");
    const forwardBtn = document.querySelector(".arrow_forward");

    const upBtn = document.querySelector(".arrow_up");
    const downBtn = document.querySelector(".arrow_down");

    let counter = 1;
    const size = 350;

    let mainCounter = 1;
    const mainSize = 1000;

    let leftCounter = 1;
    const leftSize = 90;

    slider.style.transform = "translateX(" + -size * counter + "px)";
    mainSlider.style.transform =
      "translateX(" + -mainSize * mainCounter + "px)";
    leftSlider.style.transform =
      "translatey(" + -leftSize * leftCounter + "px)";

    nextBtn.addEventListener("click", () => {
      if (counter == sliderImages.length - 1) return;
      slider.style.transition = "transform 0.4s ease-in-out";
      counter++;
      slider.style.transform = "translateX(" + -size * counter + "px)";
      month.innerHTML = `month ${counter + 1}`;
    });

    prevBtn.addEventListener("click", () => {
      if (counter <= 0) return;
      slider.style.transition = "transform 0.4s ease-in-out";
      counter--;
      slider.style.transform = "translateX(" + -size * counter + "px)";
      month.innerHTML = `month ${counter + 1}`;
    });

    forwardBtn.addEventListener("click", () => {
      if (mainCounter == 2) return;
      mainSlider.style.transition = "transform 0.4s ease-in-out";
      mainCounter++;
      mainSlider.style.transform =
        "translateX(" + -mainSize * mainCounter + "px)";
    });
    backBtn.addEventListener("click", () => {
      if (mainCounter <= 0) return;
      mainSlider.style.transition = "transform 0.4s ease-in-out";
      mainCounter--;
      mainSlider.style.transform =
        "translateX(" + -mainSize * mainCounter + "px)";
    });

    downBtn.addEventListener("click", () => {
      if (leftCounter == leftSliderImgs.length - 5) return;
      leftSlider.style.transition = "transform 0.4s ease-in-out";
      leftCounter++;
      leftSlider.style.transform =
        "translateY(" + -leftSize * leftCounter + "px)";
    });
    upBtn.addEventListener("click", () => {
      if (leftCounter <= 0) return;
      leftSlider.style.transition = "transform 0.4s ease-in-out";
      leftCounter--;
      leftSlider.style.transform =
        "translateY(" + -leftSize * leftCounter + "px)";
    });
  }, []);

  return (
    <div className={style.body}>
      <div class={style.left_side}>
        <div class={style.left_slider}>
          <div class={`${style.slider} slider`}>
            <img src="images/images/friend_2.png" />
            <img src="images/images/friend_1.png" />
            <img src="images/images/friend_4.png" />
            <img src="images/images/friend_3.png" />
            <img src="images/images/friend_5.png" />
            <img src="images/images/friend_2.png" />
            <img src="images/images/friend_3.png" />
            <img src="images/images/friend_5.png" />
            <img src="images/images/friend_4.png" />
            <img src="images/images/friend_1.png" />
            <img src="images/images/friend_3.png" />
            <img src="images/images/friend_5.png" />
          </div>
        </div>
        <i class={`material-icons ${style.arrows} ${style.arrow_up} arrow_up`}>
          keyboard_arrow_up
        </i>
        <i class={`material-icons ${style.arrows} ${style.arrow_down} arrow_down`}>
          keyboard_arrow_down
        </i>
      </div>

      <section class={style.comparison}>
        <div class="container">
          <div class={style.profile}>
            <img src="images/style1.jpg" class={style.profile__img} />
            <h3 class={style.profile__name}>Kyrillos Hany</h3>
          </div>

          <div class={style.outer_slider}>
            <div class={`${style.main_slider} main_slider`}>
              <div class={style.slide_one}>
                <div class={style.slider_card}>
                  <div class={`${style.inner_slider} inner_slider`}>
                    <div>
                      <img src="images/style1.jpg" alt="" />
                    </div>
                    <div>
                      <img src="images/style3.jpg" alt="" />
                    </div>
                    <div>
                      <img src="images/style1.jpg" alt="" />
                    </div>
                  </div>
                  <div class={`${style.month} month`}>Month 1</div>
                </div>
                <a class={`${style.carousel_control_prev} carousel-control-prev`}>
                  <span class="carousel-control-prev-icon"></span>
                </a>
                <a class={`${style.carousel_control_next} carousel-control-next`}>
                  <span class="carousel-control-next-icon"></span>
                </a>
              </div>

              <div class={style.slide_two}>
                <table class={style.table}>
                  <thead>
                    <th />
                    <th>saturday</th>
                    <th>sunday</th>
                    <th>monday</th>
                    <th>tuesday</th>
                    <th>wednesday</th>
                    <th>thursday</th>
                    <th>friday</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>8 Am</td>
                      <td data-label></td>
                      <td data-label></td>
                      <td data-label></td>
                      <td data-label></td>
                      <td data-label></td>
                      <td data-label></td>
                      <td data-label></td>
                    </tr>

                    <tr>
                      <td>11 Am</td>
                      <td data-label></td>
                      <td data-label></td>
                      <td data-label></td>
                      <td data-label></td>
                      <td data-label></td>
                      <td data-label></td>
                      <td data-label></td>
                    </tr>

                    <tr>
                      <td>3 Pm</td>
                      <td data-label></td>
                      <td data-label></td>
                      <td data-label></td>
                      <td data-label></td>
                      <td data-label></td>
                      <td data-label></td>
                      <td data-label></td>
                    </tr>

                    <tr>
                      <td>5 Pm</td>
                      <td data-label></td>
                      <td data-label></td>
                      <td data-label></td>
                      <td data-label></td>
                      <td data-label></td>
                      <td data-label></td>
                      <td data-label></td>
                    </tr>

                    <tr>
                      <td>7 Pm</td>
                      <td data-label></td>
                      <td data-label></td>
                      <td data-label></td>
                      <td data-label></td>
                      <td data-label></td>
                      <td data-label></td>
                      <td data-label></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class={style.slide_three}>
                <div>put the Graph here </div>
              </div>
            </div>
            <i
              class={`material-icons ${style.arrow} ${style.arrow_back} arrow_back`}
            >
              arrow_back
            </i>
            <i class={`material-icons ${style.arrow} ${style.arrow_forward} arrow_forward`}>
              arrow_forward
            </i>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AllTrainees;
