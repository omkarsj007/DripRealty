import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import UserFavoriteCard from "./UserFavoriteCard";

const UserFavoriteList = (props) => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/properties")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
      })
      .catch(console.log);
  }, []);

  const [userData, setUseData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/users?id=U1")
      .then((res) => res.json())
      .then((data) => {
        setUseData(data);
      })
      .catch(console.log);
  }, []);

  return (
    <Container>
      <p className="font fw-bold fs-1">Favorites</p>
      <Row xs={1} md={1} xxl={1}>
        {properties
          .filter((filter) => props.user.favorites.includes(filter.id))
          .map((p) => (
            <UserFavoriteCard key={p.id} info={p} user={userData} />
          ))}
      </Row>
    </Container>
  );
};

export default UserFavoriteList;
