import React, { useState } from "react";
import {
  Col,
  Container,
  Row,
  Button,
  FloatingLabel,
  Form,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import CardInfo from "../components/CardInfo";
import CommentSection from "../components/CommentSection";
import "../components/styles/mystyles.css";
const PropertyInfo = () => {
  const location = useLocation();
  const [info] = useState(location.state.info);
  const money = (number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(number);
  };
  return (
    <Container fluid className="font pt-3 bg-tertiary-color">
      <Container>
        <h1 className="fw-bold">{info.property.title}</h1>
        <p className="fs-5">
          Located in {info.property.location.city},{" "}
          {info.property.location.state}
        </p>
        <Row>
          <Col lg={6} style={{ height: "412px" }}>
            <img
              alt=""
              src={info.property.images[0]}
              className="cover rounded"
            />
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
                  loading="lazy"
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
      </Container>
      <Container className="mt-3 mb-3 fs-5">
        <p className="fs-2">
          {money(info.property.nightly_fee["$numberDecimal"])}
          <span className="text-muted fs-5"> night</span>
        </p>
        <p className="fs-5">
          {info.property.max_guests} guests
          <i className="bi bi-dot" />
          {info.property.bedrooms} bedrooms
          <i className="bi bi-dot" />
          {info.property.beds} beds
          <i className="bi bi-dot" />
          {info.property.baths} baths
        </p>
        <hr />
        <Row>
          <Col lg={6} className="mb-5">
            <p className="fw-bold mb-3 fs-5"> Description</p>
            <p className="fs-4">{info.property.description}</p>
            <hr />
            <p className="fw-bold fs-4"> Amenities</p>
            <ul>
              {info.property.amenities.map((a, i) => (
                <li key={i} className="fs-5">
                  {a}
                </li>
              ))}
            </ul>
          </Col>
          <Col lg={6}>
            <CardInfo fees={info} />
          </Col>
        </Row>
      </Container>
      <Container className="pb-5">
        <p className="fs-3 fw-bold">Comments</p>

        <Row>
          <Col xs={14} md={10}>
            <Form>
              <FloatingLabel label="Post a comment" className="mt-3">
                <Form.Control
                  as="textarea"
                  name="description"
                  style={{ maxHeight: "10rem", minHeight: "6rem" }}
                />
              </FloatingLabel>
            </Form>
          </Col>
          <Col xs={4} md={2}>
            <Button variant="outline-dark" size="lg">
              Insert
            </Button>
          </Col>
        </Row>
        <hr />
      </Container>
      <Container className="pb-5">
        <CommentSection propertyID={info.property.id} />
      </Container>
    </Container>
  );
};

export default PropertyInfo;
