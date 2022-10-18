import React from "react";
import Row from "react-bootstrap/Row";
import PropCard from "./PropCard";

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
            <PropCard key={p.id} property={p} />
          ))}
      </Row>
    </div>
  );
};

export default Properties;
