import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import UserPropertyCard from "./UserPropertyCard";

const UserPropertyList = (props) => {
  const [properties, setProperties] = useState([]);
  const [deleted, setDeleted] = useState("");
  useEffect(() => {
    if (deleted !== "") {
      let property = props.property.filter((filter) => deleted == filter.id)[0];
      let deleteProperty = {
        ...property,
        available: "no",
      };
      console.log(deleteProperty);

      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deleteProperty),
      };
      fetch(
        "http://localhost:3000/properties?id=" + deleteProperty.id,
        requestOptions
      )
        .then(() => {
          fetch("http://localhost:3000/properties")
            .then((res) => res.json())
            .then((data) => {
              setProperties(
                data.filter((filter) => filter.available === "yes")
              );
            })
            .catch(console.log);
        })
        .catch(console.log);
    } else {
      fetch("http://localhost:3000/properties")
        .then((res) => res.json())
        .then((data) => {
          setProperties(data.filter((filter) => filter.available === "yes"));
        })
        .catch(console.log);
    }
  }, [deleted]);

  return (
    <Container>
      <p className="font fw-bold fs-1">Listed Properties</p>
      <Row xs={1} md={1} xxl={1}>
        {properties
          .filter((filter) => filter.hostID === props.user.id)
          .map((p) => (
            <UserPropertyCard
              key={p.id}
              info={p}
              deleteValue={deleted}
              delete={setDeleted}
            />
          ))}
      </Row>
    </Container>
  );
};

export default UserPropertyList;
