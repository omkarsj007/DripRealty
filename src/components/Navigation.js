import React, { useCallback } from "react";
import "./styles/mystyles.css";
import { Link, useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";

import Navbar from "react-bootstrap/Navbar";

const Navigation = () => {
  const navigate = useNavigate();
  const clickProfile = useCallback(
    () => navigate("/profile", { replace: true }),
    [navigate]
  );
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
                <button
                  className="btn btn-warning font mx-3"
                  onClick={clickProfile}
                >
                  <span>
                    <i className="bi bi-justify pe-2"></i>
                    <i className="bi bi-person-circle"></i>
                  </span>
                </button>
              </li>
            </ul>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Navigation;
