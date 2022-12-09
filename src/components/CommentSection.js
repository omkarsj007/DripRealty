import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import CommentCard from "./CommentCard";

const CommentSection = (props) => {
  const [comment, setComments] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/comments")
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
      })
      .catch(console.log);
  }, [props.update]);
  return (
    <Container>
      <Row xs={1} md={1} xxl={1} className="">
        <div className="">
          {comment
            .filter((filter) => {
              return filter.listing_id === props.propertyID;
            })
            .reverse()
            .map((users, index) => (
              <CommentCard key={index} user={users} />
            ))}
        </div>
      </Row>
    </Container>
  );
};

export default CommentSection;
