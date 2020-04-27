import React from "react";
import PageTitle from "../components/PageTitle";
import { EDIT_CANDIDATE_FIELDS } from "../mocks";
import CandidateForm from "../components/CandidateForm";

function Account() {
  const dataChanged = (data) => {
    console.log(data);
  };
  return (
    <>
      <PageTitle>
        <h3>Edit account</h3>
      </PageTitle>
      <CandidateForm inputs={EDIT_CANDIDATE_FIELDS} action={dataChanged} />
    </>
  );
}

export default Account;
