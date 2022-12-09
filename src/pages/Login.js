import React from "react";
import { Container, Form, FloatingLabel, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [inputFields, setInputFields] = useState({ email: "", password: "" });
  const updateData = (e) => {
    setInputFields({
      ...inputFields,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log(inputFields["email"]);
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        // you will get user information from login form

        email: inputFields["email"],
        password: inputFields["password"],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        let inMemoryToken = data.token;
        console.log(localStorage.getItem("user"));

        localStorage.setItem("user", JSON.stringify(data));
        navigate("/profile", {
          state: { info: JSON.parse(localStorage.getItem("user")) },
        });
      })
      // .then(
      //       fetch("http://localhost:3000/welcome/", {
      //       method: "get",
      //       headers: {
      //         "Content-Type": "application/json",
      //         Accept: "application/json",
      //         "x-auth-token": JSON.parse(localStorage.getItem("user")).token,
      //       },
      //       })
      //       .then((res) => res.json())
      //       .then((res) => console.log(res))
      // )
      .catch((error) => {
        console.log(error.message);
      });

    //request to a protected route
    // const localstorage_user = JSON.parse(localStorage.getItem("user"));
    // console.log(localstorage_user);
    // fetch("http://localhost:3000/welcome/", {
    //   method: "get",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //     "x-auth-token": localstorage_user.token,
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((res) => console.log(res));
  };
  // if (localStorage.getItem("user")) {
  //   navigate("/profile", {
  //     state: { info: JSON.parse(localStorage.getItem("user")) },
  //   });
  // }

  const registerPage = () => {
    navigate("/register");
  };
  return (
    <Container
      className="w-25 profile-content mt-5"
      style={{ minWidth: "28rem" }}
    >
      <Form className="p-5">
        <Form.Group>
          <FloatingLabel label="Email" className="mb-3">
            <Form.Control
              placeholder="Title"
              name="email"
              onChange={updateData}
            />
          </FloatingLabel>
          <FloatingLabel label="Password" className="mb-3">
            <Form.Control
              placeholder="Title"
              name="password"
              onChange={updateData}
            />
          </FloatingLabel>
          <Container className="d-flex justify-content-center">
            <Button onClick={handleSubmit} className="btn btn-lg grow">
              <span className="font fw-bold">Login</span>
            </Button>
            <Button
              style={{ marginLeft: "0.8rem" }}
              className="btn btn-lg grow btn-warning"
              onClick={registerPage}
            >
              <span className="font fw-bold">Register</span>
            </Button>
          </Container>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Login;
