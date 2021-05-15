import React, { useState } from "react";
import style from "../../assets/css/admin.module.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import content from "./heper/inputs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const schema = yup.object().shape({
  username: yup.string().required(),
  gym: yup.string().required(),
  password: yup.string().required(),
  email: yup.string().required().email(),
  phone: yup
    .number()
    .required()
    .test("len", "Max 11 numbers", (val) => val.toString().length <= 11),
});

function AddTrainer(props) {
  const [startDate, setStartDate] = useState(new Date());

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (data) => console.log(data);
  console.log(errors);
  return (
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
        <div style={{ width: "50%" }}>
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
            />
            <span className={style.checkmark}></span>
          </label>
          <label className={style.contain}>
            Female
            <input type="radio" name="radio" className={style.radio} />
            <span className={style.checkmark}></span>
          </label>
        </div>

        <button type="submit" className={style.addBtn}>
          Add Trainer
        </button>
      </form>
      {/* </div> */}
    </section>
  );
}

export default AddTrainer;
