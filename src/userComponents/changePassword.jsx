import React from "react";
import Form from "../macroComponents/form/form";
import Joi from "joi-browser";
import * as registerServices from "../services/registerServices";

class ChangePassword extends Form {
  state = {
    formData: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    errors: {},
  };

  schema = {
    oldPassword: Joi.string().required().min(8),
    newPassword: Joi.string().required().min(8),
    confirmNewPassword: Joi.string().required().min(8),
  };

  validateOnSubmit = () => {
    const result = Joi.validate(this.state.formData, this.schema, {
      abortEarly: false,
    });
    if (
      !result.error &&
      this.state.formData.confirmNewPassword === this.state.formData.newPassword
    )
      return null;
    if (result.error) {
      const errors = {};
      for (let item of result.error.details) {
        errors[item.path[0]] = item.message;
      }
      return errors;
    }
    if (
      this.state.formData.confirmNewPassword !== this.state.formData.newPassword
    ) {
      const errors = {};
      errors.confirmNewPassword = "password mismatch";
      return errors;
    }
  };

  validateOnChange = (input) => {
    const obj = { [input.name]: input.value };
    const subSchema = { [input.name]: this.schema[input.name] };
    const { error } = Joi.validate(obj, subSchema);
    if (
      !error &&
      this.state.formData.confirmNewPassword === this.state.formData.newPassword
    )
      return null;
    if (error) {
      return error.details[0].message;
    }
    if (
      input.name === "confirmNewPassword" &&
      input.value !== this.state.formData.newPassword
    ) {
      return "new password and new confirm password mismatch";
    }
  };

  doSubmit = async () => {
    const { data } = await registerServices.changePassword(this.state.formData);
    if (data) {
      this.props.history.replace(`/login`);
    }
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="breadcrumb-header justify-content-between">
          <div className="my-auto">
            <div className="d-flex">
              <h4 className="content-title mb-0 my-auto">Account</h4>
              <span className="text-muted mt-1 tx-13 ml-2 mb-0">
                / Change Password
              </span>
            </div>
          </div>
        </div>

        <div className="row row-sm">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header pb-0">
                <div className="d-flex justify-content-between">
                  <h4 className="card-title mg-b-0 datatable-link text-center">
                    Change Your Password
                  </h4>
                </div>
                <p className="tx-12 tx-gray-500 mb-2 text-center">
                  Lorem Ipsum is simply dummy typesetting industry.
                </p>
              </div>
              <div className="card-body">
                <div className="card-sigin">
                  <div className="main-signup-header">
                    <div className="row">
                      <div className="col-md-6 offset-3">
                        {this.renderInput(
                          "oldPassword",
                          "Old Password",
                          "password"
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 offset-3">
                        {this.renderInput(
                          "newPassword",
                          "New Password",
                          "password"
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 offset-3">
                        {this.renderInput(
                          "confirmNewPassword",
                          "Confirm New Password",
                          "password"
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 offset-3">
                        {this.renderButton(
                          "Change Password",
                          this.handleSubmit,
                          "btn btn-primary-gradient btn-block"
                        )}
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

export default ChangePassword;
