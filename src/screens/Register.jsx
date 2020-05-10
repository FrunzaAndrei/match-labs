import React, { useState } from "react";
import CandidateForm from "../components/CandidateForm";
import { CREATE_CANDIDATE_FIELDS, CREATE_COMPANY_FIELDS } from "../mocks";
import PageTitle from "../components/PageTitle";
import { register, assignCompany, assignCandidate } from "../utils/request";
import Loader from "../components/Loader";
import Button from "../components/Button";

const Register = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [role, setRole] = useState(null);
  const styleScreen = {
    maxWidth: "400px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    padding: "auto",
  };

  const onFormSubmit = async (values) => {
    setIsLoading(true);
    const { email, password, ...rest } = values;
    const user = await register({
      email,
      password,
    });

    if (user.id) assignUserRole(email, rest);
    setIsLoading(false);
  };

  const assignUserRole = async (email, values) => {
    if (role === "candidate") {
      const account = await assignCandidate({ email, ...values });
      console.log(account);
    } else {
      const account = await assignCompany({ email, ...values });
      console.log(account);
    }
  };

  if (isLoading && role) return <Loader />;

  return (
    <>
      <PageTitle>
        <h3>Register</h3>
      </PageTitle>
      {!role ? (
        <div style={styleScreen}>
          <PageTitle>
            <h4>Are you a candidate or a company?</h4>
          </PageTitle>
          <Button
            variant="secondary"
            size="huge"
            action={() => setRole("candidate")}
          >
            Candidate
          </Button>
          <Button
            variant="secondary"
            size="huge"
            action={() => setRole("company")}
          >
            Company
          </Button>
        </div>
      ) : role === "candidate" ? (
        <CandidateForm
          onSubmit={onFormSubmit}
          fields={CREATE_CANDIDATE_FIELDS}
        ></CandidateForm>
      ) : (
        <CandidateForm
          onSubmit={onFormSubmit}
          fields={CREATE_COMPANY_FIELDS}
        ></CandidateForm>
      )}
    </>
  );
};

export default Register;
