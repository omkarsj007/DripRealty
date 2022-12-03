import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import UserPropertyCard from "./UserPropertyCard";

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

  props.user.favorites.map((p) => {
    console.log(properties.find((find) => find.id === p));
  });

  return (
    <Container>
      <p className="font fw-bold fs-1">Favorites</p>
      <Row xs={1} md={1} xxl={1}>
        {props.user.favorites.map((p) => {
          <UserPropertyCard
            key={p}
            info={properties.find((find) => find.id === p)}
          />;
        })}
      </Row>
    </Container>
  );
};

export default UserFavoriteList;
