import React, { useState, useEffect } from "react";
import { Container, Row, Modal, Button } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Link, useNavigate } from "react-router-dom";
import "../components/styles/mystyles.css";

const ReservationCard = (props) => {
  const [properties, setProperty] = useState({});
  console.log(props.reservation.listing_id);
  useEffect(() => {
    fetch("http://localhost:3000/properties?id=" + props.reservation.listing_id)
      .then((res) => res.json())
      .then((data) => {
        setProperty(data[0]);
        console.log(data[0]["images"][0]);
        console.log(properties);
      })
      .catch(console.log);
  }, []);

  const deleteReservation = () => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(
      "http://localhost:3000/reservations?id=" + props.reservation.id,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          props.setErrorMessage(data.error);
          props.setError(true);
        } else {
          props.setDelete(props.reservation.id);
        }
      })
      .catch(console.log);

    // fetch("http://localhost:3000/reservations")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     let a = data.filter((r) => r.customer_id == props.reservation.customer_id)
    //     props.setReservation(a);
    //   })
    //   .catch(console.log);
  };

  let property = properties["images"];
  if (property == null) {
    property = "";
  } else {
    property = properties["images"][0];
  }
  return (
    <Container>
      <div className="card-list mb-2 grow" style={{ height: "6rem" }}>
        <img
          className="cover rounded shadows"
          src={property}
          alt="background"
          loading="lazy"
        />
        <p
          className="centered font text-shadow fs-3 ps-5 "
          style={{ color: "white" }}
        >
          {properties.title}&nbsp;
        </p>
        <p
          className="right font text-shadow fs-3 ps-5"
          style={{ color: "white" }}
        >
          {props.reservation.dateStart} - {props.reservation.dateEnd}
        </p>
        <OverlayTrigger placement="right" overlay={<Tooltip>Remove</Tooltip>}>
          <i
            className="bi bi-trash btn-centered fs-2 edit-link"
            style={{ color: "white" }}
            onClick={deleteReservation}
          ></i>
        </OverlayTrigger>
      </div>
    </Container>
  );
};

const Reservations = (props) => {
  const [reservations, setReservations] = useState([]);
  const [info] = useState(JSON.parse(localStorage.getItem("user")));
  const [deleteRes, setDelete] = useState("");
  const [showError, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = () => {
    setShow(false);
    setError(false);
  };

  const fruits = ["Apple", "Mango", "Banana", "GFG"];

  // Some styling for the items
  const styles = {
    backgroundColor: "white",
    width: "50px",
    marginBottom: "10px",
    padding: "10px",
    color: "green",
    boxShadow: "rgb(0,0,0,0.44) 0px 5px 5px",
  };

  useEffect(() => {
    fetch("http://localhost:3000/reservations")
      .then((res) => res.json())
      .then((data) => {
        let a = data.filter((r) => r.customer_id == info.id);
        setReservations(a);
      })
      .catch(console.log);
  }, [deleteRes]);
  const navigate = useNavigate();
  console.log(reservations);
  console.log(info.id);
  var list = reservations.map((x) => {});

  return (
    // reservations.map(fruit => <div
    //     style={styles}></div>)
    <Container>
      <div className="m-5">
        <p className="font fw-bold fs-1 m-5">Your Reservations</p>
        <Row className="m-5">
          {reservations.map((x, i) => (
            <ReservationCard
              key={i}
              reservation={x}
              setReservation={setReservations}
              setDelete={setDelete}
              setError={setError}
              setErrorMessage={setErrorMessage}
            />
          ))}
        </Row>
        <Row>
          <Link to="/profile">
            <div className="d-flex justify-content-center mb-5">
              <Button size="lg" variant="primary" className="grow w-25">
                <span className="font fw-bold">Go back</span>
              </Button>
            </div>
          </Link>
        </Row>
      </div>

      <Modal show={showError} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> {errorMessage}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Okay
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Reservations;
