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

    fetch("https://iitgtt2022.000webhostapp.com/signin.php", {
      credentials: "include",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      method: "POST",
      body: "id=" + uname.value + "&pwd=" + pass.value,
    })
      .then(function (response) {
        console.log(response);
        if (response.status == 305) {
          setErrorMessages({ name: "pass", message: errors.pass });
        } else if (response.status == 200) {
          sessionStorage.setItem("id", uname.value);
          setIsSubmitted(true);
        } else if (response.status == 303) {
          // Username not found
          setErrorMessages({ name: "uname", message: errors.uname });
        } else {
          console.log("Fatal Error:" + response.status + " =>" + response.text);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    // // Find user login info
    // const userData = database.find((user) => user.username === uname.value);

    // // Compare user info
    // if (userData) {
    //   if (userData.password !== pass.value) {
    //     // Invalid password
    //     setErrorMessages({ name: "pass", message: errors.pass });
    //   } else {
    //     setIsSubmitted(true);

    //   }
    // } else {
    //   // Username not found
    //   setErrorMessages({ name: "uname", message: errors.uname });
    // }
  };

  //   // Find user login info
  //   const userData = database.find((user) => user.username === uname.value);

  //   // Compare user info
  //   if (userData) {
  //     if (userData.password !== pass.value) {
  //       // Invalid password
  //       setErrorMessages({ name: "pass", message: errors.pass });
  //     } else {
  //       setIsSubmitted(true);
  //     }
  //   } else {
  //     // Username not found
  //     setErrorMessages({ name: "uname", message: errors.uname });
  //   }

  const renderForm = (
    <div className="formBox">
      <form id="InnerFormBox" onSubmit={handleSubmit}>
        {renderErrorMessage("uname")}
        {renderErrorMessage("pass")}
        <input
          className="inputBox"
          type="text"
          name="uname"
          autoComplete="off"
          required
          placeholder="username"
        />
        <input
          className="inputBox"
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
