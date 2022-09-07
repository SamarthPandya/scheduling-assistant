import React from "react";
import Tabs from "./Components/TabComponent/Tabs";
import { useState } from "react";
import "./Login.css";
import { Route, Routes } from "react-router-dom";

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
          fetch(
            "https://iitgtt2022.000webhostapp.com/getatd.php?id=" + uname.value,
            {
              credentials: "include",
              headers: {
                "Content-type":
                  "application/x-www-form-urlencoded; charset=UTF-8",
              },
              method: "GET",
            }
          )
            .then(function (response) {
              console.log("Aagaya data bhai Hurray!!");
              response.json().then((res) => {
                window.data = res;
                // data = res;
                // console.log(data);
              });
            })
            .catch(function (error) {
              console.log(error);
            });
          fetch(
            "https://iitgtt2022.000webhostapp.com/getrecord.php?id=" +
              uname.value,
            {
              credentials: "include",
              headers: {
                "Content-type":
                  "application/x-www-form-urlencoded; charset=UTF-8",
              },
              method: "GET",
            }
          )
            .then(function (response) {
              console.log("Aagaya attendance");
              response.json().then((res) => {
                window.attended = res;
                // data = res;
                // console.log(data);
              });
            })
            .catch(function (error) {
              console.log(error);
            });
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
      <div id="topRightBox">
        {/* <a id="signUp" href="../register.html" target="_blank">
          Sign up
        </a> */}
        <a
          id="signUp"
          target="_blank"
          href={process.env.PUBLIC_URL + "/register.html"}
        >
          Sign up
        </a>
        <a
          id="signUp"
          target="_blank"
          href={process.env.PUBLIC_URL + "/about.html"}
        >
          About
        </a>
      </div>
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
