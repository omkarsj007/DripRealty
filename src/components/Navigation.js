import React, { useState, useEffect } from "react";
import "./styles/mystyles.css";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const ProfileButton = (props) =>{
  if (localStorage.getItem('user')) {
    console.log(localStorage.getItem('user'))
    return (
      <Link to="/profile" state={{ info: props.profile }}>
        <button className="btn btn-warning font mx-3">
          <span>
            <i className="bi bi-justify pe-2"></i>
            <i className="bi bi-person-circle"></i>
          </span>
        </button>
      </Link>
    )
  } else {
    return (
      <Link to="/login" state={{ info: props.profile }}>
        <button className="btn btn-warning font mx-3">
          <span>
            <i className="bi bi-justify pe-2"></i>
            <i className="bi bi-person-circle"></i>
          </span>
        </button>
      </Link>
    )
  }
}
const Navigation = () => {
  const [profile, setProfile] = useState([]);
  useEffect(() => {
    // fetch("http://localhost:3000/users")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setProfile(data[data.findIndex((e) => e.id === "U1")]);
    //   })
    //   .catch(console.log);
      setProfile(localStorage.getItem('user'))
  }, []);

  return (
    <header>
      <Navbar
        fixed="sticky"
        bg="dark"
        variant="dark"
        expand="lg"
        className="navbg"
      >
        <Container fluid>
          <Link className="nav-link navbar-brand" to="/">
            <img
              src="img/logo.png"
              alt="Logo"
              width="32px"
              height="32px"
              className="d-inline-block align-text-bottom"
            />
            <span className="primary-color fw-bold fs-3 font">Drip</span>
            <span className="secondary-color fw-bold fs-3 font">Realty</span>
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse
            id="navMenu"
            className="justify-content-end text-center"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link font mx-3" to="/becomeHost">
                  Become a Host
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link font mx-3" to="/discover">
                  Discover
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Login" state={{ info: profile }}>
                  <button className="btn btn-warning font mx-3">
                    <span>
                      <i className="bi bi-justify pe-2"></i>
                      <i className="bi bi-person-circle"></i>
                    </span>
                  </button>
                </Link> */
                <ProfileButton profile={profile}></ProfileButton>}
              </li>
            </ul>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Navigation;
