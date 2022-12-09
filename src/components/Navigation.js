import React, { useState, useEffect } from "react";
import "./styles/mystyles.css";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const ProfileButton = (props) => {
  window.onload = () => {
    // console.log(JSON.parse(localStorage.getItem("user")));
    // console.log(props.profile);
    // console.log(props.link);
  };
  const navigate = useNavigate();
  const handleSubmit = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (localStorage.getItem("user")) {
    return (
      <Dropdown className="d-inline mx-2 font fs-5 fw-bold ">
        <Dropdown.Toggle id="dropdown-autoclose-true" variant="warning">
          Menu
        </Dropdown.Toggle>

        <Dropdown.Menu align="end" title="Dropdown end">
          <Link
            to="/profile"
            state={{ info: props.profile }}
            style={{ textDecoration: "none" }}
          >
            <Dropdown.Item as="button">
              <span className="font fw-3">Profile</span>
            </Dropdown.Item>
          </Link>
          <Dropdown.Divider />
          <Dropdown.Item as="button" onClick={handleSubmit}>
            <span className="font fw-3">Sign out</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  } else {
    return (
      <Link to="/login">
        <button className="btn btn-warning font mx-3">
          <span>
            <i className="bi bi-justify pe-2"></i>
            <i className="bi bi-person-circle"></i>
          </span>
        </button>
      </Link>
    );
  }
};
const Navigation = () => {
  // const [profile, setProfile] = useState({});
  const localUser = JSON.parse(localStorage.getItem("user")) || {};
  const [profile, setProfile] = useState(localUser);
  const l = localStorage.getItem("userData") ? "/profile" : "/login";
  const [link, setLink] = useState(l);

  useEffect(() => {
    let a = JSON.parse(localStorage.getItem("user"));
    setProfile(a);
    if (localStorage.getItem("user")) {
      setLink("/profile");
    } else {
      setLink("/login");
    }
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
                <ProfileButton profile={profile} link={link}></ProfileButton>
              </li>
            </ul>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Navigation;
