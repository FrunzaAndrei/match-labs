import React from "react";
import PageTitle from "../components/PageTitle";
import { CREATE_CANDIDATE_FIELDS } from "../mocks";
import CandidateForm from "../components/CandidateForm";

function Register() {
  const newEntryData = (data) => {
    console.log(data);
  };
  return (
    <>
      <PageTitle>
        <h3>Register</h3>
      </PageTitle>
      <CandidateForm inputs={CREATE_CANDIDATE_FIELDS} action={newEntryData} />
    </>
  );
}

export default Register;
