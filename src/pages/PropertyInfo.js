import React, { useState, useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Button,
  FloatingLabel,
  Form,
  Modal,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import CardInfo from "../components/CardInfo";
import CommentSection from "../components/CommentSection";
import "../components/styles/mystyles.css";
// CALENDER //
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { set } from "mongoose";

const FavoritePage = (props) => {
  const handleClick = (event) => {
    // 👇️ toggle isActive state variable
    props.setActive((current) => !current);
    props.setClick(props.clicks + 1);
  };
  if (props.active) {
    return (
      <div>
        <button
          onClick={handleClick}
          className="favorite"
          style={{ width: "5rem", height: "5rem" }}
        >
          <i className="bi bi-heart-fill fs-1 primary-color"></i>
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <button
          onClick={handleClick}
          className="favorite"
          style={{ width: "5rem", height: "5rem" }}
        >
          <i className="bi bi-heart fs-1 primary-color"></i>
        </button>
      </div>
    );
  }
};
const PropertyInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [info] = useState(location.state.info);
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [update, setUpdate] = useState(0);
  const [comment, setComment] = useState("");
  // FOR MODAL
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // define check-in and check-out state
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  // define handler change function on check-in date
  const handleCheckInDate = (date) => {
    setCheckInDate(date);
    setCheckOutDate(null);
  };

  // define handler change function on check-out date
  const handleCheckOutDate = (date) => {
    setCheckOutDate(date);
  };

  const handleSubmit = () => {
    var num_id = "R" + (Math.floor(Math.random() * 100) + 1).toString();

    let reservation = {
      id: num_id,
      dateReserved: new Date().toLocaleDateString(),
      dateStart: checkInDate.toISOString().split("T")[0],
      dateEnd: checkOutDate.toISOString().split("T")[0],
      listing_id: info.property.id,
      host_id: info.property.hostID,
      customer_id: userInfo.id,
    };
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reservation),
    };
    fetch("http://localhost:3000/reservations?id=" + num_id, requestOptions)
      .then(() => console.log())
      .then(navigate("/profile"));
  };

  const money = (number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(number);
  };

  // COMMENT
  const updateComment = (e) => {
    setComment(e.target.value);
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  const updateRating = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleInsert = () => {
    var num_id = "C" + (Math.floor(Math.random() * 100000) + 1).toString();
    let comments = {
      id: num_id,
      dateCommented: new Date().toLocaleDateString(),
      listing_id: info.property.id,
      reviewer_id: userInfo.id,
      comments: userInfo.comments,
      rating: userInfo.rating,
    };

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comments),
    };
    fetch(
      "http://localhost:3000/comments?id=C" + info.property.id,
      requestOptions
    )
      .then(() => {
        setUpdate(update + 1);
      })
      .catch(console.log);
    // setShow(false);
    // navigate("/propertyInfo", { state: { info: { property: inputFields } } });
    setComment("");
  };

  // Favorites
  const [favorite, setFavorite] = useState(false);
  const [clicked, setClicked] = useState(0);
  // const [reservations, setReservations] = useState({});
  useEffect(() => {
    if (clicked != 0) {
      if (favorite) {
        userInfo.favorites.push(info.property.id);
      } else {
        userInfo.favorites = userInfo.favorites.filter(
          (filter) => filter !== info.property.id
        );
      }
      setUserInfo({
        ...userInfo,
        favorites: userInfo.favorites,
      });

      localStorage.setItem("user", JSON.stringify(userInfo));

      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      };
      fetch("http://localhost:3000/users?id=" + userInfo.id, requestOptions)
        .then(() => console.log())
        .catch(console.log);
    } else {
      let fav = userInfo.favorites.filter(
        (filter) => filter === info.property.id
      );
      if (fav.length != 0) {
        setFavorite(true);
      } else {
        setFavorite(false);
      }
    }
  }, [clicked]);

  var disableDates = [];
  useEffect(() => {
    fetch("http://localhost:3000/reservations")
      .then((res) => res.json())
      .then((data) => {
        let a = data.filter((r) => r.listing_id == info.property.id);
        return a;
      })
      .then((reservations) => {
        for (let x of reservations) {
          let startDate = new Date(x["dateStart"]);
          let endDate = new Date(x["dateEnd"]);
          startDate.setDate(startDate.getDate() + 1);
          endDate.setDate(endDate.getDate() + 1);
          let currDate = startDate;
          while (currDate <= endDate) {
            disableDates.push(new Date(currDate));
            currDate.setDate(currDate.getDate() + 1);
          }
        }
      })
      .catch(console.log);
  });

  return (
    <Container fluid className="font pt-5 bg-tertiary-color">
      <Container className="">
        <h1 className="fw-bold">{info.property.title}</h1>
        <p className="fs-5">
          Located in {info.property.location.city},{" "}
          {info.property.location.state}
        </p>
        <Row>
          <Col lg={6} style={{ height: "412px" }}>
            <img
              alt=""
              src={info.property.images[0]}
              className="cover rounded"
            />
          </Col>
          <Col lg={6}>
            <Row className="g-2">
              <Col
                lg={6}
                className="d-none d-lg-block"
                style={{ height: "200px" }}
              >
                <img
                  alt=""
                  src={info.property.images[1]}
                  className="cover rounded"
                  loading="lazy"
                />
              </Col>
              <Col
                lg={6}
                className="d-none d-lg-block"
                style={{ height: "200px" }}
              >
                <img
                  alt=""
                  src={info.property.images[2]}
                  className="cover rounded"
                />
              </Col>
            </Row>
            <Row className="g-2 mt-1">
              <Col
                lg={6}
                className="d-none d-lg-block"
                style={{ height: "200px" }}
              >
                <img
                  alt=""
                  src={info.property.images[3]}
                  className="cover rounded"
                />
              </Col>
              <Col
                lg={6}
                className="d-none d-lg-block"
                style={{ height: "200px" }}
              >
                <img
                  alt=""
                  src={info.property.images[4]}
                  className="cover rounded"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Container className="mt-3 mb-3 fs-5">
        <div style={{ float: "right" }}>
          <FavoritePage
            active={favorite}
            setActive={setFavorite}
            clicks={clicked}
            setClick={setClicked}
          />
        </div>
        <p className="fs-2">
          {money(info.property.nightly_fee["$numberDecimal"])}
          <span className="text-muted fs-5"> night</span>
        </p>
        <p className="fs-5">
          {info.property.max_guests} guests
          <i className="bi bi-dot" />
          {info.property.bedrooms} bedrooms
          <i className="bi bi-dot" />
          {info.property.beds} beds
          <i className="bi bi-dot" />
          {info.property.baths} baths
        </p>

        <hr />
        <Row>
          <Col lg={6} className="mb-5">
            <p className="fw-bold mb-3 fs-5"> Description</p>
            <p className="fs-4">{info.property.description}</p>
            <hr />
            <p className="fw-bold fs-4"> Amenities</p>
            <ul>
              {info.property.amenities.map((a, i) => (
                <li key={i} className="fs-5">
                  {a}
                </li>
              ))}
            </ul>
          </Col>
          <Col lg={6}>
            {/* RESERVE BUTTON */}
            <CardInfo fees={info} />
            <div className="d-flex justify-content-center">
              <Button
                variant="primary"
                className="btn btn-lg mt-2 btn-warning text-black grow"
                onClick={handleShow}
                style={{ width: "32rem" }}
              >
                <span className="fs-4 fw-bold">Reserve</span>
              </Button>
            </div>
          </Col>
        </Row>
        {/* MODAL CALENDER  */}
        <Modal
          dialogClassName="modal-20w"
          centered
          show={show}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Make Reservation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container className="d-flex justify-content-between">
              <div>
                <label>Check-in</label>
                <DatePicker
                  minDate={new Date()}
                  selected={checkInDate}
                  showYearDropdown
                  scrollableMonthYearDropdown
                  onChange={(date) => setCheckInDate(date)}
                  excludeDates={disableDates}
                />
              </div>
              <div>
                <label>Check-out</label>
                <DatePicker
                  minDate={new Date()}
                  selected={checkOutDate}
                  showYearDropdown
                  scrollableMonthYearDropdown
                  onChange={(date) => setCheckOutDate(date)}
                  excludeDates={disableDates}
                />
              </div>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Make reservation
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      <Container>
        <p className="fs-3 fw-bold">Comments</p>

        <div className="font fs-5 d-flex flew-row justify-content-left">
          <label className="pr-3">Rating:</label>
          <form>
            <input
              type="radio"
              value="1"
              id="1"
              onChange={updateRating}
              name="rating"
            />
            <label className="pr-2 pl-1">1</label>
            <input
              type="radio"
              value="2"
              id="2"
              onChange={updateRating}
              name="rating"
            />
            <label className="pr-2 pl-1">2</label>
            <input
              type="radio"
              value="3"
              id="3"
              onChange={updateRating}
              name="rating"
            />
            <label className="pr-2 pl-1">3</label>
            <input
              type="radio"
              value="4"
              id="4"
              onChange={updateRating}
              name="rating"
            />
            <label className="pr-2 pl-1">4</label>
            <input
              type="radio"
              value="5"
              id="5"
              onChange={updateRating}
              name="rating"
            />
            <label className="pr-2 pl-1">5</label>
          </form>
        </div>
        <Row className="g-2">
          <Col xs={10} md={10}>
            <Form>
              <FloatingLabel label="Post a comment...">
                <Form.Control
                  as="textarea"
                  placeholder="Post a comment..."
                  value={comment}
                  name="comments"
                  onChange={updateComment}
                  style={{ maxHeight: "10rem", minHeight: "6rem" }}
                />
              </FloatingLabel>
            </Form>
          </Col>
          <Col xs={8} md={2} style={{ float: "left" }}>
            <Button
              variant="outline-dark"
              className="w-75 grow"
              size="lg"
              onClick={handleInsert}
            >
              Submit
            </Button>
          </Col>
        </Row>
        <hr />
      </Container>
      <Container className="pb-5 p-0">
        <CommentSection propertyID={info.property.id} update={update} />
      </Container>
    </Container>
  );
};

export default PropertyInfo;
