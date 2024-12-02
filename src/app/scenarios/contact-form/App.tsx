import { Button } from "flowbite-react";
import React, { FormEvent, useState } from "react";

interface SubmittedData {
  name: string;
  email: string;
  message: string;
}

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submittedData, setSubmittedData] = useState<SubmittedData | null>(
    null
  );
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // TODO: Add logic to validate inputs and display submitted data
    if (!name || !email || !message) {
      setSubmittedData(null);
      setError("All fields are required.");
      return;
    }
    setError("");
    setName("");
    setEmail("");
    setMessage("");
    setSubmittedData({ name, email, message });
    // HINT: You can use the setError function

    // HINT: You can use the setSubmittedData function as below
    // setSubmittedData({ name, email, message });
  };

  return (
    <>
      <div className="App">
        <h1>Contact Form</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            data-testid="name-input"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            data-testid="email-input"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            data-testid="message-input"
          />
          <Button type="submit" data-testid="submit-button">
            Submit
          </Button>
        </form>
        {error && (
          <p data-testid="error-message" className="error">
            {error}
          </p>
        )}
        {submittedData && (
          <div data-testid="submitted-data" className="submitted-data">
            <h2>Submitted Information</h2>
            <p>
              <strong>Name:</strong> {submittedData.name}
            </p>
            <p>
              <strong>Email:</strong> {submittedData.email}
            </p>
            <p>
              <strong>Message:</strong> {submittedData.message}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
