import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import ProfileCard from "../components/ProfileCard";
import "../components/styles/mystyles.css";
import { useLocation } from "react-router-dom";
import UserPropertyList from "../components/UserPropertyList";
import UserFavoriteList from "../components/UserFavoriteList";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const location = useLocation();
  // const [info] = useState(location.state.info);
  const [info, setInfo] = useState(JSON.parse(localStorage.getItem("user")));
  useEffect(() => {
    console.log("profile " + info.favorites);
  }, [info]);

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
    <Container className="bg-tertiary-color p-5 mt-3 profile-content ">
      <Row>
        <Col xs={6} md={4}>
          <Row>
            <ProfileCard user={info} />
          </Row>
          {/* <Row>
            <Button
              onClick={handleSubmit}
              style={{ width: "12rem" }}
              className="mt-3"
            >
              Sign Out
            </Button>
          </Row> */}
        </Col>
        <Col xs={12} md={8}>
          <UserPropertyList user={info} property={properties} />
        </Col>
        <Col>
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
