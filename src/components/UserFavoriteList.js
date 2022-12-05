import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import UserFavoriteCard from "./UserFavoriteCard";

const UserFavoriteList = (props) => {
  const [userData, setUseData] = useState(props.user);
  console.log("before");
  console.log(userData);
  const [deleted, setDeleted] = useState(0);
  useEffect(() => {
    fetch("http://localhost:3000/users?id=" + props.user.id)
      .then((res) => res.json())
      .then((data) => {
        setUseData({
          ...data[0],
          token: JSON.parse(localStorage.getItem("user")).token,
        });
        localStorage.setItem("user", JSON.stringify(userData));
        // console.log("local");
        // console.log(JSON.parse(localStorage.getItem("user")));
        // console.log("user");
        console.log("inside");
        console.log(userData.favorites);
      })
      .catch(console.log);
  }, [deleted]);

  return (
    <Container>
      <p className="font fw-bold fs-1">
        {userData.Age} Favorites {deleted}
      </p>

      <Row xs={1} md={1} xxl={1}>
        {props.property
          .filter((filter) => userData.favorites.includes(filter.id))
          .map((p) => (
            <UserFavoriteCard
              key={p.id}
              info={p}
              user={userData}
              deleteValue={deleted}
              delete={setDeleted}
            />
          ))}
      </Row>
    </Container>
  );
};

export default UserFavoriteList;
