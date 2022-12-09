import React, { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [properties, setProperties] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setError] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/properties")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data.map((d) => d.id.substring(1)));
      })
      .catch(console.log);
  }, []);

  const [inputFields, setInputFields] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    pwd: "",
    phone_num: "",
    Age: "",
    join_date: new Date().toLocaleDateString(),
    favorites: [],
  });

  const updateData = (e) => {
    setInputFields({
      ...inputFields,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputFields),
    };
    fetch("http://localhost:3000/register", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          console.log(data.error);
          setErrorMessage(data.error);
          setError(true);
        } else {
          localStorage.setItem("user", data);
          console.log(data);
          setError(false);
          navigate("profile");
        }
      })
      .catch(console.log);
    setShow(false);
    // navigate("/propertyInfo", { state: { info: { property: inputFields } } });
  };
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setError(false);
  };
  const handleShow = () => setShow(true);
  return (
    <Container className="mt-5">
      <div className="m-3 fs-1 fw-bold font d-flex justify-content-center">
        Enter your details
      </div>
      <hr />
      <Form className="ps-5 pe-5">
        <Form.Group className="mb-3">
          <Row className="mt-2">
            <Col>
              <FloatingLabel label="First Name">
                <Form.Control
                  placeholder="First Name"
                  name="first_name"
                  onChange={updateData}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label="Last Name">
                <Form.Control
                  placeholder="State"
                  name="last_name"
                  onChange={updateData}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Form.Label className="mt-3 fs-3 font">
            Personal Information
          </Form.Label>
          <FloatingLabel label="Email Address">
            <Form.Control
              placeholder="Email Address"
              type="email"
              name="email"
              onChange={updateData}
            />
          </FloatingLabel>
          <Row className="mt-2">
            <Col>
              <FloatingLabel label="Phone Number">
                <Form.Control
                  placeholder="Phone Number"
                  name="phone_num"
                  onChange={updateData}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label="Age">
                <Form.Control
                  placeholder="Age"
                  name="Age"
                  onChange={updateData}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Form.Label className="mt-3 fs-3 font">Password</Form.Label>
          <Row className="mt-2">
            <Col>
              <FloatingLabel label="Password">
                <Form.Control
                  placeholder="Password"
                  name="pwd"
                  type="password"
                  onChange={updateData}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label="ReType Password">
                <Form.Control
                  placeholder="P"
                  name="beds"
                  //   type="password"
                  //   onChange={updateData}
                />
              </FloatingLabel>
            </Col>
          </Row>
        </Form.Group>
        <hr />
        <div className="d-flex justify-content-center mb-5">
          <Button
            size="lg"
            variant="warning"
            onClick={handleShow}
            className="grow w-25"
          >
            <span className="font fw-bold">Submit</span>
          </Button>
        </div>
      </Form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure the information is correct? </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showError} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> There was an issue</Modal.Title>
        </Modal.Header>
        <Modal.Body> {errorMessage} </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Okay
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Register;
