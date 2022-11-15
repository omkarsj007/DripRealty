import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
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
  }, []);
  return (
    <Container>
      <div className="users">
        {comment
          .filter((filter) => {
            return filter.listing_id === props.propertyID;
          })
          .map((users) => (
            <CommentCard key={users.id} user={users} />
          ))}
      </div>
    </Container>
  );
};

export default CommentSection;
