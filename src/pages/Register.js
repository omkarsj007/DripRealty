import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  FloatingLabel,
  Accordion,
  Modal
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [properties, setProperties] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({})
  const [showError, setError] = useState(false);
  const [passwordC, setPasswordConfirm] = useState("");

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
    pwdConfirm: "",
    phone_num: "",
    Age: "",
    join_date: new Date().toLocaleDateString(),
    favorites: [],
    host: false
  });

  const validate = (target, value) => {
    let errors = fieldErrors
    if(target == "first_name")
    {
      if(!value.match(/^[A-Za-z]+$/)){
        errors[0] = "First name must have letters only"
      }
      else
      {
        delete errors[0];
      }
    }
    
    if(target == "last_name")
    {
      if(!value.match(/^[A-Za-z]+$/)){
        errors[1] = "Last name must have letters only"
      }
      else
      {
        delete errors[1];
      }
    }
    if(target == "email")
    {
      if(!value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        errors[2] = "Email must have format: {prefix}@{domain_part1}.{domain_part2}"
      }
      else
      {
        delete errors[2];
      }
    }
    if(target == "phone_num")
    {
      errors[3] = "Phone number must have 10 digits"
      if(!value.match(/^\d{10}$/)){
        errors[3] = "Phone number must have 10 digits"
      }
      else
      {
        delete errors[3];
      }
    }
    if(target == "Age")
    {
      if(!value.match(/^1[8-9]|^[2-9][0-9]$/)){
        errors[4] = "Please enter valid age in range 18 - 99"
      }
      else
      {
        delete errors[4];
      }
    }
    if(target == "pwd")
    {
      if(!value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)){
        errors[5] = "Password must have minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
      }
      else
      {
        delete errors[5];
      }
    }
    // if(target == "pwdConfirm")
    // {
    //   console.log(inputFields["pwd"])
    //   console.log(value)
    //   if(!(value == inputFields["pwd"])){
    //     errors[6] = "Confirm Password value must be same as Password"
    //     console.log("hello")
    //   }
    //   else
    //   {
    //     delete errors[6];
    //   }
    // }
    return errors
    
  }

  const updateData = (e) => {
    setInputFields({
      ...inputFields,
      [e.target.name]: e.target.value,
    });
    
    setFieldErrors(validate(e.target.name, e.target.value))
    // console.log(fieldErrors)
  };

  const passwordConfirm = (e) =>{
    setFieldErrors(validate(e.target.name, e.target.value))
  }

  const navigate = useNavigate();

  const handleSubmit = () => {
    
    if(inputFields["pwd"] != inputFields["pwdConfirm"]){
      setErrorMessage("Password does not match Confirm Password");
      setError(true);
      return;
    }
    delete inputFields["pwdConfirm"];
    inputFields["host"] = inputFields["host"] == "on" ? true: false
    console.log(inputFields)
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
          localStorage.setItem("user", JSON.stringify(data));
          console.log(localStorage.getItem("user"))
          setError(false);
          navigate("/profile");
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
      <div>
        {Object.values(fieldErrors).map((f, i) => <li style={{color:"red"}} key={i}>{f}</li> )}
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
              <FloatingLabel label="Confirm Password">
                <Form.Control
                  placeholder="Confirm Password"
                  name="pwdConfirm"
                  type="password"
                  onChange={updateData}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Form.Label className="mt-3 fs-3 font">Want to be a Host? &nbsp; <input type="checkbox" name="host" onChange={updateData} style={{transform: "scale(1.5)"}}/></Form.Label>
          <Row>
          
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
