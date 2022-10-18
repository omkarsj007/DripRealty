import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "../components/styles/mystyles.css";
const PropertyInfo = () => {
  const location = useLocation();
  const [info] = useState(location.state.info);
  return (
    <Container className="font mt-3">
      <h1 className="fw-bold">{info.property.title}</h1>
      <p className="fs-5">
        Located in {info.property.location[0].city},{" "}
        {info.property.location[0].state}
      </p>
      <Row>
        <Col lg={6} style={{ height: "412px" }}>
          <img alt="" src={info.property.images[0]} className="cover rounded" />
        </Col>
        <Col lg={6}>
          <Row className="g-2">
            <Col
              lg={6}
              className="d-none d-lg-block"
              style={{ height: "200px" }}
            >
              <img
                alt=""
                src={info.property.images[1]}
                className="cover rounded"
              />
            </Col>
            <Col
              lg={6}
              className="d-none d-lg-block"
              style={{ height: "200px" }}
            >
              <img
                alt=""
                src={info.property.images[2]}
                className="cover rounded"
              />
            </Col>
          </Row>
          <Row className="g-2 mt-1">
            <Col
              lg={6}
              className="d-none d-lg-block"
              style={{ height: "200px" }}
            >
              <img
                alt=""
                src={info.property.images[3]}
                className="cover rounded"
              />
            </Col>
            <Col
              lg={6}
              className="d-none d-lg-block"
              style={{ height: "200px" }}
            >
              <img
                alt=""
                src={info.property.images[4]}
                className="cover rounded"
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="bg bg-light text-bg-light mt-3 mb-3 fs-5">
        <p>${info.property.nightly_fee} per night</p>
        <p>Amenities:</p>
        <ul>
          {info.property.amenities.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default PropertyInfo;
