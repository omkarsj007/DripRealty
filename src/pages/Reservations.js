import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Link, useNavigate } from "react-router-dom";
import "../components/styles/mystyles.css";

const ReservationCard = (props) =>{

    const deleteReservation = () => {
        const requestOptions = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            
          };
          fetch("http://localhost:3000/reservations?id=" + props.reservation.id, requestOptions)
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              console.log(data.error);
              props.setErrorMessage(data.error);
              props.setError(true);
            }
            else{
              props.setDelete(props.reservation.id)
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
          
    }
    return(
        <Container>
            <div className="card-list mb-2 grow" style={{ height: "6rem" }}>
                <img
                className="cover rounded shadows"
                src='https://media.istockphoto.com/id/534761709/photo/reserved-sign-on-restaurant-table.jpg?s=612x612&w=0&k=20&c=q3Jy3s-Cyqeq6MAVWC0vYPVIsNOdZHHxjJIBju1jCw0='
                alt="background"
                loading="lazy"
                />
                
                <p
                className="centered font text-shadow fs-3 ps-5 edit-link`"
                style={{ color: "white" }}
               
                >
                <pre style={{ color: "white" }}>
                {props.reservation.listing_id}      {props.reservation.dateStart} - {props.reservation.dateEnd}
                </pre>
                

                </p>
                <OverlayTrigger placement="right" overlay={<Tooltip>Remove</Tooltip>}>
                <i
                    className="edit-link bi bi-trash btn-centered fs-2"
                    style={{ color: "white" }}
                    onClick={deleteReservation}
                ></i>
                </OverlayTrigger>
            </div>
        </Container>
    )
}

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
            let a = data.filter((r) => r.customer_id == info.id)
            setReservations(a);
          })
          .catch(console.log);
      }, [deleteRes]);
    const navigate = useNavigate();
    console.log(reservations)
    console.log(info.id)
    var list = reservations.map(x => {
        });

    return (
        // reservations.map(fruit => <div
        //     style={styles}></div>)
        <Container>
           <div className="m-5">
            <p className="font fw-bold fs-1 m-5">Your Reservations</p>
            <Row className="m-5">
                {reservations.map((x, i) => (<ReservationCard key={i} reservation={x} setReservation={setReservations} setDelete={setDelete} setError={setError} setErrorMessage={setErrorMessage}/>))}  
            </Row>
        </div>
        </Container>
       
        
        
        )

  };
  
  export default Reservations;