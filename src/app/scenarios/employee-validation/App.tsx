import { Button } from "flowbite-react";
import React, { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [date, setDate] = useState("");

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [idError, setIdError] = useState(false);
  const [dateError, setDateError] = useState(false);

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  useEffect(() => {
    setNameError(true);
    setEmailError(true);
    setIdError(true);
    setDateError(true);
    setIsSubmitDisabled(true);
  }, []);

  useEffect(() => {
    if (!nameError && !emailError && !dateError && !idError)
      setIsSubmitDisabled(false);
    else setIsSubmitDisabled(true);
  }, [nameError, emailError, dateError, idError]);

  const validateName = (val: string) => {
    if (!/^[A-Za-z\s]{4,}$/.test(val)) {
      setNameError(true);
    } else {
      setNameError(false);
    }
    setName(val);
  };
  const validateEmail = (val: string) => {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    setEmail(val);
  };
  const validateId = (val: string) => {
    if (!/^[\d]{6}$/.test(val)) {
      setIdError(true);
    } else {
      setIdError(false);
    }
    setId(val);
  };
  const validateDate = (val: string) => {
    if (new Date(val) > new Date()) {
      setDateError(true);
    } else {
      setDateError(false);
    }
    setDate(val);
  };

  const submit = () => {
    setName("");
    setEmail("");
    setId("");
    setDate("");
    setNameError(true);
    setEmailError(true);
    setIdError(true);
    setDateError(true);
  };

  return (
    <div className="layout-column align-items-center mt-20 ">
      <div
        className="layout-column align-items-start w-50"
        data-testid="input-name"
      >
        <input
          className="w-100"
          type="text"
          name="name"
          value={name}
          onChange={(e) => validateName(e.target.value)}
          placeholder="Name"
          data-testid="input-name-test"
        />
        {nameError && (
          <p className="error mt-2">
            Name must be at least 4 characters long and only contain letters and
            spaces
          </p>
        )}
      </div>
      <div
        className="layout-column align-items-start w-50"
        data-testid="input-email"
      >
        <input
          className="w-100"
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={(e) => validateEmail(e.target.value)}
        />
        {emailError && (
          <p className="error mt-2">Email must be a valid email address</p>
        )}
      </div>
      <div
        className="layout-column align-items-start w-50"
        data-testid="input-employee-id"
      >
        <input
          className="w-100"
          type="text"
          name="employeeId"
          value={id}
          placeholder="Employee ID"
          onChange={(e) => validateId(e.target.value)}
        />
        {idError && (
          <p className="error mt-2">Employee ID must be exactly 6 digits</p>
        )}
      </div>
      <div
        className="layout-column align-items-start w-50"
        data-testid="input-joining-date"
      >
        <input
          className="w-100"
          type="date"
          name="joiningDate"
          value={date}
          placeholder="Joining Date"
          onChange={(e) => validateDate(e.target.value)}
        />
        {dateError && (
          <p className="error mt-2">Joining Date cannot be in the future</p>
        )}
      </div>
      <Button
        data-testid="submit-btn"
        type="submit"
        disabled={isSubmitDisabled}
        onClick={submit}
        className="w-full"
      >
        Submit
      </Button>
    </div>
  );
}

export default App;
