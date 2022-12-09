import React from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import PropCard from "./PropCard";

const Properties = (props) => {
  return (
    <Container fluid className="mt-3 mb-5" style={{ height: "100vh" }}>
      <Row xs={1} md={4} xxl={6} className="g-4">
        {props.properties
          .filter((filter) => {
            return (
              filter.location.city
                .toLowerCase()
                .includes(props.filterText.toLowerCase()) ||
              filter.location.state
                .toLowerCase()
                .includes(props.filterText.toLowerCase()) ||
              filter.title
                .toLowerCase()
                .includes(props.filterText.toLowerCase())
            );
          })
          .filter((filter) => {
            return filter.type
              .toLowerCase()
              .includes(props.filterType.toLowerCase());
          })
          .map((p) => (
            <PropCard key={p.id} property={p} />
          ))}
      </Row>
    </Container>
  );
};

export default Properties;
