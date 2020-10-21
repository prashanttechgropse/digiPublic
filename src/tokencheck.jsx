import React from "react";
import Form from "./macroComponents/form/form";
import httpService from "./services/httpService";

class Tokencheck extends Form {
  state = {};
  schema = {};

  doSubmit() {
    httpService.post(`${process.env.REACT_APP_APIENDPOINT}/setUpprofile`);
  }
  render() {
    return <div>{this.renderButton("tokenCheck", this.handleSubmit)}</div>;
  }
}

export default Tokencheck;
