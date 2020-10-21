import React from "react";
import Form from "./form/form";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import * as registerService from "../services/registerServices";

class CreateAccount extends Form {
  state = {
    formData: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    errors: {},
  };
  schema = {
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string().required().min(8),
    confirmPassword: Joi.string().required().min(8),
  };

  validateOnSubmit = () => {
    const result = Joi.validate(this.state.formData, this.schema, {
      abortEarly: false,
    });
    if (
      !result.error &&
      this.state.formData.confirmPassword === this.state.formData.password
    )
      return null;
    if (result.error) {
      const errors = {};
      for (let item of result.error.details) {
        errors[item.path[0]] = item.message;
      }
      return errors;
    }
    if (this.state.formData.confirmPassword !== this.state.formData.password) {
      const errors = {};
      errors.confirmPassword = "password mismatch";
      return errors;
    }
  };

  validateOnChange = (input) => {
    const obj = { [input.name]: input.value };
    const subSchema = { [input.name]: this.schema[input.name] };
    const { error } = Joi.validate(obj, subSchema);
    if (
      !error &&
      this.state.formData.confirmPassword === this.state.formData.password
    )
      return null;
    if (error) {
      return error.details[0].message;
    }
    if (
      input.name === "confirmPassword" &&
      input.value !== this.state.formData.password
    ) {
      return "password mismatch";
    }
  };

  doSubmit = async () => {
    const { error } = await registerService.createAccount(this.state.formData);
    if (error) return;
    this.props.submitEmail(this.state.formData.email);
    this.props.history.push(`/register/otpVerification`);
  };

  render() {
    return (
      <React.Fragment>
        <div className="page">
          <div className="container-fluid">
            <div className="row no-gutter">
              <div className="col-md-6 col-lg-6 col-xl-7 d-none d-md-flex bg-primary-transparent">
                <div className="row wd-100p mx-auto text-center">
                  <div className="col-md-12 col-lg-12 col-xl-12 my-auto mx-auto wd-100p">
                    <img
                      src="/common/img/backgrounds/login.png"
                      className="my-auto ht-xl-80p wd-md-100p wd-xl-80p mx-auto"
                      alt="logo"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-6 col-xl-5 bg-white">
                <div className="login d-flex align-items-center py-2">
                  <div className="container p-0">
                    <div className="row">
                      <div className="col-md-10 col-lg-10 col-xl-9 mx-auto">
                        <div className="card-sigin">
                          <div className="mb-2 d-flex">
                            <Link to="#">
                              <img
                                src="/common/img/logo/logo.png"
                                className="sign-favicon"
                                alt="logo"
                              />
                            </Link>
                          </div>
                          <div className="card-sigin">
                            <div className="main-signup-header">
                              <h2>Get Started</h2>
                              <h5 className="font-weight-semibold mb-4">
                                It's free to signup and only takes a minute.
                              </h5>
                              <form>
                                {this.renderInput("email", "Email")}
                                {this.renderInput(
                                  "password",
                                  "Password",
                                  "password"
                                )}
                                {this.renderInput(
                                  "confirmPassword",
                                  "Confirm Password",
                                  "password"
                                )}

                                {this.renderButton(
                                  "Sign Up",
                                  this.handleSubmit
                                )}

                                <div className="row row-xs">
                                  <div className="col-sm-6">
                                    <button className="btn btn-block">
                                      <i className="fa fa-facebook"></i> Signup
                                      with Facebook
                                    </button>
                                  </div>
                                  <div className="col-sm-6 mg-t-10 mg-sm-t-0">
                                    <button className="btn btn-danger btn-block">
                                      <i className="fa fa-google"></i> Signup
                                      with Google
                                    </button>
                                  </div>
                                </div>
                              </form>
                              <div className="main-signin-footer mt-5">
                                <p>
                                  Already have an account?{" "}
                                  <Link to="/login">Sign In</Link>
                                </p>
                              </div>
                              <div className="main-signin-footer mt-5">
                                <p>
                                  Click to Sign up as a Secondary User
                                  <Link to="/register/receiver">
                                    {" Secondary User Sign Up"}
                                  </Link>
                                </p>
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
        </div>
      </React.Fragment>
    );
  }
}

export default CreateAccount;
