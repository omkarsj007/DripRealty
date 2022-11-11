import React from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import PropCard from "./PropCard";

const Properties = (props) => {
  return (
    <Container fluid className="mt-3">
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
            <PropCard key={p._id} property={p} />
          ))}
      </Row>
    </Container>
  );
};

export default Properties;
