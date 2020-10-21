import React from "react";
import Form from "./form/form";
import Joi from "joi-browser";

import * as registerServices from "../services/registerServices";
import { Link } from "react-router-dom";
class ForgotPassword extends Form {
  state = {
    formData: { email: "" },
    errors: {},
  };

  schema = {
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
  };

  doSubmit = async () => {
    const { data, error } = await registerServices.otpGeneration(
      this.state.formData.email
    );
    if (data) {
      this.props.submitEmail(this.state.formData.email);
      this.props.history.push(`/forgotPassword/otpVerification`);
    }
    if (error) {
      return;
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
                    src="/common/img/backgrounds/forgot.png"
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
                          <Link href="#">
                            <img
                              src="/common/img/logo/logo.png"
                              className="sign-favicon"
                              alt="logo"
                            />
                          </Link>
                        </div>
                        <div className="main-card-signin d-md-flex bg-white">
                          <div className="wd-100p">
                            <div className="main-signin-header">
                              <h2>Forgot Password!</h2>
                              <h4>Please Enter Your Email</h4>
                              <form>
                                {this.renderInput("email", "Email")}
                                {this.renderButton("Send", this.handleSubmit)}
                              </form>
                            </div>
                            <div className="main-signup-footer mg-t-20">
                              <p>
                                Forget it,
                                <Link to="/login">Send me back</Link>
                                to the sign in screen.
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
    );
  }
}

export default ForgotPassword;
