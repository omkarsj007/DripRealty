import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import UserPropertyCard from "./UserPropertyCard";

const UserPropertyList = (props) => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/properties")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
      })
      .catch(console.log);
  }, []);
  return (
    <Container>
      <p className="font fw-bold fs-1">Listed Properties</p>
      <Row xs={1} md={1} xxl={1}>
        {properties
          .filter((filter) => filter.hostID === props.user.id)
          .map((p) => (
            <UserPropertyCard key={p.id} info={p} />
          ))}
      </Row>
    </Container>
  );
};

export default UserPropertyList;
