import React, { useEffect, useState, useContext } from "react";

import CandidateForm from "../components/CandidateForm";
import PageTitle from "../components/PageTitle";
import Loader from "../components/Loader";
import { AppContext } from "../Context";
import { editAccount } from "../utils/request";

const Account = () => {
  // 1. Subscribe to AppContext data
  const { user } = useContext(AppContext);
  const [fields, setFields] = useState(user.personal);
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    // 2. Map with object keys and format your data before setting it in state
    const onMount = () => {
      const newValue = Object.keys(fields).map((key) =>
        Object.assign({}, { value: fields[key], name: key })
      );
      setFields(newValue);
      setLoader(false)
    };
    onMount();
  }, []);

  const onFormSubmit = async (values) => {
    const res= await editAccount(values, user.role, user.id);
    if (res) console.log("Succesful change");
  };

  if (loader) return <Loader />;

  return (
    <>
      <PageTitle>
        <h3>Edit account</h3>
      </PageTitle>
      <CandidateForm onSubmit={onFormSubmit} fields={fields}></CandidateForm>
    </>
  );
};

export default Account;
