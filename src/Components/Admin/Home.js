import React, { useEffect, useState } from "react";
import style from "../../assets/css/admin.module.css";
import axios from "axios";
import { Line } from "react-chartjs-2";
import moment from "moment";

function Home(props) {
  const [trainer, setTrainer] = useState([0,0,0,0,0]);
  const [trainee, setTrainee] = useState([0,0,0,0,0]);

  const [traineeData, setTraineeData] = useState(0);
  const [trainerData, setTrainerData] = useState(0);

  const [monthesTrainee, setMonthesTrainee] = useState([]);
  const [monthesTrainer, setMonthesTrainer] = useState([]);

  const state = {
    labels: monthesTrainee,
    datasets: [
      {
        label: "Rainfall",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: trainee,
        color: "black",
      },
    ],
  };
  const state2 = {
    labels: monthesTrainer,
    datasets: [
      {
        label: "Rainfall",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: trainer,
        color: "black",
      },
    ],
  };

  const fetchHome = async () => {
    const response = await axios.get("/home");

    const dataTrainee = response.data.trainee.map((month) => month.count);
    const dataTrainer = response.data.trainer.map((month) => month.count);

    const msTrainee = response.data.trainee.map((month) => {
      return moment(month._id.month.toString(), "MM").format("MMMM");
    });
    const msTrainer = response.data.trainer.map((month) => {
      return moment(month._id.month.toString(), "MM").format("MMMM");
    });

    const traineeSum=dataTrainee.reduce((a, b) => a + b, 0)
    const trainerSum=dataTrainer.reduce((a, b) => a + b, 0)


    // console.log(msTrainee)
    setMonthesTrainee(msTrainee);
    setMonthesTrainer(msTrainer);
    setTrainee(dataTrainee);
    setTrainer(dataTrainer);
    setTraineeData(traineeSum)
    setTrainerData(trainerSum)
  };

  useEffect(() => {
    fetchHome();
  }, []);

  return (
    <section class={style.dash_section}>
      <h1 class={style.dash_title}>DashBoard</h1>
      <div class={style.dash}>
        <div class={style.dash__trainer} style={{ height: "auto" }}>
          <h2>
            Number Of Trainers <span>{traineeData}</span>
          </h2>
          <p>2 Apr, 2020 - 10 Apr, 2020 </p>
          {/* <div class={style.graph}> */}
          <div>
            <Line
              data={state}
              options={{
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        fontColor: "black",
                      },
                    },
                  ],
                  xAxes: [
                    {
                      ticks: {
                        fontColor: "black",
                      },
                    },
                  ],
                },
              }}
            />
            {/* </div> */}
          </div>
        </div>
        <div class={style.dash__user}>
          <h2>
            Number Of Users <span>{trainerData}</span>
          </h2>
          <div class={style.graph}>
            <div class={style.dash__trainer} style={{ height: "auto" }}>
              {/* <div class={style.graph}> */}
              <div>
                <Line
                  data={state2}
                  options={{
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            fontColor: "black",
                          },
                        },
                      ],
                      xAxes: [
                        {
                          ticks: {
                            fontColor: "black",
                          },
                        },
                      ],
                    },
                  }}
                />
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
