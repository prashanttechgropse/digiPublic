import React from "react";
const SearchBar = ({ value, onChange }) => {
  return (
    <React.Fragment>
      <input
        type="text"
        name="query"
        className="form-control "
        placeholder="Search..."
        value={value}
        //onChange={(e) => onChange(e.currentTarget.value)}
      />
      <button className="btn">
        <i className="fa fa-search d-none d-md-block"></i>
      </button>
    </React.Fragment>
  );
};

export default SearchBar;
