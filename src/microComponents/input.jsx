import React from "react";
const Input = ({ name, value, error, label, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        value={value}
        id={name}
        name={name}
        className="form-control"
        placeholder={`Enter your ${label}`}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
