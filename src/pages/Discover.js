import React, { useState, useEffect } from "react";
import FilterBar from "../components/FilterBar";
import Properties from "../components/Properties";

const Discover = () => {
  const [properties, setProperties] = useState([]);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    fetch("properties.json")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
      })
      .catch(console.log);
  }, []);

  return (
    <div className="">
      <div className="ms-5 me-5 mb-0">
        <FilterBar filterText={filterText} onFilterTextChange={setFilterText} />
        <Properties properties={properties} filterText={filterText} />
      </div>
    </div>

  );
};

export default Discover;
