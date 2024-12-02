/* eslint-disable testing-library/no-debugging-utils */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import App from "./App";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

afterEach(() => {
  cleanup();
});

let getByTestId: (id: string) => HTMLElement,
  inputName: HTMLElement,
  inputEmail: HTMLElement,
  inputEmployeeId: HTMLElement,
  inputJoiningDate: HTMLElement,
  submitBtn: HTMLElement;

const TEST_IDS = {
  inputName: "input-name",
  inputEmail: "input-email",
  inputEmployeeId: "input-employee-id",
  inputJoiningDate: "input-joining-date",
  submitBtn: "submit-btn",
};

beforeEach(() => {
  const app = render(<App />);
  getByTestId = app.getByTestId;
  inputName = getByTestId(TEST_IDS.inputName);
  inputEmail = getByTestId(TEST_IDS.inputEmail);
  inputEmployeeId = getByTestId(TEST_IDS.inputEmployeeId);
  inputJoiningDate = getByTestId(TEST_IDS.inputJoiningDate);
  submitBtn = getByTestId(TEST_IDS.submitBtn);
});

const changeInputFields = (
  name: string,
  email: string,
  employeeid: string,
  joiningdate: string
) => {
  fireEvent.change(inputName.children[0] as HTMLInputElement, {
    target: { value: name },
  });
  fireEvent.change(inputEmail.children[0] as HTMLInputElement, {
    target: { value: email },
  });
  fireEvent.change(inputEmployeeId.children[0] as HTMLInputElement, {
    target: { value: employeeid },
  });
  fireEvent.change(inputJoiningDate.children[0] as HTMLInputElement, {
    target: { value: joiningdate },
  });
};

describe("Initially", () => {
  it("All the fields should be empty", () => {
    expect(inputName.children[0] as HTMLInputElement).toHaveValue("");
    expect(inputEmail.children[0] as HTMLInputElement).toHaveValue("");
    expect(inputEmployeeId.children[0] as HTMLInputElement).toHaveValue("");
    expect(inputJoiningDate.children[0] as HTMLInputElement).toHaveValue("");
  });

  it("Submit button should be disabled", () => {
    expect(submitBtn).toHaveAttribute("disabled");
  });

  it("Should display all the errors", () => {
    expect(inputName.children).toHaveLength(2);
    expect(inputEmail.children).toHaveLength(2);
    expect(inputEmployeeId.children).toHaveLength(2);
    expect(inputJoiningDate.children).toHaveLength(2);
    expect(inputName.children[1]).toHaveTextContent(
      "Name must be at least 4 characters long and only contain letters and spaces"
    );
    expect(inputEmail.children[1]).toHaveTextContent(
      "Email must be a valid email address"
    );
    expect(inputEmployeeId.children[1]).toHaveTextContent(
      "Employee ID must be exactly 6 digits"
    );
    expect(inputJoiningDate.children[1]).toHaveTextContent(
      "Joining Date cannot be in the future"
    );
  });
});

describe("Input fields functionality", () => {
  it("should display no error for name input field's if criteria is met", () => {
    changeInputFields("UserA", "user-email.com", "123", "2025-04-12");
    expect(inputName.children).toHaveLength(1);
    expect(inputEmail.children).toHaveLength(2);
    expect(inputEmployeeId.children).toHaveLength(2);
    expect(inputJoiningDate.children).toHaveLength(2);
    expect(inputEmail.children[1]).toHaveTextContent(
      "Email must be a valid email address"
    );
    expect(inputEmployeeId.children[1]).toHaveTextContent(
      "Employee ID must be exactly 6 digits"
    );
    expect(inputJoiningDate.children[1]).toHaveTextContent(
      "Joining Date cannot be in the future"
    );
  });

  it("should display no error for email input field's if criteria is met", () => {
    changeInputFields("UserA", "user@email.com", "123", "2025-04-12");
    expect(inputName.children).toHaveLength(1);
    expect(inputEmail.children).toHaveLength(1);
    expect(inputEmployeeId.children).toHaveLength(2);
    expect(inputJoiningDate.children).toHaveLength(2);
    expect(inputEmployeeId.children[1]).toHaveTextContent(
      "Employee ID must be exactly 6 digits"
    );
    expect(inputJoiningDate.children[1]).toHaveTextContent(
      "Joining Date cannot be in the future"
    );
  });

  it("should display no error for employee ID input field's if criteria is met", () => {
    changeInputFields("Use", "user@email.com", "123456", "2025-04-12");
    expect(inputName.children).toHaveLength(2);
    expect(inputEmail.children).toHaveLength(1);
    expect(inputEmployeeId.children).toHaveLength(1);
    expect(inputJoiningDate.children).toHaveLength(2);
    expect(inputName.children[1]).toHaveTextContent(
      "Name must be at least 4 characters long and only contain letters and spaces"
    );
    expect(inputJoiningDate.children[1]).toHaveTextContent(
      "Joining Date cannot be in the future"
    );
  });

  it("should display no error for joining date input field's if criteria is met", () => {
    changeInputFields("Use", "user@email.com", "12345", "2024-04-12");
    expect(inputName.children).toHaveLength(2);
    expect(inputEmail.children).toHaveLength(1);
    expect(inputEmployeeId.children).toHaveLength(2);
    expect(inputJoiningDate.children).toHaveLength(1);
    expect(inputEmployeeId.children[1]).toHaveTextContent(
      "Employee ID must be exactly 6 digits"
    );
    expect(inputName.children[1]).toHaveTextContent(
      "Name must be at least 4 characters long and only contain letters and spaces"
    );
  });

  it("Should show no error and enable the submit button if all the input fields meets criteria", () => {
    changeInputFields("UserA", "user@email.com", "123456", "2024-04-12");
    expect(inputName.children).toHaveLength(1);
    expect(inputEmail.children).toHaveLength(1);
    expect(inputEmployeeId.children).toHaveLength(1);
    expect(inputJoiningDate.children).toHaveLength(1);
    expect(submitBtn).not.toHaveAttribute("disabled");
  });
});
