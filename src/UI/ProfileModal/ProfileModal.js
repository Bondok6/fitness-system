import React, { useRef, useState } from "react";
import s from "../../Pages/Profile/Profile.module.css";

function ProfileModal(props) {
  const modal = useRef();
  const [status, setStatus] = useState(1);

  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [goalWeight, setGoalWeight] = useState();

  const [lastIdealWeight, setLastIdealWeight] = useState();
  const [sleepEveryNight, setSleepEveryNight] = useState();
  const [energyLevel, setEnergyLevel] = useState();
  const [badHabbit, setBadHabbit] = useState();
  const [walkDaily, setWalkDaily] = useState();
  const [waterDaily, setWaterDaily] = useState();
  const [workout, setWorkout] = useState();

  const allStatus = 8;

  const changeStatus = () => {
    if (status !== allStatus) setStatus((prev) => prev + 1);
  };

  const addGoal = (type, input) => {
    switch (type) {
      case 2:
        setLastIdealWeight(input);
        break;
      case 3:
        setSleepEveryNight(input);
        break;
      case 4:
        setEnergyLevel(input);
        break;
      case 5:
        setBadHabbit(input);
        break;
      case 6:
        setWalkDaily(input);
        break;
      case 7:
        setWaterDaily(input);
        break;
      case 8:
        setWorkout(input);
        break;

      default:
        break;
    }
    changeStatus();
  };

  return (
    <div className={`${s.modal}`} ref={modal}>
      <button className={s.closeBtn} onClick={() => props.closeModal()}>
        &times;
      </button>
      {status === 8 && (
        <button
          className={s.nextBtn}
          onClick={() => {
            props.closeModal();
            props.updateHandler({
              workout,
              waterDaily,
              walkDaily,
              badHabbit,
              energyLevel,
              sleepEveryNight,
              lastIdealWeight,
              height,
              weight,
              goalWeight,
            });
          }}
        >
          Add
        </button>
      )}
      {status !== 8 && (
        <button
          className={s.backBtn}
          onClick={() => {
            changeStatus();
          }}
        >
          Next
        </button>
      )}

      {(() => {
        switch (status) {
          case 2:
            return (
              <>
                <h1
                  className={s.question}
                  style={{ fontSize: "27px", textAlign: "center" }}
                >
                  When was the last time you were at your ideal weight?
                </h1>
                <div className={s.answer}>
                  <button onClick={() => addGoal(2, "Less than a year ago")}>
                    Less than a year ago
                  </button>
                  <button onClick={() => addGoal(2, "1-2 years ago")}>
                    1-2 years ago
                  </button>
                  <button onClick={() => addGoal(2, "more than 3 years ago")}>
                    more than 3 years ago
                  </button>
                  <button onClick={() => addGoal(2, "never")}>never</button>
                </div>
              </>
            );
          case 3:
            return (
              <>
                <h1
                  className={s.question}
                  style={{ fontSize: "27px", textAlign: "center" }}
                >
                  How much do you sleep every night?
                </h1>
                <div className={s.answer}>
                  <button onClick={() => addGoal(3, "More than 8 hours ")}>
                    More than 8 hours{" "}
                  </button>
                  <button onClick={() => addGoal(3, "7-8 hours")}>
                    7-8 hours
                  </button>
                  <button onClick={() => addGoal(3, "6-7 hours")}>
                    6-7 hours
                  </button>
                  <button onClick={() => addGoal(3, "Less than 6 hours")}>
                    Less than 6 hours
                  </button>
                </div>
              </>
            );
          case 4:
            return (
              <>
                <h1
                  className={s.question}
                  style={{ fontSize: "27px", textAlign: "center" }}
                >
                  How are your energy levels during the day?
                </h1>
                <div className={s.answer}>
                  <button
                    onClick={() => addGoal(4, "Stable throughout the day  ")}
                  >
                    Stable throughout the day{" "}
                  </button>
                  <button
                    onClick={() => addGoal(4, "I feel tired around lunchtime")}
                  >
                    I feel tired around lunchtime
                  </button>
                  <button onClick={() => addGoal(4, "more than 3 years ago")}>
                    more than 3 years ago
                  </button>
                  <button
                    onClick={() => addGoal(4, "I need a nap after meals")}
                  >
                    I need a nap after meals
                  </button>
                </div>
              </>
            );
          case 5:
            return (
              <>
                <h1
                  className={s.question}
                  style={{ fontSize: "27px", textAlign: "center" }}
                >
                  Any bad habits?
                </h1>
                <div className={s.answer}>
                  <button onClick={() => addGoal(5, "I have a sweet tooth  ")}>
                    I have a sweet tooth{" "}
                  </button>
                  <button onClick={() => addGoal(5, "I love sugary drinks ")}>
                    I love sugary drinks
                  </button>
                  <button onClick={() => addGoal(5, "more than 3 years ago")}>
                    more than 3 years ago
                  </button>
                  <button onClick={() => addGoal(5, "I enjoy fast food ")}>
                    I enjoy fast food
                  </button>
                  <button
                    onClick={() => addGoal(5, "I eat at late at night  ")}
                  >
                    I eat at late at night
                  </button>
                </div>
              </>
            );
          case 6:
            return (
              <>
                <h1
                  className={s.question}
                  style={{ fontSize: "27px", textAlign: "center" }}
                >
                  How much do you walk daily ?
                </h1>
                <div className={s.answer}>
                  <button onClick={() => addGoal(6, "Less than 1 hour  ")}>
                    Less than 1 hour{" "}
                  </button>
                  <button onClick={() => addGoal(6, "1-2 hours ")}>
                    1-2 hours
                  </button>
                  <button onClick={() => addGoal(6, "More than 2 hours")}>
                    More than 2 hours
                  </button>
                </div>
              </>
            );
          case 7:
            return (
              <>
                <h1
                  className={s.question}
                  style={{ fontSize: "27px", textAlign: "center" }}
                >
                  What your daily water intake
                </h1>
                <div className={s.answer}>
                  <button
                    onClick={() => addGoal(7, "I only drink soda or coffee  ")}
                  >
                    I only drink soda or coffee{" "}
                  </button>
                  <button onClick={() => addGoal(7, "2 glasses ")}>
                    2 glasses
                  </button>
                  <button onClick={() => addGoal(7, "3 to 6 glasses")}>
                    3 to 6 glasses
                  </button>
                  <button onClick={() => addGoal(7, "More than 6 glasses")}>
                    More than 6 glasses
                  </button>
                </div>
              </>
            );
          case 8:
            return (
              <>
                <h1
                  className={s.question}
                  style={{ fontSize: "27px", textAlign: "center" }}
                >
                  How often do you workout{" "}
                </h1>
                <div className={s.answer}>
                  <button onClick={() => addGoal(8, "Never  ")}>Never </button>
                  <button onClick={() => addGoal(8, "1-2 workouts a week ")}>
                    1-2 workouts a week
                  </button>
                  <button onClick={() => addGoal(8, "3-4 workouts a week")}>
                    3-4 workouts a week
                  </button>
                  <button
                    onClick={() => addGoal(8, "More than 4 workouts a week")}
                  >
                    More than 4 workouts a week
                  </button>
                </div>
              </>
            );

          default:
            return (
              <div>
                <div className={s.modalInput}>
                  {" "}
                  Your height{" "}
                  <input
                    type="number"
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>
                <div className={s.modalInput}>
                  {" "}
                  Your weight{" "}
                  <input
                    type="number"
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
                <div className={s.modalInput}>
                  {" "}
                  Goal weight{" "}
                  <input
                    type="number"
                    onChange={(e) => setGoalWeight(e.target.value)}
                  />
                </div>
              </div>
            );
        }
      })()}

      {/* {(() => {
        switch (status) {
          case 1:
            return (
              
            );
        }
      })()} */}
    </div>
  );
}

export default ProfileModal;
