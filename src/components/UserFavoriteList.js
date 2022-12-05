import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import UserFavoriteCard from "./UserFavoriteCard";

const UserFavoriteList = (props) => {
  const [userData, setUserData] = useState(props.user);
  const [deleted, setDeleted] = useState(0);
  useEffect(() => {
    console.log("Userdata " + userData.favorites);
    props.newInfo(userData);
  }, [userData]);
  useEffect(() => {
    if (deleted != 0) {
      fetch("http://localhost:3000/users?id=" + props.user.id)
        .then((res) => res.json())
        .then((data) => {
          setUserData({
            ...data[0],
            token: JSON.parse(localStorage.getItem("user")).token,
          });
          localStorage.setItem("user", JSON.stringify(userData));
          // props.newInfo(userData);
        })
        .catch(console.log);
    }
  }, [deleted]);

  return (
    <Container>
      <p className="font fw-bold fs-1">
        {userData.favorites} Favorites {props.user.favorites} {deleted}
      </p>

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
