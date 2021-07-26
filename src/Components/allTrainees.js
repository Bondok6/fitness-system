import React, { useEffect, useState } from "react";
import style from "../assets/css/allTrainees.module.css";
import axios from "axios";
import moment from "moment";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import LineChart from "../Components/chartjs";

function generateRanges(startDate, endDate) {
  let current = moment(startDate, "DD/MM/YYYY");
  const end = moment(endDate, "DD/MM/YYYY");
  let weeks = [];
  while (current < end) {
    let l = current.add(7, "days");
    weeks = [...weeks, l.format("YYYY-MM-DD")];
  }
  return weeks;
}
function AllTrainees(props) {
  const [profile, setProfile] = useState();
  const [system, setSystem] = useState();

  const [trainess, setTrainees] = useState([]);

  const [currentTrainee, setCurrentTrainee] = useState();

  const [weeks, setWeeks] = useState([]);
  const [weekIndex, setWeekIndex] = useState(0);
  const [current, setCurrent] = useState("");
  const [dates, setDates] = useState([]);

  const [currentWeekWeight, setCurrentWeekWeight] = useState([]);
  const [currentWeekPerfectPath, setCurrentWeekPerfectPath] = useState([]);

  const fctchUsers = async () => {
    const res = await axios.get("/fetch-approved");
    setTrainees(res.data.docs);
  };

  useEffect(() => {
    if (currentTrainee) {
      axios
        .get(`fetch-profile?id=${currentTrainee}`)
        .then((res) => {
          // console.log(res);
          setProfile(res.data.user);
          setSystem(res.data.system);
          let newWeeks = generateRanges(
            moment(res.data.system.perfectPathes[0].date).format("DD/MM/YYYY"),
            moment(
              res.data.system.perfectPathes[
                res.data.system.perfectPathes.length - 1
              ].date
            ).format("DD/MM/YYYY")
          );
          setWeeks(newWeeks);
          if (weekIndex === 0) {
            if (weekIndex + 1 !== newWeeks.length) {
              let ws = [];
              let pws = [];
              res.data.user.weights.map((w) => {
                if (
                  moment(w.date).isBetween(
                    moment(newWeeks[weekIndex]),
                    moment(newWeeks[weekIndex + 1])
                  )
                ) {
                  return ws.push(w.weight);
                }
              });
              setCurrentWeekWeight(ws);
              res.data.system.perfectPathes.map((w) => {
                if (
                  moment(w.date).isBetween(
                    moment(newWeeks[weekIndex]),
                    moment(newWeeks[weekIndex + 1])
                  )
                )
                  return pws.push(w.weight);
              });
              setCurrentWeekPerfectPath(pws);
            }
          }
        })
        .catch((err) => {
          console.error(err);
        });

      axios
        .get(`getDates?id=${currentTrainee}`)
        .then((res) => {
          setDates(res.data.syst);
          setCurrent(res.data.syst[0].date);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [currentTrainee]);

  console.log(current);
  console.log(currentTrainee);

  useEffect(() => {
    fctchUsers();
  }, []);

  console.log(profile);
  const currentTraineeHandler = (id) => {
    setCurrentTrainee(id);
  };

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

    let mainCounter = 0;
    const mainSize = 1000;

    let leftCounter = 1;
    const leftSize = 90;


    nextBtn.addEventListener("click", () => {
      if (profile) {
        if (counter == profile.images.length - 1) return;
        slider.style.transition = "transform 0.4s ease-in-out";
        counter++;
        slider.style.transform = "translateX(" + -size * counter + "px)";
        month.innerHTML = `${moment(profile.images[counter].date).format(
          "DD/MM/YYYY"
        )}`;
      }
    });

    prevBtn.addEventListener("click", () => {
      if (counter <= 0) return;
      if (profile) {
        slider.style.transition = "transform 0.4s ease-in-out";
        counter--;
        slider.style.transform = "translateX(" + -size * counter + "px)";
        if (counter === 0) month.innerHTML = "Day 1";
        month.innerHTML = `${moment(profile.images[counter].date).format(
          "DD/MM/YYYY"
        )}`;
      }
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
  }, [profile]);

  const leftToggle = () => {
    if (system) {
      var indexOfStevie = dates.findIndex((i) => i.date === current);
      if (indexOfStevie !== 0) {
        axios
          .get(
            `getSystemByDate?date=${
              dates[indexOfStevie - 1].date
            }&&id=${currentTrainee}`
          )
          .then((res) => {
            setSystem(res.data);
            setCurrent(dates[indexOfStevie - 1].date);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  };

  const rightToggle = () => {
    if (system) {
      var indexOfStevie = dates.findIndex((i) => i.date === current);
      if (indexOfStevie !== dates.length - 1) {
        axios
          .get(
            `getSystemByDate?date=${
              dates[indexOfStevie + 1].date
            }&&id=${currentTrainee}`
          )
          .then((res) => {
            setSystem(res.data);
            setCurrent(dates[indexOfStevie + 1].date);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  };

  const leftToggleChart = () => {
    if (system)
      if (weekIndex - 1 !== -1) {
        let ws = [];
        let pws = [];
        profile.weights.map((w) => {
          if (
            moment(w.date).isBetween(
              moment(weeks[weekIndex - 1]),
              moment(weeks[weekIndex])
            )
          )
            ws.push(w.weight);
        });
        setCurrentWeekWeight(ws);
        system.perfectPathes.map((w) => {
          if (
            moment(w.date).isBetween(
              moment(weeks[weekIndex - 1]),
              moment(weeks[weekIndex])
            )
          )
            pws.push(w.weight);
        });
        setCurrentWeekPerfectPath(pws);
        let nextWeek = weekIndex - 1;

        setWeekIndex(nextWeek);
      }
  };

  const rightToggleChart = () => {
    if (system)
      if (weekIndex + 1 !== weeks.length) {
        let ws = [];
        let pws = [];
        profile.weights.map((w) => {
          if (
            moment(w.date).isBetween(
              moment(weeks[weekIndex + 1]),
              moment(weeks[weekIndex + 2])
            )
          )
            ws.push(w.weight);
        });
        setCurrentWeekWeight(ws);
        system.perfectPathes.map((w) => {
          if (
            moment(w.date).isBetween(
              moment(weeks[weekIndex + 1]),
              moment(weeks[weekIndex + 2])
            )
          )
            pws.push(w.weight);
        });
        setCurrentWeekPerfectPath(pws);
        let nextWeek = weekIndex + 1;
        setWeekIndex(nextWeek);
      }
  };

  return (
    <div className={style.body}>
      <div class={style.left_side}>
        <div class={style.left_slider}>
          <div class={`${style.slider} slider`}>
            {trainess.length > 0
              ? trainess.map((user) => (
                  <img
                    key={user.user.id}
                    src={user.user.photo}
                    onClick={() => currentTraineeHandler(user.user.id)}
                  />
                ))
              : ""}
          </div>
        </div>
        <i class={`material-icons ${style.arrows} ${style.arrow_up} arrow_up`}>
          keyboard_arrow_up
        </i>
        <i
          class={`material-icons ${style.arrows} ${style.arrow_down} arrow_down`}
        >
          keyboard_arrow_down
        </i>
      </div>

      <section class={style.comparison}>
        <div class="container">
          <div class={style.profile}>
            <img
              src={
                profile
                  ? profile.photo
                  : "https://res.cloudinary.com/derossy-backup/image/upload/v1555206304/deross-samples/placeholder-profile-male.jpg"
              }
              class={style.profile__img}
            />
            <h3 class={style.profile__name}>
              {profile ? profile.username : "Select user"}
            </h3>
          </div>

          <div class={style.outer_slider}>
            <div class={`${style.main_slider} main_slider`}>
              <div class={style.slide_one}>
                <div class={style.slider_card}>
                  <div class={`${style.inner_slider} inner_slider`}>
                    {profile
                      ? profile.images
                        ? profile.images.map((photo, i) => (
                            <div key={i}>
                              <img src={photo.image} alt={photo._id} />{" "}
                            </div>
                          ))
                        : ""
                      : ""}
                  </div>
                  <div class={`${style.month} month`}>Day 1</div>
                </div>
                <a
                  class={`${style.carousel_control_prev} carousel-control-prev`}
                >
                  <span class="carousel-control-prev-icon"></span>
                </a>
                <a
                  class={`${style.carousel_control_next} carousel-control-next`}
                >
                  <span class="carousel-control-next-icon"></span>
                </a>
              </div>

              <div class={style.slide_two}>
                <div
                  style={{
                    textAlign: "center",
                    margin: "10px 0px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => leftToggle()}
                  >
                    {" "}
                    <ArrowBackIosIcon />
                  </div>
                  <span> {moment(current).format("YYYY MM DD")} </span>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => rightToggle()}
                  >
                    {" "}
                    <ArrowForwardIosIcon />
                  </div>
                </div>
                <table className={style.table}>
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
                      <td
                        data-label="Sat"
                        onClick={(e) => {
                          if (system)
                            props.openHandler2(
                              "/food",
                              system.syst[0].system[0].sys[0],
                              system.syst[0]._id,
                              system.syst[0].system[0]._id,
                              props.match.params.id
                            );
                        }}
                      >
                        {system
                          ? system.syst[0].system[0].sys[0].f.map(
                              (f) => f.food.food + ", "
                            )
                          : ""}
                      </td>
                      <td
                        data-label="sun"
                        onClick={(e) => {
                          if (system)
                            props.openHandler2(
                              "/food",
                              system.syst[0].system[1].sys[0],
                              system.syst[0]._id,
                              system.syst[0].system[1]._id,
                              props.match.params.id
                            );
                        }}
                      >
                        {system
                          ? system.syst[0].system[1].sys[0].f.map(
                              (f) => f.food.food + ", "
                            )
                          : ""}
                      </td>
                      <td
                        data-label="tuesday"
                        onClick={(e) => {
                          if (system)
                            props.openHandler2(
                              "/food",
                              system.syst[0].system[2].sys[0],
                              system.syst[0]._id,
                              system.syst[0].system[2]._id,
                              props.match.params.id
                            );
                        }}
                      >
                        {system
                          ? system.syst[0].system[2].sys[0].f.map(
                              (f) => f.food.food + ", "
                            )
                          : ""}
                      </td>
                      <td
                        data-label="wednesday"
                        onClick={(e) => {
                          if (system)
                            props.openHandler2(
                              "/food",
                              system.syst[0].system[3].sys[0],
                              system.syst[0]._id,
                              system.syst[0].system[3]._id,
                              props.match.params.id
                            );
                        }}
                      >
                        {system
                          ? system.syst[0].system[3].sys[0].f.map(
                              (f) => f.food.food + ", "
                            )
                          : ""}
                      </td>
                      <td
                        data-label="friday"
                        onClick={(e) => {
                          if (system)
                            props.openHandler2(
                              "/food",
                              system.syst[0].system[4].sys[0],
                              system.syst[0]._id,
                              system.syst[0].system[4]._id,
                              props.match.params.id
                            );
                        }}
                      >
                        {system
                          ? system.syst[0].system[4].sys[0].f.map(
                              (f) => f.food.food + ", "
                            )
                          : ""}
                      </td>
                      <td
                        data-label="friday"
                        onClick={(e) => {
                          if (system)
                            props.openHandler2(
                              "/food",
                              system.syst[0].system[5].sys[0],
                              system.syst[0]._id,
                              system.syst[0].system[5]._id,
                              props.match.params.id
                            );
                        }}
                      >
                        {system
                          ? system.syst[0].system[5].sys[0].f.map(
                              (f) => f.food.food + ", "
                            )
                          : ""}
                      </td>
                      <td
                        data-label="friday"
                        onClick={(e) => {
                          if (system)
                            props.openHandler2(
                              "/food",
                              system.syst[0].system[6].sys[0],
                              system.syst[0]._id,
                              system.syst[0].system[6]._id,
                              props.match.params.id
                            );
                        }}
                      >
                        {system
                          ? system.syst[0].system[6].sys[0].f.map(
                              (f) => f.food.food + ", "
                            )
                          : ""}
                      </td>
                    </tr>

                    <tr>
                      <td>11 Am</td>
                      <td
                        data-label="Sat"
                        onClick={(e) => {
                          if (system)
                            props.openHandler2(
                              "/food",
                              system.syst[0].system[0].sys[1],
                              system.syst[0]._id,
                              system.syst[0].system[0]._id,
                              props.match.params.id
                            );
                        }}
                      >
                        {system
                          ? system.syst[0].system[0].sys[1].f.map(
                              (f) => f.food.food + ", "
                            )
                          : ""}
                      </td>
                      <td
                        data-label="sun"
                        onClick={(e) => {
                          if (system)
                            props.openHandler2(
                              "/food",
                              system.syst[0].system[1].sys[1],
                              system.syst[0]._id,
                              system.syst[0].system[1]._id,
                              props.match.params.id
                            );
                        }}
                      >
                        {system
                          ? system.syst[0].system[1].sys[1].f.map(
                              (f) => f.food.food + ", "
                            )
                          : ""}
                      </td>
                      <td
                        data-label="tuesday"
                        onClick={(e) => {
                          if (system)
                            props.openHandler2(
                              "/food",
                              system.syst[0].system[2].sys[1],
                              system.syst[0]._id,
                              system.syst[0].system[2]._id,
                              props.match.params.id
                            );
                        }}
                      >
                        {system
                          ? system.syst[0].system[2].sys[1].f.map(
                              (f) => f.food.food + ", "
                            )
                          : ""}
                      </td>
                      <td
                        data-label="wednesday"
                        onClick={(e) => {
                          if (system)
                            props.openHandler2(
                              "/food",
                              system.syst[0].system[3].sys[1],
                              system.syst[0]._id,
                              system.syst[0].system[3]._id,
                              props.match.params.id
                            );
                        }}
                      >
                        {system
                          ? system.syst[0].system[3].sys[1].f.map(
                              (f) => f.food.food + ", "
                            )
                          : ""}
                      </td>
                      <td
                        data-label="friday"
                        onClick={(e) => {
                          if (system)
                            props.openHandler2(
                              "/food",
                              system.syst[0].system[4].sys[1],
                              system.syst[0].system[4]._id,
                              system.syst[0].system[4]._id,
                              props.match.params.id
                            );
                        }}
                      >
                        {system
                          ? system.syst[0].system[4].sys[1].f.map(
                              (f) => f.food.food + ", "
                            )
                          : ""}
                      </td>
                      <td
                        data-label="friday"
                        onClick={(e) => {
                          if (system)
                            props.openHandler2(
                              "/food",
                              system.syst[0].system[5].sys[1],
                              system.syst[0]._id,
                              system.syst[0].system[5]._id,
                              props.match.params.id
                            );
                        }}
                      >
                        {system
                          ? system.syst[0].system[5].sys[1].f.map(
                              (f) => f.food.food + ", "
                            )
                          : ""}
                      </td>
                      <td
                        data-label="friday"
                        onClick={(e) => {
                          if (system)
                            props.openHandler2(
                              "/food",
                              system.syst[0].system[6].sys[1],
                              system.syst[0]._id,
                              system.syst[0].system[6]._id,
                              props.match.params.id
                            );
                        }}
                      >
                        {system
                          ? system.syst[0].system[6].sys[1].f.map(
                              (f) => f.food.food + ", "
                            )
                          : ""}
                      </td>
                    </tr>

                    <tr>
                      <td>3 Pm</td>
                      <td
                        data-label="Sat"
                        onClick={(e) => {
                          if (system)
                            props.openHandler2(
                              "/food",
                              system.syst[0].system[0].sys[2],
                              system.syst[0]._id,
                              system.syst[0].system[0]._id,
                              props.match.params.id
                            );
                        }}
                      >
                        {system
                          ? system.syst[0].system[0].sys[2].f.map(
                              (f) => f.food.food + ", "
                            )
                          : ""}
                      </td>
                      <td
                        data-label="sun"
                        onClick={(e) => {
                          if (system)
                            props.openHandler2(
                              "/food",
                              system.syst[0].system[1].sys[2],
                              system.syst[0]._id,
                              system.syst[0].system[1]._id,
                              props.match.params.id
                            );
                        }}
                      >
                        {system
                          ? system.syst[0].system[1].sys[2].f.map(
                              (f) => f.food.food + ", "
                            )
                          : ""}
                      </td>
                      <td
                        data-label="tuesday"
                        onClick={(e) => {
                          if (system)
                            props.openHandler2(
                              "/food",
                              system.syst[0].system[2].sys[2],
                              system.syst[0]._id,
                              system.syst[0].system[2]._id,
                              props.match.params.id
                            );
                        }}
                      >
                        {system
                          ? system.syst[0].system[2].sys[2].f.map(
                              (f) => f.food.food + ", "
                            )
                          : ""}
                      </td>
                      <td
                        data-label="wednesday"
                        onClick={(e) => {
                          if (system)
                            props.openHandler2(
                              "/food",
                              system.syst[0].system[3].sys[2],
                              system.syst[0]._id,
                              system.syst[0].system[3]._id,
                              props.match.params.id
                            );
                        }}
                      >
                        {system
                          ? system.syst[0].system[3].sys[2].f.map(
                              (f) => f.food.food + ", "
                            )
                          : ""}
                      </td>
                      <td
                        data-label="friday"
                        onClick={(e) => {
                          if (system)
                            props.openHandler2(
                              "/food",
                              system.syst[0].system[4].sys[2],
                              system.syst[0]._id,
                              system.syst[0].system[4]._id,
                              props.match.params.id
                            );
                        }}
                      >
                        {system
                          ? system.syst[0].system[4].sys[2].f.map(
                              (f) => f.food.food + ", "
                            )
                          : ""}
                      </td>
                      <td
                        data-label="friday"
                        onClick={(e) => {
                          if (system)
                            props.openHandler2(
                              "/food",
                              system.syst[0].system[5].sys[2],
                              system.syst[0]._id,
                              system.syst[0].system[5]._id,
                              props.match.params.id
                            );
                        }}
                      >
                        {system
                          ? system.syst[0].system[5].sys[2].f.map(
                              (f) => f.food.food + ", "
                            )
                          : ""}
                      </td>
                      <td
                        data-label="friday"
                        onClick={(e) => {
                          if (system)
                            props.openHandler2(
                              "/food",
                              system.syst[0].system[6].sys[2],
                              system.syst[0]._id,
                              system.syst[0].system[6]._id,
                              props.match.params.id
                            );
                        }}
                      >
                        {system
                          ? system.syst[0].system[6].sys[2].f.map(
                              (f) => f.food.food + ", "
                            )
                          : ""}
                      </td>
                    </tr>

                    <tr>
                      <td>5 Pm</td>
                      <td
                        data-label="Sat"
                        onClick={(e) => {
                          if (system)
                            props.openHandler2(
                              "/food",
                              system.syst[0].system[0].sys[3],
                              system.syst[0]._id,
                              system.syst[0].system[0]._id,
                              props.match.params.id
                            );
                        }}
                      >
                        {system
                          ? system.syst[0].system[0].sys[3].f.map(
                              (f) => f.food.food + ", "
                            )
                          : ""}
                      </td>
                      <td
                        data-label="sun"
                        onClick={(e) => {
                          if (system)
                            props.openHandler2(
                              "/food",
                              system.syst[0].system[1].sys[3],
                              system.syst[0]._id,
                              system.syst[0].system[1]._id,
                              props.match.params.id
                            );
                        }}
                      >
                        {system
                          ? system.syst[0].system[1].sys[3].f.map(
                              (f) => f.food.food + ", "
                            )
                          : ""}
                      </td>
                      <td
                        data-label="tuesday"
                        onClick={(e) => {
                          if (system)
                            props.openHandler2(
                              "/food",
                              system.syst[0].system[2].sys[3],
                              system.syst[0]._id,
                              system.syst[0].system[2]._id,
                              props.match.params.id
                            );
                        }}
                      >
                        {system
                          ? system.syst[0].system[2].sys[3].f.map(
                              (f) => f.food.food + ", "
                            )
                          : ""}
                      </td>
                      <td
                        data-label="wednesday"
                        onClick={(e) => {
                          if (system)
                            props.openHandler2(
                              "/food",
                              system.syst[0].system[3].sys[3],
                              system.syst[0]._id,
                              system.syst[0].system[3]._id,
                              props.match.params.id
                            );
                        }}
                      >
                        {system
                          ? system.syst[0].system[3].sys[3].f.map(
                              (f) => f.food.food + ", "
                            )
                          : ""}
                      </td>
                      <td
                        data-label="friday"
                        onClick={(e) => {
                          if (system)
                            props.openHandler2(
                              "/food",
                              system.syst[0].system[4].sys[3],
                              system.syst[0]._id,
                              system.syst[0].system[4]._id,
                              props.match.params.id
                            );
                        }}
                      >
                        {system
                          ? system.syst[0].system[4].sys[3].f.map(
                              (f) => f.food.food + ", "
                            )
                          : ""}
                      </td>
                      <td
                        data-label="friday"
                        onClick={(e) => {
                          if (system)
                            props.openHandler2(
                              "/food",
                              system.syst[0].system[5].sys[3],
                              system.syst[0]._id,
                              system.syst[0].system[5]._id,
                              props.match.params.id
                            );
                        }}
                      >
                        {system
                          ? system.syst[0].system[5].sys[3].f.map(
                              (f) => f.food.food + ", "
                            )
                          : ""}
                      </td>
                      <td
                        data-label="friday"
                        onClick={(e) => {
                          if (system)
                            props.openHandler2(
                              "/food",
                              system.syst[0].system[6].sys[3],
                              system.syst[0]._id,
                              system.syst[0].system[6]._id,
                              props.match.params.id
                            );
                        }}
                      >
                        {system
                          ? system.syst[0].system[6].sys[3].f.map(
                              (f) => f.food.food + ", "
                            )
                          : ""}
                      </td>
                    </tr>

                    <tr>
                      <td>7 Pm</td>
                      <td
                        data-label="Sat"
                        onClick={(e) => {
                          if (system)
                            props.openHandler2(
                              "/food",
                              system.syst[0].system[0].sys[4],
                              system.syst[0]._id,
                              system.syst[0].system[0]._id,
                              props.match.params.id
                            );
                        }}
                      >
                        {system
                          ? system.syst[0].system[0].sys[4].f.map(
                              (f) => f.food.food + ", "
                            )
                          : ""}
                      </td>
                      <td
                        data-label="sun"
                        onClick={(e) => {
                          if (system)
                            props.openHandler2(
                              "/food",
                              system.syst[0].system[1].sys[4],
                              system.syst[0]._id,
                              system.syst[0].system[1]._id,
                              props.match.params.id
                            );
                        }}
                      >
                        {system
                          ? system.syst[0].system[1].sys[4].f.map(
                              (f) => f.food.food + ", "
                            )
                          : ""}
                      </td>
                      <td
                        data-label="tuesday"
                        onClick={(e) => {
                          if (system)
                            props.openHandler2(
                              "/food",
                              system.syst[0].system[2].sys[4],
                              system.syst[0]._id,
                              system.syst[0].system[2]._id,
                              props.match.params.id
                            );
                        }}
                      >
                        {system
                          ? system.syst[0].system[2].sys[4].f.map(
                              (f) => f.food.food + ", "
                            )
                          : ""}
                      </td>
                      <td
                        data-label="wednesday"
                        onClick={(e) => {
                          if (system)
                            props.openHandler2(
                              "/food",
                              system.syst[0].system[3].sys[4],
                              system.syst[0]._id,
                              system.syst[0].system[3]._id,
                              props.match.params.id
                            );
                        }}
                      >
                        {system
                          ? system.syst[0].system[3].sys[4].f.map(
                              (f) => f.food.food + ", "
                            )
                          : ""}
                      </td>
                      <td
                        data-label="friday"
                        onClick={(e) => {
                          if (system)
                            props.openHandler2(
                              "/food",
                              system.syst[0].system[4].sys[4],
                              system.syst[0]._id,
                              system.syst[0].system[4]._id,
                              props.match.params.id
                            );
                        }}
                      >
                        {system
                          ? system.syst[0].system[4].sys[4].f.map(
                              (f) => f.food.food + ", "
                            )
                          : ""}
                      </td>
                      <td
                        data-label="friday"
                        onClick={(e) => {
                          if (system)
                            props.openHandler2(
                              "/food",
                              system.syst[0].system[5].sys[4],
                              system.syst[0]._id,
                              system.syst[0].system[5]._id,
                              props.match.params.id
                            );
                        }}
                      >
                        {system
                          ? system.syst[0].system[5].sys[4].f.map(
                              (f) => f.food.food + ", "
                            )
                          : ""}
                      </td>
                      <td
                        data-label="friday"
                        onClick={(e) => {
                          if (system)
                            props.openHandler2(
                              "/food",
                              system.syst[0].system[6].sys[4],
                              system.syst[0]._id,
                              system.syst[0].system[6]._id,
                              props.match.params.id
                            );
                        }}
                      >
                        {system
                          ? system.syst[0].system[6].sys[4].f.map(
                              (f) => f.food.food + ", "
                            )
                          : ""}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* <table class={style.table}>
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
                </table> */}
              </div>

              <div class={style.slide_three}>
                <div
                  style={{
                    textAlign: "center",
                    margin: "10px 0px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => leftToggleChart()}
                  >
                    {" "}
                    <ArrowBackIosIcon />
                  </div>
                  <span>
                    {" "}
                    {weeks
                      ? weeks[weekIndex]
                        ? moment(weeks[weekIndex]).format("YYYY/MM/DD")
                        : ""
                      : ""}{" "}
                  </span>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => rightToggleChart()}
                  >
                    {" "}
                    <ArrowForwardIosIcon />
                  </div>
                </div>
                <LineChart
                  currentWeekPerfectPath={currentWeekPerfectPath}
                  currentWeekWeight={currentWeekWeight}
                  currentWeek={weeks[weekIndex]}
                />
              </div>
            </div>
            <i
              class={`material-icons ${style.arrow} ${style.arrow_back} arrow_back`}
            >
              arrow_back
            </i>
            <i
              class={`material-icons ${style.arrow} ${style.arrow_forward} arrow_forward`}
            >
              arrow_forward
            </i>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AllTrainees;
