import React from "react";
import Joi from "joi-browser";
import * as registerService from "../services/registerServices";

import Form from "../macroComponents/form/form";
import { Link } from "react-router-dom";
class SecondaryUserProfileSetup extends Form {
  state = {
    formData: {
      profileType: "",
      name: "",
      primaryUserEmailId: "",
      contactNumber: "",
      postalAddress: "",
      physicalAddress: "",
    },
    errors: {},
  };
  schema = {
    profileType: Joi.string().required(),
    name: Joi.string().required(),
    primaryUserEmailId: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    contactNumber: Joi.number().required(),
    postalAddress: Joi.string().required(),
    physicalAddress: Joi.string().required(),
  };

  doSubmit = async () => {
    const { formData } = this.state;
    const {
      data,
      error,
    } = await registerService.setUpSecondarUserProfileService(formData);
    if (data) {
      return await this.props.history.push("/");
    }
    if (error) {
      return;
    }
  };

  render() {
    return (
      <div>
        <div class="page">
          <div class="container-fluid">
            <div class="row no-gutter">
              <div class="col-md-12 col-lg-12 col-xl-12 bg-white">
                <div class="login d-flex align-items-center py-2 p-top-50">
                  <div class="container p-0">
                    <div class="row">
                      <div class="col-md-12 col-lg-12 col-xl-12 mx-auto">
                        <div class="card-sigin">
                          <div class="mb-2 d-flex">
                            <Link to="#">
                              <img
                                src="/common/img/logo/logo.png"
                                class="sign-favicon"
                                alt="logo"
                              />
                            </Link>
                          </div>
                          <div class="card-sigin">
                            <div class="main-signup-header">
                              <h2>Profile Setup</h2>
                              <h5 class="font-weight-semibold mb-4">
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text
                              </h5>
                              <form action="<?php echo site_url('bank-information');?>">
                                <div class="row">
                                  <div class="col-md-6">
                                    {this.renderSelect(
                                      "profileType",
                                      "Profile Type",
                                      [
                                        { _id: "employee", name: "Employee" },
                                        { _id: "receiver", name: "Receiver" },
                                      ]
                                    )}
                                  </div>
                                  <div class="col-md-6">
                                    {this.renderInput("name", "Name")}
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col-md-6">
                                    {this.renderInput(
                                      "primaryUserEmailId",
                                      "Primary User Email Id"
                                    )}
                                  </div>
                                  ​
                                  <div class="col-md-6">
                                    {this.renderInput(
                                      "contactNumber",
                                      "Contact Number"
                                    )}
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col-md-6">
                                    {this.renderInput(
                                      "postalAddress",
                                      "Postal Address"
                                    )}
                                  </div>

                                  <div class="col-md-6">
                                    {this.renderInput(
                                      "physicalAddress",
                                      "Physical Address"
                                    )}
                                  </div>
                                </div>
                                ​<div class="row"></div>
                                <div class="row">
                                  <div class="col-md-12">
                                    {this.renderButton(
                                      "submit",
                                      this.handleSubmit
                                    )}
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
      </div>
    );
  }
}

export default SecondaryUserProfileSetup;
