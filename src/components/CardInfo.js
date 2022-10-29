import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const CardInfo = (props) => {
  const money = (number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(number);
  };
  return (
    <Card style={{ height: "30rem" }}>
      <Card.Header className="fs-2 mb-3 fw-bold"> <span className="ms-5">Reserve Now</span></Card.Header>
      <Card.Body className="ms-5 me-5 mb-5">
        <Card.Subtitle className="mb-3 text-muted fw-bold">1 night cost</Card.Subtitle>
        <Card.Text>
         <div className="d-flex justify-content-between">
            <div>
              <h3 className="fs-4 mb-2"> Nightly fee</h3>
            </div>
            <div>
            <p className="fs-4">
              {money(props.fees.property.nightly_fee)}
            </p>
            </div>
         </div>
         <div className="d-flex justify-content-between">
            <div>
              <h3 className="fs-4 mb-2"> Cleaning fee</h3>
            </div>
            <div>
            <p className="fs-4">
              {money(props.fees.property.cleaning_fee)}
            </p>
            </div>
         </div>
         <div className="d-flex justify-content-between">
            <div>
              <h3 className="fs-4 mb-2"> Services fee</h3>
            </div>
            <div>
            <p className="fs-4">
              {money(props.fees.property.service_fee)}
            </p>
            </div>
         </div>
        <hr/>
        <div className="d-flex justify-content-between">
            <div>
              <h3 className="fw-bold fs-4 mb-2">Total before taxes</h3>
            </div>
            <div>
            <p className="fw-bold fs-4">
              {money((props.fees.property.nightly_fee)+(props.fees.property.cleaning_fee)+(props.fees.property.service_fee))}
            </p>
            </div>
         </div>
        </Card.Text>
        <Button variant="primary" className="btn btn-lg w-100 btn-warning text-black">Reserve</Button>
      </Card.Body>
    </Card>
  );
};

export default CardInfo;
