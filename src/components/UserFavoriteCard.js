import React, { useCallback, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import "./styles/mystyles.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
const UserFavoriteCard = (props) => {
  const [inputFields, setInputFields] = useState(props.user[0]);

  const navigate = useNavigate();
  const handleSubmit = () => {
    let changes = props.user[0].favorites.filter(
      (filter) => props.info.id !== filter
    );
    setInputFields({
      ...inputFields,
      favorites: changes,
    });
    console.log(inputFields);
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputFields),
    };
    fetch("http://localhost:3000/users?id=U1", requestOptions)
      .then(() => console.log())
      .catch(console.log);
  };
  const handleOnClickProperty = useCallback(
    () =>
      navigate(
        "/propertyInfo",
        { state: { info: { property: props.info } } },
        { replace: true }
      ),
    [navigate]
  );
  return (
    <Container>
      <div className="card-list mb-2 grow" style={{ height: "6rem" }}>
        <img
          className="cover rounded shadows"
          src={props.info.images[0]}
          alt="background"
          loading="lazy"
        />

        <p
          className="centered font text-shadow fs-3 ps-5 edit-link`"
          style={{ color: "white" }}
          onClick={handleOnClickProperty}
        >
          {props.info.title}
        </p>
        <OverlayTrigger placement="right" overlay={<Tooltip>Remove</Tooltip>}>
          <i
            className="edit-link bi bi-trash btn-centered fs-2"
            style={{ color: "white" }}
            onClick={handleSubmit}
          ></i>
        </OverlayTrigger>
      </div>
    </Container>
  );
};

export default UserFavoriteCard;
