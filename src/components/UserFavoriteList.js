import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import UserFavoriteCard from "./UserFavoriteCard";

const UserFavoriteList = (props) => {
  const [userData, setUseData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/users?id=U1")
      .then((res) => res.json())
      .then((data) => {
        setUseData(data);
        console.log(userData);
      })
      .catch(console.log);
  }, []);

  return (
    <Container>
      <p className="font fw-bold fs-1">Favorites</p>
      <Row xs={1} md={1} xxl={1}>
        {props.property
          .filter((filter) => props.user.favorites.includes(filter.id))
          .map((p) => (
            <UserFavoriteCard key={p.id} info={p} user={userData} />
          ))}
      </Row>
    </Container>
  );
};

export default UserFavoriteList;
