import React, { Component } from "react";
class Label extends Component {
  render() {
    return (
      <div>
        <label>{this.props.name}</label>
        <span className="tx-medium">{this.props.value}</span>
      </div>
    );
  }
}

export default Label;
