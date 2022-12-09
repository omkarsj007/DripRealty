import React from "react";
import { Form } from "react-bootstrap";

const FilterBar = (props) => {
  const propertyType = ["Mansion", "Adventurous", "Exotic", "Drip"];
  return (
    <form
      className="d-flex align-items-center flex-column input-group input-group-lg pt-3"
      role="search"
    >
      <input
        className="form-control m-2 w-50 bg-light text-dark "
        type="search"
        placeholder="Search by "
        aria-label="Search"
        value={props.filterText}
        onChange={(e) => props.onFilterTextChange(e.target.value)}
      />
      <div key={`inline-radio`} className="m-3">
        <Form.Check
          inline
          label="None"
          name="group"
          value=""
          type="radio"
          onChange={(e) => props.onFilterType(e.target.value)}
        />
        <Form.Check
          inline
          label={propertyType[0]}
          name="group"
          value={propertyType[0]}
          type="radio"
          onChange={(e) => props.onFilterType(e.target.value)}
        />
        <Form.Check
          inline
          label={propertyType[1]}
          name="group"
          value={propertyType[1]}
          type="radio"
          onChange={(e) => props.onFilterType(e.target.value)}
        />
        <Form.Check
          inline
          label={propertyType[2]}
          name="group"
          value={propertyType[2]}
          type="radio"
          onChange={(e) => props.onFilterType(e.target.value)}
        />
        <Form.Check
          inline
          label={propertyType[3]}
          name="group"
          value={propertyType[3]}
          type="radio"
          onChange={(e) => props.onFilterType(e.target.value)}
        />
      </div>
    </form>
  );
};

export default FilterBar;
