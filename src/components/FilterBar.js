import React from "react";

const FilterBar = (props) => {
  return (
    <form className="d-flex align-items-center flex-column input-group input-group-lg mt-3" role="search">
      <input
        className="form-control m-2 w-50 bg-light text-dark "
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={props.filterText}
        onChange={(e) => props.onFilterTextChange(e.target.value)}
      />
    </form>
  );
};

export default FilterBar;
