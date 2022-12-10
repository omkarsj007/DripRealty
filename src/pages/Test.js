import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
const Test = () => {
  // const [properties, setProperties] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [properties, setProperty] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/properties")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProperty(data);
        console.log({ properties });
        if (properties == null) {
          console.log(null);
        }
      })
      .then(() => console.log(properties))
      .catch(console.log);
  }, []);

  return (
    <div className="">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Test;
