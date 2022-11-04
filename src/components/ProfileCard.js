import React from "react";
import { Card, ListGroup, Image } from "react-bootstrap";

const ProfileCard = () => {
  return (
    <Card style={{ width: "12rem" }} border="light" className="shadows">
      <ListGroup variant="flush">
        <ListGroup.Item className="d-flex justify-content-center">
          <Image
            src="/img/ansheng.jpg"
            roundedCircle
            style={{ height: "10rem" }}
            className="shadows"
            loading="lazy"
          />
        </ListGroup.Item>
        <ListGroup.Item className="d-flex flex-column justify-content-center font">
          <div className="d-flex justify-content-center">
            <span className="fw-bold fs-3">Ansheng Li</span>
          </div>
          <div className="d-flex justify-content-center">
            <span className="fs-4 ">Ratings</span>
          </div>
          <div className="d-flex justify-content-center">
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star"></i>
            <i class="bi bi-star"></i>
            <i class="bi bi-star"></i>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default ProfileCard;
