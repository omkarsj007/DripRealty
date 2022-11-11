import React, { useState, useEffect } from "react";

const Test = () => {
  const [properties, setProperties] = useState([]);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((res) => res.json())
      .then((data) => {
        setProperties(JSON.stringify(data, null, 2));
      })
      .catch(console.log);
  }, []);

  return (
    <div className="">
      <div className="ms-5 me-5 mb-0">{properties}</div>
    </div>
  );
};

export default Test;
