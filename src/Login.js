import React from "react";
import Tabs from "./Components/TabComponent/Tabs";
import { useState } from "react";
import "./Login.css";

function Login() {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );
  const database = [
    {
      username: "user1",
      password: "pass1",
    },
    {
      username: "user2",
      password: "pass2",
    },
  ];
  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };
  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        {renderErrorMessage("uname")}
        {renderErrorMessage("pass")}
        <input
          className="input"
          type="text"
          name="uname"
          required
          placeholder="username"
        />
        <input
          className="input"
          type="password"
          name="pass"
          required
          placeholder="password"
        />
        <input type="submit" value="Login" className="logIn" />
      </form>
    </div>
  );
  return isSubmitted ? <Tabs /> : renderForm;
}

export default Login;
