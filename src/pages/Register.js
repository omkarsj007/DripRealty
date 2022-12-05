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
  const [error, setError] = useState(false)
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
    join_date: new Date().toLocaleDateString()
    ,
    favorites: []
  });

  const updateData = (e) => {
    setInputFields({
      ...inputFields,
      [e.target.name]: e.target.value,
    });
  };

//   const handleAddress = (e) => {
//     setInputFields({
//       ...inputFields,
//       location: {
//         ...inputFields.location,
//         [e.target.name]: e.target.value,
//       },
//     });
//   };

//   const updatePrice = (e) => {
//     setInputFields({
//       ...inputFields,
//       [e.target.name]: { $numberDecimal: e.target.value },
//     });
//   };

//   const handleAmenities = (e) => {
//     if (e.target.checked) {
//       setInputFields({
//         ...inputFields,
//         amenities: [...inputFields.amenities, e.target.name],
//       });
//     } else {
//       setInputFields({
//         ...inputFields,
//         amenities: [
//           inputFields.amenities.filter((item) => item !== e.target.name),
//         ],
//       });
//     }
//   };
//   const topAmenities = [
//     "A pool",
//     "Wifi",
//     "A kitchen",
//     "Free parking",
//     "A jacuzzi",
//     "A washer or dryer",
//     "Air conditioning or heating",
//     "Self check-in",
//     "Laptop-friendly workspace",
//     "Pets allowed",
//   ];

//   const safetyAmenities = [
//     "Carbon monoxide alarm",
//     "Smoke alarm",
//     "Fire extinguisher",
//     "First-aid kit",
//     "Emergency plan and local numbers",
//   ];

//   const basicAmenities = [
//     "Toilet paper",
//     "Soap for hands and body",
//     "One towel per guest",
//     "Linens for each bed",
//     "One pillow per guest",
//     "Cleaning supplies",
//   ];

//   const extraAmenities = [
//     "Toiletries",
//     "Cleaning supplies",
//     "Dining basics",
//     "Wine glasses",
//     "Cooking supplies",
//     "Drinks",
//     "Snacks",
//     "Hangers",
//     "Adapters and chargers",
//     "Laptop-friendly workspace",
//     "Good lighting",
//     "Office supplies",
//   ];
  const navigate = useNavigate();

  const handleSubmit = () => {
    // console.log(inputFields);
    // var num_id = (Math.floor(Math.random() * 100) + 1).toString();
    // while (properties.includes(num_id)) {
    //   num_id = (Math.floor(Math.random() * 100) + 1).toString();
    // }
    // console.log(num_id);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputFields),
    };
    fetch(
      "http://localhost:3000/register",
      requestOptions
    )
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        if(data.error){
            console.log(data.error)
            alert(data.error)
            return(
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure the information is correct? </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                    </Modal.Footer>
                </Modal>
            )
        }
        else{
            localStorage.setItem('user', data)
            console.log(data)
        }
        
      })
      .catch(console.log);
    setShow(false);
    // navigate("/propertyInfo", { state: { info: { property: inputFields } } });
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
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
          <Form.Label className="mt-3 fs-3 font">Personal Information</Form.Label>
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
          <Form.Label className="mt-3 fs-3 font">
            Password
          </Form.Label>
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
          <Button size="lg" variant="primary" onClick={handleShow}>
            Submit
          </Button>
        </div>
      </Form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure the information is correct? </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Register;
