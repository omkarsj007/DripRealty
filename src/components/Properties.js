import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
const Properties = (props) => {
  return (
    <div className="mt-3">
      <Row xs={1} md={4} xxl={6} className="g-4">
        {props.properties
          .filter((filter) => {
            return (
              filter.location[0].city
                .toLowerCase()
                .includes(props.filterText.toLowerCase()) ||
              filter.location[0].state
                .toLowerCase()
                .includes(props.filterText.toLowerCase()) ||
              filter.title
                .toLowerCase()
                .includes(props.filterText.toLowerCase())
            );
          })
          .map((p) => (
            <Col>
              <Card className="grow">
                <Link
                  className="nav-link"
                  to="/propertyInfo"
                  propertyInfo={p.properties}
                >
                  <Card.Img
                    variant="top"
                    src={p.images[0]}
                    style={{ height: "12rem" }}
                    className="cover"
                  />
                  <Card.Body>
                    <Card.Title>{p.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {p.location[0].city}, {p.location[0].state}
                    </Card.Subtitle>
                    <Card.Text>{p.description}</Card.Text>
                    <Card.Subtitle className="mb-2">
                      ${p.nightly_fee}/night
                    </Card.Subtitle>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default Properties;
