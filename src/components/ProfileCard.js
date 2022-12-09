import React from "react";
import { Card, ListGroup, Image } from "react-bootstrap";
// import fs from 'fs'
const fs = require('fs') 

const ProfileCard = (props) => {
  
  return (
    <Card style={{ width: "12rem" }} border="light" className="shadows">
      <ListGroup variant="flush">
        <ListGroup.Item className="d-flex justify-content-center">
          <Image
            src={"/img/" + props.user.id + ".jpg"}
            roundedCircle
            style={{ height: "10rem" }}
            className="shadows"
            loading="lazy"
          />
        </ListGroup.Item>
        <ListGroup.Item className="d-flex flex-column justify-content-center font">
          <div className="d-flex justify-content-center">
            <span className="fw-bold fs-5">
              {props.user.first_name} {props.user.last_name}
            </span>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default ProfileCard;
