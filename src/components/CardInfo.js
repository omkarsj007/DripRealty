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
    <Card style={{ height: "25rem" }}>
      <Card.Header className="fs-2 mb-3 fw-bold">
        <span className="ms-5">Reserve Now</span>
      </Card.Header>
      <Card.Body className="ms-5 me-5 mb-5">
        <Card.Subtitle className="mb-3 text-muted fw-bold">
          1 night cost
        </Card.Subtitle>
        <Card.Text className="d-flex justify-content-between">
          <span className="fs-4 mb-2"> Nightly fee</span>
          <span className="fs-4">
            {money(props.fees.property.nightly_fee["$numberDecimal"])}
          </span>
        </Card.Text>
        <Card.Text className="d-flex justify-content-between">
          <span className="fs-4 mb-2"> Cleaning fee</span>
          <span className="fs-4">
            {money(props.fees.property.cleaning_fee["$numberDecimal"])}
          </span>
        </Card.Text>
        <Card.Text className="d-flex justify-content-between">
          <span className="fs-4 mb-2"> Services fee</span>
          <span className="fs-4">
            {money(props.fees.property.service_fee["$numberDecimal"])}
          </span>
        </Card.Text>
        <Card.Text className="d-flex justify-content-between">
          <span className="fw-bold fs-4 mb-2">Total before taxes</span>
          <span className="fw-bold fs-4">
            {money(
              parseFloat(props.fees.property.nightly_fee["$numberDecimal"]) +
                parseFloat(props.fees.property.cleaning_fee["$numberDecimal"]) +
                parseFloat(props.fees.property.service_fee["$numberDecimal"])
            )}
          </span>
        </Card.Text>

        {/* <hr />

        <Button
          variant="primary"
          className="btn btn-lg w-100 mt-2 btn-warning text-black"
        >
          Reserve
        </Button> */}
      </Card.Body>
    </Card>
  );
};

export default CardInfo;
