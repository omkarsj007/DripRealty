import React from "react";
import { Container, Form, FloatingLabel, Button } from "react-bootstrap";
const Login = () => {
  return (
    <Container>
      <Form className="ps-5 pe-5">
        <Form.Group className="mb-3">
          <FloatingLabel label="Username">
            <Form.Control
              placeholder="Title"
              name="title"
              //   onChange={updateData}
            />
          </FloatingLabel>
          <FloatingLabel label="Password">
            <Form.Control
              placeholder="Title"
              name="title"
              //   onChange={updateData}
            />
          </FloatingLabel>
          <Button>Login</Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Login;
