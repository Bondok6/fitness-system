import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "../assets/css/search.module.css";
import TraineeCard from "./TraineeCard";
import Pagination from "@material-ui/lab/Pagination";
import Spinner from "../UI/Spinner/Spinner";

export function Contact() {
  const [trainees, setTrainees] = useState([]);
  const [search, setSearch] = useState("");

  const [loading2, setLoading2] = useState(false);

  //pagination
  const [page, setPage] = useState(1);
  const handleChangePage = (event, value) => {
    setPage(value);
  };
  ////

  useEffect(() => {
    setLoading2(true);

    axios
      .get(`/getUsers?limit=3&&username=${search}`)
      .then((res) => {
        setTrainees(res.data.docs);
        setLoading2(false);
      })
      .catch((err) => {
        setLoading2(false);
        console.log(err);
      });
  }, [search]);

  let out = (
    <div className={style.cards}>
      {trainees.length > 0
        ? trainees.map((trainee) => {
            return (
              <TraineeCard
                photo={trainee.photo}
                username={trainee.username}
                id={trainee.id}
                key={trainee.id}
                weights={trainee.weights}
                heights={trainee.heights}
              />
            );
          })
        : ""}
    </div>
  );
  if (loading2) out = <Spinner />;

  return (
    <React.Fragment>
      <section className={style.rating}>
        <div className="container">
          <div className={style.search}>
            <input
              type="text"
              placeholder="Search ..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {out}
        </div>
        <div style={{ paddingTop: "20px" }}>
          <Pagination
            style={{ display: "flex", justifyContent: "center" }}
            page={page}
            onChange={handleChangePage}
            count={
              trainees ? (trainees.docs ? parseInt(trainees.totalPages) : 1) : 1
            }
          />
        </div>
      </section>
    </React.Fragment>
  );
}

export default Contact;
