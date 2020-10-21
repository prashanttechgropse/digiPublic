import React from "react";
import { Link } from "react-router-dom";
import * as registerService from "../services/registerServices";

import Form from "../macroComponents/form/form";
import Joi from "joi-browser";
class AdminLogIn extends Form {
  state = {
    formData: {
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string().required().min(8),
  };

  doSubmit = async () => {
    const { data, error } = await registerService.adminAuthentication(
      this.state.formData
    );
    if (data) {
      const stake = data.profileType;
      return await this.props.history.push(`/${stake.toLowerCase()}`);
    }
    if (error) return;
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
                              className="sign-favicon "
                              alt="logo"
                            />
                          </Link>
                        </div>
                        <div className="card-sigin">
                          <div className="main-signup-header">
                            <h2>Welcome Admin!</h2>
                            <h5 className="font-weight-semibold mb-4">
                              Please sign in to continue.
                            </h5>
                            <form action="/admin/dashboard">
                              {this.renderInput("email", "Email")}
                              {this.renderInput(
                                "password",
                                "Password",
                                "password"
                              )}
                              {this.renderButton("Sign In", this.handleSubmit)}
                            </form>
                            <div className="main-signin-footer mt-5">
                              <p>
                                <Link to="/forgotPassword">
                                  Forgot password?
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

export default AdminLogIn;
