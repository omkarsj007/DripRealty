import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import ProfileCard from "../components/ProfileCard";
import "../components/styles/mystyles.css";

const Profile = () => {
  return (
    <Container className="bg-tertiary-color p-5 mt-3 profile-content ">
      <Row>
        <Col xs={6} md={4}>
          <ProfileCard />
        </Col>
        <Col xs={12} md={8}></Col>
      </Row>
    </Container>
  );
};

export default Profile;
