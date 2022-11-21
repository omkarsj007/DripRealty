import React, { useRef, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

const BecomeHost = () => {
  const [inputFields, setInputFields] = useState({
    title: "",
    images: [
      "img/house101.jpg",
      "img/house102.jpg",
      "img/house103.jpg",
      "img/house104.jpg",
      "img/house105.jpg",
    ],
    location: [
      {
        address: "1010 Freedom Lane",
        city: "Fort Worth",
        state: "Texas",
      },
    ],
    nightly_fee: {
      $numberDecimal: "80.00",
    },
    service_fee: {
      $numberDecimal: "200.00",
    },
    cleaning_fee: {
      $numberDecimal: "35.00",
    },
    amenities: [
      "Coffee maker",
      "Swimming pool",
      "Freezer",
      "Ice maker",
      "Cable television",
      "Sound system",
      "Carbon monoxide alarm",
    ],
    max_guests: "8",
    beds: "7",
    baths: "3.5",
    description:
      "Stunning 5.5 acre Lake Front retreat in Fort Worth, Texas, with over 350' of lake frontage, a brand new 2,000 square foot dock, and a brand new pool and hot tub.",
    hostID: "U1",
  });

  const updateData = (e) => {
    setInputFields({
      ...inputFields,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputFields),
    };
    fetch("http://localhost:3000/properties?id=P9999", requestOptions)
      .then(() => console.log(inputFields))
      .catch(console.log);
  };

  return (
    <Container>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            placeholder="Enter title"
            name="title"
            onChange={updateData}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default BecomeHost;
