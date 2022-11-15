import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
const Test = () => {
  const [properties, setProperties] = useState([]);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/insert")
      .then((res) => res.json())
      .then((data) => {
        setProperties(JSON.stringify(data, null, 2));
      })
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
      {properties}
    </div>
  );
};

export default Test;
