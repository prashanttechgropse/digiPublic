import React from "react";
import Form from "./form/form";
import Joi from "joi-browser";

import { Link } from "react-router-dom";

import * as registerService from "../services/registerServices";

class OtpVerificationForm extends Form {
  state = {
    formData: { otp: "" },
    errors: {},
  };

  schema = {
    otp: Joi.string().required(),
  };

  componentDidMount = () => {
    localStorage.removeItem("token");
  };

  doSubmit = async () => {
    await localStorage.removeItem("token");
    const { data, error } = await registerService.otpVerification(
      this.state.formData,
      this.props.email
    );
    if (error) return;
    else {
      if (this.props.forgotPassword === true) {
        return await this.props.history.push("/forgotPassword/resetPassword");
      } else {
        if (data.isregistered === false) {
          if (data.profileType === "primaryUser") {
            return await this.props.history.push("/register/profileSetup");
          }
          if (data.profileType === "secondaryUser") {
            return await this.props.history.push(
              "/register/secondaryUserProfileSetup"
            );
          }
        } else {
          this.props.history.push(`/${data.profileType}`);
        }
      }
    }
  };

  resendOtp = async () => {
    await registerService.otpGeneration(this.props.email);
    return;
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
                    src="/common/img/backgrounds/verify.png"
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
                        <div className="main-card-signin d-md-flex bg-white">
                          <div className="wd-100p">
                            <div className="main-signin-header">
                              <h2>Verify Your OTP</h2>
                              <h4>Check your email for the OTP</h4>
                              <form action="/reset-password">
                                {this.renderInput("otp", "One Time Password")}
                                {this.renderButton("Submit", this.handleSubmit)}
                              </form>
                            </div>
                            <div className="main-signup-footer mg-t-20">
                              <p>
                                Click here to
                                <Link to="#" onClick={this.resendOtp}>
                                  {" Resend OTP"}
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
    );
  }
}

export default OtpVerificationForm;
