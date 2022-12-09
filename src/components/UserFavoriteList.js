import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import UserFavoriteCard from "./UserFavoriteCard";

const UserFavoriteList = (props) => {
  const [userData, setUserData] = useState(props.user);
  const [deleted, setDeleted] = useState("");
  useEffect(() => {
    props.newInfo(userData);
  }, [userData]);

  useEffect(() => {
    if (deleted !== "") {
      userData.favorites = props.user.favorites.filter(
        (filter) => deleted !== filter
      );
      setUserData({
        ...userData,
        token: JSON.parse(localStorage.getItem("user")).token,
      });
      localStorage.setItem("user", JSON.stringify(userData));
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      };
      fetch("http://localhost:3000/users?id=" + props.user.id, requestOptions)
        .then(() => console.log())
        .catch(console.log);
    }
  }, [deleted]);

  return (
    <Container>
      <p className="font fw-bold fs-1">Favorites</p>
      <Row xs={1} md={1} xxl={1}>
        {props.property
          .filter((filter) => userData.favorites.includes(filter.id))
          .map((p) => (
            <UserFavoriteCard
              key={p.id}
              info={p}
              user={userData}
              setUser={setUserData}
              deleteValue={deleted}
              delete={setDeleted}
            />
          ))}
      </Row>
    </Container>
  );
};

export default UserFavoriteList;
