import React from "react";
import style from "../../assets/css/admin.module.css";
import design from "../../images/design/graph-1.svg";
import design2 from "../../images/design/graph-2.svg";

function Home(props) {
  return (
    <section class={style.dash_section}>
      <h1 class={style.dash_title}>DashBoard</h1>
      <div class={style.dash}>
        <div class={style.dash__trainer}>
          <h2>
            Number Of Trainers <span>0000</span>
          </h2>
          <p>2 Apr, 2020 - 10 Apr, 2020 </p>
          <div class={style.graph}>
            <img src={design} alt="trainer-dash" />
          </div>
        </div>
        <div class={style.dash__user}>
          <h2>
            Number Of Users <span>4430</span>
          </h2>
          <p>2 Apr, 2020 - 10 Apr, 2020 </p>
          <div class={style.graph}>
            <img src={design2} alt="trainer-dash" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
