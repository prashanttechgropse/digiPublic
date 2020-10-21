import React from "react";
import { Link } from "react-router-dom";

import Form from "./form/form";
import Joi from "joi-browser";
import * as registerServices from "../services/registerServices";

class ResetPassword extends Form {
  state = {
    formData: {
      password: "",
      confirmPassword: "",
    },
    errors: {},
  };

  schema = {
    password: Joi.string().required().min(8),
    confirmPassword: Joi.string().required().min(8),
  };

  doSubmit = async () => {
    const { data } = await registerServices.resetPassword(this.state.formData);
    if (data) {
      this.props.history.replace(`/login`);
    }
  };

  render() {
    return (
      <div className="page">
        <div className="container-fluid">
          <div className="row no-gutter">
            <div className="col-md-6 col-lg-6 col-xl-7 d-none d-md-flex bg-primary-transparent">
              <div className="row wd-100p mx-auto text-center">
                <div className="col-md-12 col-lg-12 col-xl-12 my-auto mx-auto wd-100p">
                  <img
                    src="/common/img/backgrounds/reset.png"
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
                        <div className="main-card-signin d-md-flex">
                          <div className="wd-100p">
                            <div className="main-signin-header">
                              <div className="">
                                <h2>Reset Your Password</h2>
                                <form action="/">
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
                                    "Reset Password",
                                    this.handleSubmit
                                  )}
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
        </div>
      </div>
    );
  }
}

export default ResetPassword;
