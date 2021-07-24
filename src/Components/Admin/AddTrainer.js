import React, { useState, useContext } from "react";
import style from "../../assets/css/admin.module.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import content from "./heper/inputs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import context from "../../context/rest-context";
import axios from "axios";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Popup from "react-leaflet-editable-popup";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

import bgImg from "../../images/design/ground-img.png";
import addImg from "../../images/design/add-img.png";
import graphImg from "../../images/design/graph-img.png";

// "leaflet": "^1.7.1",
//     "leaflet-control-geocoder": "^1.13.0",
//  "react-leaflet": "^3.0.5",
//     "react-leaflet-editable-popup": "^2.0.3",

const schema = yup.object().shape({
  username: yup.string().required(),
  about: yup.string().required(),
  password: yup.string().required(),
  email: yup.string().required().email(),
  photo: yup.mixed().required(),
  phone: yup
    .number()
    .required()
    .test("len", "Max 11 numbers", (val) => val.toString().length <= 11),
});

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

function AddMarkerToClick(props) {
  const obj = useContext(context);

  const [markers, setMarkers] = useState();

  const map = useMapEvents({
    click(e) {
      if (L.Control.Geocoder) {
        const geocoder = L.Control.Geocoder.nominatim();

        console.log("2");
        geocoder.reverse(
          e.latlng,
          map.options.crs.scale(map.getZoom()),
          (results) => {
            obj.name = obj.name ? (results[0] ? results[0].name : "") : "";
            props.clickHandler1(
              results[0] ? (results[0].name ? results[0].name : "") : "",
              e.latlng
            );
            let newMarker = e.latlng;

            setMarkers(newMarker);
          }
        );
      }
    },
  });

  if (props.mark !== "" && !markers) {
    setMarkers(props.mark);
    // console.log(props.mark)
    // console.log(markers)
  }

  if (props.clear && markers !== "") setMarkers("");

  return (
    <>
      {/* {markers.map(marker =>  */}
      {markers ? (
        <Marker position={markers}>
          <Popup>""</Popup>
        </Marker>
      ) : (
        ""
      )}
    </>
  );
}

function AddTrainer(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [mark, setMark] = useState("");
  const [place, setPlace] = useState("");
  const [coordinates, setCoordinates] = useState();
  const [clear, setClear] = useState(false);
  const [gender, setGender] = useState("male");

  const height = { height: "30vh", width: "50vh" };
  const center = { lat: 51.5, lng: 0.12 };
  const clickHandler1 = (data, coorinates) => {
    console.log(coorinates);
    setPlace(data);
    setCoordinates(coorinates);
  };

  // form.append("address[0][sub]", place);
  // form.append("address[0][location][typeCo]", "Point");
  // form.append("address[0][location][coordinates][0]", coordinates.lng);
  // form.append("address[0][location][coordinates][1]", coordinates.lat);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = async (data) => {
    const body = data;
    body["photo"] = data["photo"][0];
    // const location = {
    //   type: "Point",
    //   coordinates: [coordinates.lng, coordinates.lat],
    // };
    // console.log(location);
    // body["location"] = location;
    body["gender"] = gender;

    const form = new FormData();
    for (const [key, value] of Object.entries(body)) {

      form.append(`${key}`, value);
    }
    form.append("location[type]", "Point");
    form.append("location[coordinates][0]", coordinates.lng);
    form.append("location[coordinates][1]", coordinates.lat);
    await axios.post("/add-gym", form);
    window.location.href = "/AddTrainer";
  };

  console.log(errors);

  const goToHome = () => {
    window.location.href = "/AdminHome";
  };

  const goToAddTrainer = () => {
    window.location.href = "/AddTrainer";
  };

  return (
    <React.Fragment>
      {/* start left side  */}
      <div className={style.left_side}>
        <img src={bgImg} alt="" className={style.ground__img} />
        <img
          src={addImg}
          alt=""
          className={style.add__img}
          onClick={() => goToAddTrainer()}
        />
        <img
          src={graphImg}
          alt=""
          className={style.graph__img}
          onClick={() => goToHome()}
        />
      </div>
      {/* end letf side */}

      <section className={style.add_trainer}>
        <h1 className={style.add_title}>Add trainer</h1>

        <form onSubmit={handleSubmit(onSubmit)} className={style.information}>
          {content.inputs.map((input, key) => {
            return (
              <React.Fragment key={key}>
                <input
                  name={input.name}
                  placeholder={input.placeholder}
                  type={input.type}
                  {...register(input.name)}
                  style={{
                    border: errors[input.name]
                      ? "1px solid rgb(172, 50, 50)"
                      : "",
                  }}
                />
                <p className={style.message}>{errors[input.name]?.message}</p>
              </React.Fragment>
            );
          })}
          <div style={{ width: "50%", zIndex: 10000, position: "relative" }}>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>

          <div className={style.gender_info}>
            <div> Gender </div>
            <label className={style.contain}>
              Male
              <input
                type="radio"
                defaultChecked="checked"
                name="radio"
                className={style.radio}
                value="male"
                onChange={(e) => setGender(e.target.value)}
              />
              <span className={style.checkmark}></span>
            </label>
            <label className={style.contain}>
              Female
              <input
                type="radio"
                name="radio"
                className={style.radio}
                value="female"
                onChange={(e) => setGender(e.target.value)}
              />
              <span className={style.checkmark}></span>
            </label>
          </div>

          <MapContainer style={height} center={center} zoom={8}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <AddMarkerToClick
              clickHandler1={clickHandler1}
              mark={mark}
              clear={clear}
            />
          </MapContainer>
          <button type="submit" className={style.addBtn}>
            Add Trainer
          </button>
        </form>
        {/* </div> */}
      </section>
    </React.Fragment>
  );
}

export default AddTrainer;
