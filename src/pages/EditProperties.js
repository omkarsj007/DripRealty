import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  FloatingLabel,
  Accordion,
  Modal,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const EditProperties = () => {
  const location = useLocation();
  const [info] = useState(location.state.info);

  const [inputFields, setInputFields] = useState(info);

  const updateData = (e) => {
    setInputFields({
      ...inputFields,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddress = (e) => {
    setInputFields({
      ...inputFields,
      location: {
        ...inputFields.location,
        [e.target.name]: e.target.value,
      },
    });
  };

  const updatePrice = (e) => {
    setInputFields({
      ...inputFields,
      [e.target.name]: { $numberDecimal: e.target.value },
    });
  };

  const handleAmenities = (e) => {
    if (e.target.checked) {
      setInputFields({
        ...inputFields,
        amenities: [...inputFields.amenities, e.target.name],
      });
    } else {
      setInputFields({
        ...inputFields,
        amenities: [
          inputFields.amenities.filter((item) => item !== e.target.name),
        ],
      });
    }
  };
  const topAmenities = [
    "A pool",
    "Wifi",
    "A kitchen",
    "Free parking",
    "A jacuzzi",
    "A washer or dryer",
    "Air conditioning or heating",
    "Self check-in",
    "Laptop-friendly workspace",
    "Pets allowed",
  ];

  const safetyAmenities = [
    "Carbon monoxide alarm",
    "Smoke alarm",
    "Fire extinguisher",
    "First-aid kit",
    "Emergency plan and local numbers",
  ];

  const basicAmenities = [
    "Toilet paper",
    "Soap for hands and body",
    "One towel per guest",
    "Linens for each bed",
    "One pillow per guest",
    "Cleaning supplies",
  ];

  const extraAmenities = [
    "Toiletries",
    "Cleaning supplies",
    "Dining basics",
    "Wine glasses",
    "Cooking supplies",
    "Drinks",
    "Snacks",
    "Hangers",
    "Adapters and chargers",
    "Laptop-friendly workspace",
    "Good lighting",
    "Office supplies",
  ];
  const navigate = useNavigate();

  const handleSubmit = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputFields),
    };
    fetch(
      "http://localhost:3000/properties?id=" + inputFields.id,
      requestOptions
    )
      .then(() => console.log(inputFields))
      .catch(console.log);
    setShow(false);
    navigate("/propertyInfo", { state: { info: { property: inputFields } } });
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Container className="mt-5">
      <div className="m-3 fs-1 fw-bold font d-flex justify-content-center">
        Update your property
      </div>
      <hr />
      <Form className="ps-5 pe-5">
        <Form.Group className="mb-3">
          <FloatingLabel label="Title">
            <Form.Control
              value={inputFields.title}
              name="title"
              onChange={updateData}
            />
          </FloatingLabel>
          <Form.Label className="mt-3 fs-3 font">Location Detail</Form.Label>
          <FloatingLabel label="Street Address">
            <Form.Control
              value={inputFields.location.address}
              name="address"
              onChange={handleAddress}
            />
          </FloatingLabel>
          <Row className="mt-2">
            <Col>
              <FloatingLabel label="City">
                <Form.Control
                  value={inputFields.location.city}
                  name="city"
                  onChange={handleAddress}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label="State">
                <Form.Control
                  value={inputFields.location.state}
                  name="state"
                  onChange={handleAddress}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Form.Label className="mt-3 fs-3 font">
            Property Information
          </Form.Label>
          <Row className="mt-2">
            <Col>
              <FloatingLabel label="Max Guests">
                <Form.Control
                  value={inputFields.max_guests}
                  name="max_guests"
                  onChange={updateData}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label="Beds">
                <Form.Control
                  value={inputFields.beds}
                  name="beds"
                  onChange={updateData}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label="Bedrooms">
                <Form.Control
                  value={inputFields.bedrooms}
                  name="bedrooms"
                  onChange={updateData}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label="Baths">
                <Form.Control
                  value={inputFields.baths}
                  name="baths"
                  onChange={updateData}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <FloatingLabel label="Description" className="mt-3">
            <Form.Control
              as="textarea"
              value={inputFields.description}
              name="description"
              onChange={updateData}
              style={{ maxHeight: "10rem", minHeight: "6rem" }}
            />
          </FloatingLabel>
          <Form.Label className="mt-3 fs-3 font">Prices</Form.Label>
          <Row className="mt-2">
            <Col>
              <FloatingLabel label="Nightly Fee">
                <Form.Control
                  value={inputFields.nightly_fee.$numberDecimal}
                  name="nightly_fee"
                  onChange={updatePrice}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label="Service Fee">
                <Form.Control
                  value={inputFields.service_fee.$numberDecimal}
                  name="service_fee"
                  onChange={updatePrice}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label="Cleaning Fee">
                <Form.Control
                  value={inputFields.nightly_fee.$numberDecimal}
                  name="cleaning_fee"
                  onChange={updatePrice}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Form.Label className="mt-3 fs-3 font">Amenities</Form.Label>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Popular Amenties</Accordion.Header>
              <Accordion.Body>
                <Row xs={1} md={4} xxl={6} className="g-4">
                  {topAmenities.map((item) => (
                    <Form.Check
                      type="radio"
                      key={item}
                      name={item}
                      label={item}
                      onChange={handleAmenities}
                    />
                  ))}
                </Row>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Basic Amenities</Accordion.Header>
              <Accordion.Body>
                <Row xs={1} md={4} xxl={6} className="g-4">
                  {basicAmenities.map((item) => (
                    <Form.Check
                      type="radio"
                      key={item}
                      name={item}
                      label={item}
                      onChange={handleAmenities}
                    />
                  ))}
                </Row>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Safety Amenities</Accordion.Header>
              <Accordion.Body>
                <Row xs={1} md={4} xxl={6} className="g-4">
                  {safetyAmenities.map((item) => (
                    <Form.Check
                      type="radio"
                      key={item}
                      name={item}
                      label={item}
                      onChange={handleAmenities}
                    />
                  ))}
                </Row>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Extra Amenities</Accordion.Header>
              <Accordion.Body>
                <Row xs={1} md={4} xxl={6} className="g-4">
                  {extraAmenities.map((item) => (
                    <Form.Check
                      type="radio"
                      key={item}
                      name={item}
                      label={item}
                      onChange={handleAmenities}
                    />
                  ))}
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Form.Group>
        <hr />
        <div className="d-flex justify-content-center mb-5">
          <Button size="lg" variant="primary" onClick={handleShow}>
            Submit
          </Button>
        </div>
      </Form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new property</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure the information is correct? </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EditProperties;
