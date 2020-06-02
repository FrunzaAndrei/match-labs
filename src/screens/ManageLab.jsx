import React, { useState } from "react";
import Card from "../components/Card";
import styles from "./ManageLab.module.css";
import Button from "../components/Button";
import { fetchLabs, createLab, editLab, deleteLab } from "../utils/request";
import { useEffect } from "react";
import CandidateForm from "../components/CandidateForm";
import Loader from "../components/Loader";
import { MANAGE_LAB_FIELDS } from "../mocks";

const ManageLab = () => {
  const [lab, setLab] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [labFields, setLabFieds] = useState(null);
  const [labFieldsTech, setLabFieldsTech] = useState(null);

  useEffect(() => {
    getLab();
  }, []);

  const getLab = async () => {
    const lab = await fetchLabs();
    setLab(lab);
    if (!!lab) {
      const fields = Object.keys(lab.personal).map((key) => ({
        name: key,
        value: lab.personal[key],
      }));
      let index = fields.findIndex((item) => item.name === "id");
      fields.splice(index, 1);
      index = fields.findIndex((item) => item.name === "technologies");
      setLabFieldsTech(fields[index].value);
      setLabFieds([...fields]);
    }
  };

  const deleteLAB = async () => {
    await deleteLab(lab.personal.id);
    setLab(undefined);
    setIsCreating(false);
  };

  const onFormSubmit = async (values) => {
    const { technologies, ...rest } = values;
    const labObj = {
      lab: rest,
      technologies,
    };

    if (isEditing) {
      await editLab(lab.personal.id, labObj);
      setIsEditing(!isEditing);
    } else {
      await createLab(labObj);
      setIsCreating(!isCreating);
    }
    await getLab();
  };

  const _renderEditLab = () => {
    return (
      <>
        <Card
          outline
          imgUrl={lab?.company?.profile_image || ""}
          name={lab?.personal?.name || ""}
          technologies={lab?.personal.technologies.map((t) => ({
            id: t.value,
            name: t.label,
          }))}
        ></Card>
        <div className={styles.buttons}>
          <div className={styles.button}>
            <Button
              action={() => setIsEditing(!isEditing)}
              variant={"primary"}
              size={"small"}
            >
              Edit lab
            </Button>
          </div>
          <div className={styles.button}>
            <Button
              action={() => deleteLAB()}
              variant={"secondary"}
              size={"small"}
            >
              Delete lab
            </Button>
          </div>
        </div>
      </>
    );
  };

  const _renderCreateLab = () => {
    return (
      <>
        <Card outline imgUrl={require("../static/svg/logo.svg")}></Card>
        <div className={styles.button}>
          <Button
            action={() => setIsCreating(!isCreating)}
            variant={"secondary"}
            size={"small"}
          >
            Create lab
          </Button>
        </div>
      </>
    );
  };

  if (lab === null) return <Loader></Loader>;

  return (
    <div className={"box-wide"}>
      <div className={styles.manageLab}>
        {lab && !isEditing && _renderEditLab()}
        {!lab && !isCreating && _renderCreateLab()}
        {!lab && isCreating && (
          <CandidateForm
            fields={MANAGE_LAB_FIELDS}
            onSubmit={onFormSubmit}
          ></CandidateForm>
        )}
        {lab && isEditing && (
          <CandidateForm
            fields={labFields}
            onSubmit={onFormSubmit}
            defaultValue={labFieldsTech}
          ></CandidateForm>
        )}
      </div>
    </div>
  );
};

export default ManageLab;
