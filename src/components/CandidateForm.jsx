import React, { useState } from "react";
import style from "./CandidateForm.module.css";
import Button from "./Button";

function CandidateForm(props) {
  const [items, setItem] = useState(props.inputs);

  const handleChange = (e) => {
    e.preventDefault();
    const aux = items;
    aux.map((item) =>
      item.name === e.target.name ? (item.value = e.target.value) : item
    );
    setItem(aux);
  };

  const handleSubmit = () => {
    props.action(items)
  };

  return (
    <div className={style["form"]} type="submit">
      {items.map((item) => (
        <div className={style["field"]} key={item.name}>
          <input
            name={item.name}
            type={"text"}
            placeholder={item.placeholder ? item.placeholder : item.value}
            onChange={handleChange}
          />
        </div>
      ))}
      <Button variant={"secondary"} size={"huge"} children={"submit"} action={handleSubmit} />
    </div>
  );
}

export default CandidateForm;
