import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import "./styles/mystyles.css";
import { Link } from "react-router-dom";

const PropCard = (props) => {
  const [info] = useState(props);
  return (
    <Col>
      <Link className="nav-link" to="/propertyInfo" state={{ info: info }}>
        <Card className="grow">
          <Card.Img
            variant="top"
            src={props.property.images[0]}
            style={{ height: "12rem" }}
            className="cover"
          />
          <Card.Body>
            <Card.Title>{props.property.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {props.property.location[0].city},{" "}
              {props.property.location[0].state}
            </Card.Subtitle>
            <Card.Text>{props.property.description}</Card.Text>
            <Card.Subtitle className="mb-2">
              ${props.property.nightly_fee}/night
            </Card.Subtitle>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};

export default PropCard;
