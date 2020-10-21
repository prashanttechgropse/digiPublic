import React from "react";
import Form from "./form/form";
import Joi from "joi-browser";
import * as registerServices from "../services/registerServices";
import { Link } from "react-router-dom";

class BankDetails extends Form {
  state = {
    formData: {
      bankName: "",
      accountNo: "",
      accountType: "",
      branchCode: "",
    },
    selectedFile: null,
    errors: {},
  };

  schema = {
    bankName: Joi.string().required(),
    accountNo: Joi.string().required(),
    accountType: Joi.string().required(),
    branchCode: Joi.string().required(),
  };

  validateOnSubmit = () => {
    const result = Joi.validate(this.state.formData, this.schema, {
      abortEarly: false,
    });
    if (!result.error && this.state.selectedFile !== null) return null;
    const errors = {};
    if (result.error) {
      for (let item of result.error.details) {
        errors[item.path[0]] = item.message;
      }
      return errors;
    }
    if (this.state.selectedFile === null) {
      const errors = {};
      errors.selectedFile = "upload file";
      return errors;
    }
  };

  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
    const errors = { ...this.state.errors };
    if (errors.selectedFile) {
      delete errors.selectedFile;
    }
    this.setState({ errors });
  };

  doSubmit = async () => {
    const formData = new FormData();
    for (const item in this.state.formData) {
      formData.append(item, this.state.formData[item]);
    }

    formData.append(
      "myFile1",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    const { data, error } = await registerServices.uploadBankDetails(formData);
    if (data) {
      return await this.props.history.push(`/login`);
    }
    if (error) {
      return;
    }
  };

  componentWillUnmount() {
    window.location.reload();
  }

  render() {
    return (
      <React.Fragment>
        <div className="page">
          <div className="container-fluid">
            <div className="row no-gutter">
              <div className="col-md-12 col-lg-12 col-xl-12 bg-white">
                <div className="login d-flex align-items-center py-2 p-top-50">
                  <div className="container p-0">
                    <div className="row">
                      <div className="col-md-12 col-lg-12 col-xl-12 mx-auto">
                        <div className="card-sigin">
                          <div className="mb-2 d-flex">
                            <Link>
                              <img
                                src="/common/img/logo/logo.png"
                                className="sign-favicon"
                                alt="logo"
                              />
                            </Link>
                          </div>
                          <div className="card-sigin">
                            <div className="main-signup-header">
                              <h2>Submit Your Bank Detail</h2>
                              <h5 className="font-weight-semibold mb-4">
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text
                              </h5>
                              <form>
                                <div className="row">
                                  <div className="col-md-6">
                                    {this.renderInput("bankName", "Bank Name")}
                                  </div>
                                  <div className="col-md-6">
                                    {this.renderInput(
                                      "accountNo",
                                      "Account No."
                                    )}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-6">
                                    {this.renderInput(
                                      "accountType",
                                      "Account Type"
                                    )}
                                  </div>
                                  <div className="col-md-6">
                                    {this.renderInput(
                                      "branchCode",
                                      "Branch code"
                                    )}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <label>Upload Document</label>
                                      <input
                                        type="file"
                                        className="dropify"
                                        data-height="200"
                                        onChange={this.onFileChange}
                                      />
                                    </div>
                                    {this.state.errors.selectedFile && (
                                      <div className="alert alert-danger">
                                        {this.state.errors.selectedFile}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-12">
                                    <a
                                      href="#setupprofile"
                                      className="btn btn-main-primary btn-block"
                                      data-toggle="modal"
                                    >
                                      Submit Profile
                                    </a>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal effect-flip-vertical" id="setupprofile">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content modal-content-demo">
              <div className="modal-header">
                <h6 className="modal-title">Your Detail</h6>
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body ">
                <h6 className="text-center">
                  “Thank you for Application.
                  <br /> Once approved you will be notified by email”.
                </h6>
                <div className="setup-details">
                  <p>
                    User type
                    <span className="pull-right">
                      {this.props.match.params.profileType}
                    </span>
                  </p>
                  <p>
                    Organization type
                    <span className="pull-right">
                      {this.props.match.params.organisationType}
                    </span>
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                {this.renderButton(
                  "Confirm",
                  this.handleSubmit,
                  "btn ripple btn-primary btn-block",
                  () => {
                    return false;
                  }
                )}
              </div>
            </div>
          </div>{" "}
        </div>
      </React.Fragment>
    );
  }
}

export default BankDetails;
