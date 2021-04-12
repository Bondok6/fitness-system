import moment from "moment";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const LineChart = (props) => {

  const [data, setData] = useState({});

  let current = props.currentWeek;

  const options = {
    animations: {
      tension: {
        duration: 5000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true,
      }
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            
          },
        },
      ],
    },
  };

  useEffect(() => {
    if (props.currentWeek) {
      let a = [];
      for (let i = 0; i < 7; i++) {
        a.push(moment(current).format("YYYY/MM/DD"));
        current = moment(current).add(1, "d");
      }

      const d = {
        labels: a,
        datasets: [
          {
            label: "Your Path",
            data: props.currentWeekWeight,
            fill: false,
            backgroundColor: "#F20544",
            borderColor: "#F20544",
          },
          {
            label: "Perfect Path",
            data: props.currentWeekPerfectPath,
            fill: false,
            backgroundColor: "black",
            borderColor: "black",
          },
        ],
      };
      setData(d);

    }
  }, [
    props.currentWeekPerfectPath,
    props.currentWeekWeight,
    props.currentWeek,
    
  ]);

  return (
    <>
      <div className="header">
        <div
          className="links"
          style={{ width: "50%", fontSize: "1.2rem", marginLeft: "30px" }}
        >
          A chart that shows you the difference between the rate of change of
          your weight during a certain period of time and the normal rate that
          you should follow
        </div>
      </div>
      <Line data={data} options={options} type="line" />
    </>
  );
};

export default LineChart;
