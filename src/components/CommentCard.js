import React, { useEffect, useState } from "react";
import { Card, Image, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const CommentCard = (props) => {
  const [profile, setProfile] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => {
        setProfile(
          data[data.findIndex((e) => e.id === props.user.reviewer_id)]
        );
      })
      .catch(console.log);
  }, []);
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col md={1}>
            <Link className="nav-link" to="/profile" state={{ info: profile }}>
              <Image
                src={"/img/" + profile.id + ".jpg"}
                roundedCircle
                style={{ height: "5rem" }}
                className="shadows"
                loading="lazy"
              />
            </Link>
          </Col>
          <Col md={11}>
            <div>
              <span className="fs-3 fw-bold">
                {profile.first_name} {profile.last_name}
              </span>
              <div>{props.user.comments}</div>
              <div className="fst-italic fw-bold">
                Rating: {props.user.rating}/5
              </div>
              <div>{props.user.dateCommented.substring(0, 10)}</div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CommentCard;
