import React, { useState, useEffect } from "react";
import styles from "./CandidateForm.module.css";
import Button from "./Button";
import Loader from "./Loader";
import Select from "react-select";
import { fetchTechnologies } from "../utils/request";

const CandidateForm = ({ fields, onSubmit }) => {
  // 1. Set values and technologies
  const [values, setValues] = useState(fields);
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    const onMount = async () => {
      const res = await fetchTechnologies();
      setTechnologies(res);
    };
    onMount();
  }, []);

  const onChange = (e) => {
    const newValues = [...values];
    const index = newValues.findIndex((value) => value.name === e.target.name);
    newValues[index] = { ...newValues[index], value: e.target.value };
    setValues(newValues);
  };

  const onSelectChange = (selected) => {
    if (!selected) return;

    console.log(selected);
    // 3. copy values
    const newValues = [...values];
    // find index of technologies input
    const index = newValues.findIndex((index) => index.name === "technologies");

    newValues[index] = {
      ...newValues[index],
      value: selected.map((val) => val.value),
    };
    // loop through the selected values
    setValues(newValues);
  };

  const formHandler = (e) => {
    e.preventDefault();
    const obj = {};
    values.forEach((item) => {
      obj[item.name] = item.value;
    });

    onSubmit(obj);
  };

  if (!values && !technologies) return <Loader></Loader>;

  return (
    <>
      <form onSubmit={formHandler} className={styles.form}>
        {values.map((field) =>
          field.name !== "technologies" ? (
            // 4. Check if field is not technologies
            <div key={field.name} className={styles.field}>
              <input
                required
                onChange={onChange}
                value={field.value}
                placeholder={field.placeholder || ""}
                name={field.name}
              ></input>
            </div>
          ) : (
            // 5. Bring prebuilt select
            // Add onSelectChange and options
            <Select
              className={styles.select}
              onChange={onSelectChange}
              name={field.name}
              key={field.name}
              defaultValue={field.value}
              isMulti
              options={technologies}
            />
          )
        )}

        <Button type={"submit"} variant={"secondary"} size={"medium"}>
          Submit
        </Button>
      </form>
    </>
  );
};

export default CandidateForm;
