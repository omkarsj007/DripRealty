import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import CardInfo from "../components/CardInfo";
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
    <div className="bg-tertiary-color pt-5" style={{ height: "100%" }}>
      <Container fluid className="font">
        <Container>
          <h1 className="fw-bold">{info.property.title}</h1>
          <p className="fs-5">
            Located in {info.property.location[0].city},{" "}
            {info.property.location[0].state}
          </p>
          <Row>
            <Col lg={6} style={{ height: "412px" }}>
              <img
                alt=""
                src={info.property.images[0]}
                className="cover rounded shadows"
                loading="lazy"
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
                    className="cover rounded shadows"
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
                    className="cover rounded shadows"
                    loading="lazy"
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
                    className="cover rounded shadows"
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
                    src={info.property.images[4]}
                    className="cover rounded shadows"
                    loading="lazy"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <Container className="mt-3 mb-3 fs-5">
          <p className="fs-2">
            {money(info.property.nightly_fee)}
            <span className="text-muted fs-5"> night</span>
          </p>
          <p className="fs-5">
            {info.property.max_guests} guests
            <i class="bi bi-dot" />
            {info.property.bedrooms} bedrooms
            <i class="bi bi-dot" />
            {info.property.beds} beds
            <i class="bi bi-dot" />
            {info.property.baths} baths
          </p>
          <hr />
          <Row>
            <Col lg={6} className="">
              <h3 className="fw-bold mb-3"> Description</h3>
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
      </Container>
    </div>
  );
};

export default PropertyInfo;
