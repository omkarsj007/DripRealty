import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import ProfileCard from "../components/ProfileCard";
import "../components/styles/mystyles.css";
import { useLocation } from "react-router-dom";
import UserPropertyList from "../components/UserPropertyList";
import UserFavoriteList from "../components/UserFavoriteList";
import { useNavigate, Link } from "react-router-dom";

const Profile = () => {
  const location = useLocation();
  // const [info] = useState(location.state.info);
  const [info, setInfo] = useState(JSON.parse(localStorage.getItem("user")));

  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/properties")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data.filter((filter) => filter.available === "yes"));
      })
      .catch(console.log);
  }, []);
  const handleSubmit = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  if (info == null) {
    return (
      <Row>
        <Button onClick={handleSubmit} label="">
          Please log in
        </Button>
      </Row>
    );
  }
  return (
    <Container className="bg-tertiary-color p-5 mt-5 mb-5 profile-content ">
      <Row>
        <Col xs={6} md={4}>
          <Row>
            <ProfileCard user={info} />
          </Row>
          <Row>
            <Link to="/reservations">
              <Button style={{ width: "170px" }} className="mt-3 grow">
                <span className="font">Reservations</span>
              </Button>
            </Link>
          </Row>
        </Col>
        <Col xs={12} md={8}>
          <UserPropertyList user={info} property={properties} />
        </Col>
        <Col>
          <hr />
          <UserFavoriteList
            user={info}
            property={properties}
            newInfo={setInfo}
          />
        </Col>
      </Row>
      <Row></Row>
    </Container>
  );
};

export default Profile;
