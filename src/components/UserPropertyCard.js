import React from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import "./styles/mystyles.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
const UserPropertyCard = (props) => {
  return (
    <Container>
      <div className="card-list mb-2" style={{ height: "6rem" }}>
        <img
          className="cover rounded shadows"
          src={props.info.images[0]}
          alt="background"
        />
        <p
          className="centered font text-shadow fs-3 ps-5"
          style={{ color: "white" }}
        >
          {props.info.title}
        </p>
        <OverlayTrigger placement="right" overlay={<Tooltip>Edit</Tooltip>}>
          <Link to="/editProperties" state={{ info: props.info }}>
            <i
              className="edit-link bi bi-pencil-square btn-centered fs-2"
              style={{ color: "white" }}
            ></i>
          </Link>
        </OverlayTrigger>
      </div>
    </Container>
  );
};

export default UserPropertyCard;
