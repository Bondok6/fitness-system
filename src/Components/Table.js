import React, { useState, useRef, useEffect } from "react";
import style from "../assets/css/table.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import axios from "axios";
import Spinner from "../UI/Spinner/Spinner";

function Table(props) {
  const [startDate, setStartDate] = useState(new Date());
  const table = useRef();

  const [loadind, setLoading] = useState(false);

  useEffect(() => {
    let l = document.getElementsByTagName("td");
    for (let i = 0; i < l.length; i++) {
      if (l[i]) {
        l[i].addEventListener("click", (e) => {
          props.openHandler2("/table", i);
        });
      }
    }
  }, []);
  //   console.log(props.food, props.method);

  useEffect(() => {
    let l = document.getElementsByTagName("td");

    let arr = [];
    let ids = [];
    let grams = [];
    if (props.food) {
      props.food.map((f) => {
        arr.push(f.food);
        ids.push(f._id);
        grams.push(f.userGrams);
      });
      l[props.method].textContent = arr.join(",");
      let food = [];
      for (let i = 0; i < grams.length; i++) {
        food.push({ grams: grams[i], food: ids[i] });
      }
      l[props.method].special_attribute = food;
      //   console.log(props.method)
      //   console.log(l[props.method].special_attribute)
    }
  }, [props.food]);

  const addHandler = () => {
    setLoading(true);
    let system = [];
    let l = document.getElementsByTagName("td");
    let time = document.getElementsByClassName("time");
    let days = document.getElementsByClassName("day");
    for (let i = 0; i < 7; i++) {
      system[i] = new Object();
      system[i]["name"] = days[i].textContent;
      system[i]["sys"] = new Array();

      for (let j = 0; j < 5; j++) {
        system[i].sys[j] = new Object();
        system[i].sys[j]["time"] = time[j].textContent;
        system[i].sys[j]["f"] = new Array();
        system[i].sys[j]["f"] = l[j * 7 + i].special_attribute;
      }
    }
    axios
      .put(`put-system?user=${props.match.params.id}`,{
        system:{
          date:moment(startDate).utc(),
          system
        }
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
        // window.location.href = `/addDite/${props.match.params.id}`;
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  let tab = (
    <table class={style.table} ref={table}>
      <thead>
        <th />
        <th className="day">saturday</th>
        <th className="day">sunday</th>
        <th className="day">monday</th>
        <th className="day">tuesday</th>
        <th className="day">wednesday</th>
        <th className="day">thursday</th>
        <th className="day">friday</th>
      </thead>
      <tbody>
        <tr>
          <th className="time">8 Am</th>
          <td data-label></td>
          <td data-label></td>
          <td data-label></td>
          <td data-label></td>
          <td data-label></td>
          <td data-label></td>
          <td data-label></td>
        </tr>

        <tr>
          <th className="time">11 Am</th>
          <td data-label></td>
          <td data-label></td>
          <td data-label></td>
          <td data-label></td>
          <td data-label></td>
          <td data-label></td>
          <td data-label></td>
        </tr>

        <tr>
          <th className="time">3 Pm</th>
          <td data-label></td>
          <td data-label></td>
          <td data-label></td>
          <td data-label></td>
          <td data-label></td>
          <td data-label></td>
          <td data-label></td>
        </tr>

        <tr>
          <th className="time">5 Pm</th>
          <td data-label></td>
          <td data-label></td>
          <td data-label></td>
          <td data-label></td>
          <td data-label></td>
          <td data-label></td>
          <td data-label></td>
        </tr>

        <tr>
          <th className="time">7 Pm</th>
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
  );
  if (loadind) tab = <Spinner />;
  return (
    <div className={style.Table}>
      <h2 class={style.section_title}>Creat Diet Plan</h2>

      <div class={style.diet_plan}>
        <label for=""> diet plan </label>
        <select>
          <option value="intermittent"> intermittent fasting</option>
          <option value="hamada"> hamada</option>
          <option value="aboahmed"> aboahmed</option>
        </select>
      </div>

      <div class={style.diet_date}>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </div>

      {tab}
      <button className={style.btn} onClick={() => addHandler()}>add</button>
    </div>
  );
}

export default Table;
