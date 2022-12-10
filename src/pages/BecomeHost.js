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
import axios from "axios";
// import ImageUploading from "react-images-uploading";
const BecomeHost = () => {
  const [properties, setProperties] = useState([]);
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const updateUser = (e) => {
    userInfo.host = e.target.value == "on" ? true : false;
  };
  const handleHostSubmit = () => {
    localStorage.setItem("user", JSON.stringify(userInfo));
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    };
    fetch("http://localhost:3000/users?id=" + userInfo.id, requestOptions)
      .then(() => console.log())
      .catch(console.log);
    navigate("/becomeHost");
  };
  useEffect(() => {
    fetch("http://localhost:3000/properties")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data.map((d) => d.id.substring(1)));
      })
      .catch(console.log);
  }, []);

  const [inputFields, setInputFields] = useState({
    title: "",
    available: "yes",
    type: "",
    images: [],
    location: {
      address: "",
      city: "",
      state: "",
    },

    nightly_fee: {
      $numberDecimal: "",
    },
    service_fee: {
      $numberDecimal: "",
    },
    cleaning_fee: {
      $numberDecimal: "",
    },
    amenities: [],
    max_guests: "",
    beds: "",
    bedrooms: "",
    baths: "",
    description: "",
    hostID: "U1",
  });

  const updateData = (e) => {
    setInputFields({
      ...inputFields,
      [e.target.name]: e.target.value,
    });
  };
  const updateType = (e) => {
    console.log(e.target.value);
    setInputFields({
      ...inputFields,
      type: e.target.name,
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
  const propertyType = ["Mansion", "Adventurous", "Exotic", "Drip"];
  // PICTURE ////

  const [imageFiles, setImageFiles] = useState({
    file: [],
    filepreview: null,
  });

  const handleImages = (event) => {
    setImageFiles({
      ...imageFiles,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });

  }

  const submitImages = async () => {
    const formdata = new FormData();
    formdata.append('file', imageFiles.file);

    // axios.post("http://localhost:3000/imageupload", formdata, {
    //   headers: { "Content-Type": "multipart/form-data" }
    // })
    const response = await fetch('http://localhost:3000/imageupload', {
      method: 'POST',
      body: formdata,
    })
      
    console.log("SUCCESS")
    
  }
  // const handleImages = (e) => {
  //   setInputFields({
  //     ...inputFields,
  //     images: [...inputFields.images, e.target.value],
  //   });
  // };

  // const uploadFile = (event) => {
  //   const data = new FormData() ;
  //   data.append('file', event.target.files[0]);
  //   axios.post("${apiUrl}/uploadFileAPI", data)
  //       .then(res => { // then print response status
  //         console.log(res.statusText)
  //       })
  // }

  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleSubmit = () => {
    // console.log(inputFields);
    var num_id = (Math.floor(Math.random() * 100) + 1).toString();
    while (properties.includes(num_id)) {
      num_id = (Math.floor(Math.random() * 100) + 1).toString();
    }
    // console.log(num_id);
    submitImages()
    // const requestOptions = {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(inputFields),
    // };
    // fetch(
    //   "http://localhost:3000/properties?id=P" + num_id.toString(),
    //   requestOptions
    // )
    //   .then(() => console.log(inputFields))
    //   .catch(console.log);
    // setShow(false);
    // navigate("/propertyInfo", { state: { info: { property: inputFields } } });
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let user = localStorage.getItem("user");
  if (!user) {
    return (
      <Container className="mt-5 profile-content mb-5 p-5">
        <Row>
          <div className="m-3 fs-3 fw-bold font d-flex justify-content-center">
            Please log in to account first
          </div>
          <div className="d-flex justify-content-center">
            <Button
              size="md"
              variant="primary"
              className="grow w-25"
              onClick={handleLogin}
            >
              <span className="font fw-bold">Login</span>
            </Button>
          </div>
        </Row>
      </Container>
    );
  } else if (JSON.parse(user)["host"] == false) {
    return (
      <Container className="mt-5 profile-content mb-5 p-5">
        <Row className="d-flex justify-content-center">
          <p className="fs-3 fw-bold font d-flex justify-content-center">
            You will need to sign up for a Host Account
          </p>
          <Form className="fs-3 fw-bold font d-flex justify-content-center">
            <Form.Label className="mt-3 fs-3 font">
              Want to be a Host? &nbsp;{" "}
              <input
                type="checkbox"
                name="host"
                onChange={updateUser}
                style={{ transform: "scale(1.5)" }}
              />
            </Form.Label>
          </Form>
          <Button
            size="md"
            variant="primary"
            className="grow w-25"
            onClick={handleHostSubmit}
          >
            <span className="font fw-bold">Submit</span>
          </Button>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="mt-5 profile-content mb-5 p-5">
      <div className="m-3 fs-1 fw-bold font d-flex justify-content-center">
        Add your property
      </div>
      <hr />
      <Form className="ps-5 pe-5">
        <Form.Group className="mb-3">
          <FloatingLabel label="Title">
            <Form.Control
              placeholder="Title"
              name="title"
              onChange={updateData}
            />
          </FloatingLabel>
          <Form.Label className="mt-3 fs-3 font">Location Detail</Form.Label>
          <FloatingLabel label="Street Address">
            <Form.Control
              placeholder="Street address"
              name="address"
              onChange={handleAddress}
            />
          </FloatingLabel>
          <Row className="mt-2">
            <Col>
              <FloatingLabel label="City">
                <Form.Control
                  placeholder="City"
                  name="city"
                  onChange={handleAddress}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label="State">
                <Form.Control
                  placeholder="State"
                  name="state"
                  onChange={handleAddress}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Form.Label className="mt-3 fs-3 font">
            Property Information
          </Form.Label>
          <div key={`inline-radio`} className="mb-3">
            <Form.Check
              inline
              label={propertyType[0]}
              name="group"
              value={propertyType[0]}
              type="radio"
              onChange={updateType}
            />
            <Form.Check
              inline
              label={propertyType[1]}
              name="group"
              value={propertyType[1]}
              type="radio"
              onChange={updateType}
            />
            <Form.Check
              inline
              label={propertyType[2]}
              name="group"
              value={propertyType[2]}
              type="radio"
              onChange={updateType}
            />
            <Form.Check
              inline
              label={propertyType[3]}
              name="group"
              value={propertyType[3]}
              type="radio"
              onChange={updateType}
            />
          </div>
          <Row className="mt-2">
            <Col>
              <FloatingLabel label="Max Guests">
                <Form.Control
                  placeholder="Max Guests"
                  name="max_guests"
                  onChange={updateData}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label="Beds">
                <Form.Control
                  placeholder="Beds"
                  name="beds"
                  onChange={updateData}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label="Bedrooms">
                <Form.Control
                  placeholder="Bedrooms"
                  name="bedrooms"
                  onChange={updateData}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label="Baths">
                <Form.Control
                  placeholder="Baths"
                  name="baths"
                  onChange={updateData}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <FloatingLabel label="Description" className="mt-3">
            <Form.Control
              as="textarea"
              placeholder="Description"
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
                  placeholder="Nightly Fee"
                  name="nightly_fee"
                  onChange={updatePrice}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label="Service Fee">
                <Form.Control
                  placeholder="Service Fee"
                  name="service_fee"
                  onChange={updatePrice}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label="Cleaning Fee">
                <Form.Control
                  placeholder="Cleaning Fee"
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
                      type="checkbox"
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
                      type="checkbox"
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
                      type="checkbox"
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
                      type="checkbox"
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
          <Form.Label className="mt-3 fs-3 font">Pictures</Form.Label>
          <div>
            {inputFields.images.map((item) => (
              <div>
                <p>
                  {item}
                  {/* <img alt="not fount" width={"250px"} src={URL.createObjectURL({item})} />
                  <br /> */}
                  <button onClick={() => setInputFields.images.item(null)}>
                    Remove
                  </button>
                </p>
              </div>
            ))}
            {/* {selectedImage && (
                <div>
                <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                <br />
                <button onClick={()=>setSelectedImage(null)}>Remove</button>
                </div>
              )} */}
            <input type="file" id="image" onChange={handleImages} />
            {imageFiles.filepreview !== null ?
              <img className="previewimg" src={imageFiles.filepreview} style={{"width": "300px"}} alt="UploadImage" />
              : null}

            {/* <input
                type="file"
                name="myImage"
                onChange={(event) => {
                  console.log(event.target.files[0]);
                  setSelectedImage(event.target.files[0]);
                }}
              /> */}
          </div>
        </Form.Group>
        <hr />
        <div className="d-flex justify-content-center mb-5">
          <Button
            size="lg"
            variant="primary"
            onClick={handleShow}
            className="grow w-25"
          >
            <span className="font fw-bold">Submit</span>
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

export default BecomeHost;
