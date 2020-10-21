import React from "react";
const TextArea = ({ name, value, error, label, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <textarea
        {...rest}
        value={value}
        id={name}
        name={name}
        className="form-control"
        placeholder={`write your ${name}`}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default TextArea;
