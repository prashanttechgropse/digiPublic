import React, { Component } from "react";
import Form from "../macroComponents/form/form";
import Joi from "joi-browser";
import httpService from "../services/httpService";
import { toast } from "react-toastify";
class SecondaryUserEditProfile extends Form {
  state = {
    email: "",
    formData: {
      name: "",
      contactNumber: "",
      physicalAddress: "",
      postalAddress: "",
    },
    errors: {},
  };

  constructor(props) {
    super(props);
    let { formData } = this.state;
    const { user } = this.props;
    this.state.email = user.email;
    formData.name = user.details.name;
    formData.contactNumber = parseInt(user.details.contactNumber);
    formData.physicalAddress = user.details.physicalAddress;
    formData.postalAddress = user.details.postalAddress;
  }

  schema = {
    name: Joi.string().required().min(5),
    contactNumber: Joi.number().min(5).required(),
    physicalAddress: Joi.string().required().min(5),
    postalAddress: Joi.string().required().min(5),
  };

  doSubmit = async () => {
    const { data, error } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/secondaryUser/editProfile`,
      this.state.formData
    );
    toast.success(data.message);
    if (data) {
      window.location.reload();
    }
    if (error) {
      toast.error(error);
      return;
    }
  };

  render() {
    const { formData: user, email } = this.state;
    return (
      <div className="container-fluid">
        <div className="breadcrumb-header justify-content-between">
          <div className="my-auto">
            <div className="d-flex">
              <h4 className="content-title mb-0 my-auto">Account</h4>
              <span className="text-muted mt-1 tx-13 ml-2 mb-0">
                / Edit Profile
              </span>
            </div>
          </div>
        </div>

        <div className="row row-sm">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header pb-0">
                <div className="d-flex justify-content-between">
                  <h4 className="card-title mg-b-0 datatable-link">
                    Personal Deatil
                  </h4>
                </div>
              </div>
              <div className="card-body">
                <div className="card-sigin">
                  <div className="main-signup-header">
                    <div className="row">
                      <div className="col-md-6">
                        {this.renderInput("name", "Name")}
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Email Id</label>
                          <input
                            className="form-control"
                            type="text"
                            value={email}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        {this.renderInput("contactNumber", "Contact Number")}
                      </div>
                      <div className="col-md-6">
                        {this.renderInput(
                          "physicalAddress",
                          "Physical Address"
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        {this.renderInput("postalAddress", "Postal Address")}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="main-signup-header">
                  <div className="row">
                    <div className="col-md-12">
                      {this.renderButton(
                        "Update Profile",
                        this.handleSubmit,
                        "btn btn-main-primary btn-block"
                      )}
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

export default SecondaryUserEditProfile;
