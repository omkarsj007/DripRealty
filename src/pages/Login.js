import React from "react";
import { Container, Form, FloatingLabel, Button } from "react-bootstrap";
const Login = () => {

  fetch('http://localhost:3000/login', {
          method: "POST",
          headers : { 
            'Content-Type': 'application/json',
             'Accept': 'application/json'
          },
          body: JSON.stringify( {  // you will get user information from login form

            "email": "supremeoverlord@someplace.com",
            "password": "<Hashed-Value>",

          } )
        })
        .then( res => res.json() )
        .then( (data) => { 
            console.log(data);

            // let inMemoryToken = data.token;
            // console.log(inMemoryToken);

            localStorage.setItem('user', JSON.stringify(data));

            
        })
        .catch((error) => {
          console.log(error.message);
        
        });


        //request to a protected route
        // const localstorage_user = JSON.parse(localStorage.getItem('user'))
        // console.log(localstorage_user)
        // fetch( "http://localhost:3000/welcome/", {
        //     method: 'get',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json',
        //         'x-auth-token': localstorage_user.email
                
        //     }

        // })
        // .then( res => res.json() )
        // .then( res => console.log( res ) );

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
