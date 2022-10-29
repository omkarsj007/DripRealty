import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import "./styles/mystyles.css";
import { Link } from "react-router-dom";

const PropCard = (props) => {
  const money = (number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(number);
  };
  const [info] = useState(props);
  return (
    <Col>
      <Link className="nav-link" to="/propertyInfo" state={{ info: info }}>
        <Card 
          className="grow" 
          variant="light" 
          text="dark"
          bg="light">
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
            <Card.Text>{props.property.description.substring(0, 160)}...</Card.Text>
            <Card.Subtitle className="mb-2">
              {money(props.property.nightly_fee)}/night
            </Card.Subtitle>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};

export default PropCard;
