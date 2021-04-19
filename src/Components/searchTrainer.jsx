import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "../assets/css/search.module.css";
import TrainerCard from "./TrainerCard";
import Pagination from "@material-ui/lab/Pagination";
import Spinner from "../UI/Spinner/Spinner";

export function Contact() {
  const [trainers, setTrainers] = useState([]);
  const [search, setSearch] = useState("");
  //pagination
  const [page, setPage] = useState(1);
  const handleChangePage = (event, value) => {
    setPage(value);
  };
  ////

  const [updated,setUpdated]=useState(true)
  const load=(l)=>{
    // console.log('here')
    setUpdated(l)
  }


  const [loading2,setLoading2]=useState(false)
  
  useEffect(() => {
    setLoading2(true)
    axios.get(`/fetch-gyms?limit=3&&username=${search}`).then((res) => {
      setTrainers(res.data.docs);
      setLoading2(false)
    }).catch(err=>{
      setLoading2(false)
      console.log(err)
    });
  }, [search,updated]);
  
  let out=(
<div className={style.cards}>
          {trainers.length > 0
            ? trainers.map((trainer) => {
                return (
                  <TrainerCard
                    photo={trainer.photo}
                    username={trainer.username}
                    id={trainer.id}
                    key={trainer.id}
                    requested={trainer.usersRequests}
                    load={load}
                  />
                );
              })
            : ""}
          </div>
  )
  if(loading2)out=<Spinner />
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
        <div style={{paddingTop:'20px'}}>
          <Pagination
            style={{ display: "flex", justifyContent: "center" }}
            page={page}
            onChange={handleChangePage}
            count={
              trainers ? (trainers.docs ? parseInt(trainers.totalPages) : 1) : 1
            }
          />
        </div>
      </section>
    </React.Fragment>
  );
}

export default Contact;
