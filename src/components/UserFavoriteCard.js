import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import "./styles/mystyles.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
const UserFavoriteCard = (props) => {
  const [inputFields, setInputFields] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/users?id=U1")
      .then((res) => res.json())
      .then((data) => {
        setInputFields(data);
      })
      .catch(console.log);
  }, []);

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inputFields),
  };
  fetch("http://localhost:3000/user?id=U1", requestOptions)
    .then(() => console.log())
    .catch(console.log);
  return (
    <Container>
      <Link to="/propertyInfo" state={{ info: { property: props.info } }}>
        <div className="card-list mb-2 grow" style={{ height: "6rem" }}>
          <img
            className="cover rounded shadows"
            src={props.info.images[0]}
            alt="background"
            loading="lazy"
          />

          <p
            className="centered font text-shadow fs-3 ps-5"
            style={{ color: "white" }}
          >
            {props.info.title}
          </p>
          <OverlayTrigger placement="right" overlay={<Tooltip>Remove</Tooltip>}>
            <i
              className="edit-link bi bi-trash btn-centered fs-2"
              style={{ color: "white" }}
            ></i>
          </OverlayTrigger>
        </div>
      </Link>
    </Container>
  );
};

export default UserFavoriteCard;
