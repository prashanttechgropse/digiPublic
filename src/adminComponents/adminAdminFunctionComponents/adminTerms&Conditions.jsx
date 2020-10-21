import React from "react";
import Form from "../../macroComponents/form/form";
import Joi from "joi-browser";
import httpService from "../../services/httpService";
import { toast } from "react-toastify";
class AdminTermsConditions extends Form {
  state = {
    formData: {
      termsConditions: "",
      ourPolicy: "",
      customerPaymentPolicy: "",
    },
    errors: {},
  };

  schema = {
    termsConditions: Joi.string().required(),
    ourPolicy: Joi.string().required(),
    customerPaymentPolicy: Joi.string().required(),
  };

  componentDidMount = async () => {
    try {
      const { data } = await httpService.get(
        `${process.env.REACT_APP_APIENDPOINT}/admin/termsConditions`
      );
      const formData = { ...this.state.formData };
      for (let item in formData) {
        formData[item] = data[item];
      }
      await this.setState({ formData });
    } catch (error) {
      toast.error(error.message);
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    let errors;

    if (e.currentTarget.name === "termsConditions") {
      errors = this.validateOnSubmitTermsConditions();
      this.setState({ errors: errors || {} });
    } else if (e.currentTarget.name === "ourPolicy") {
      errors = this.validateOnSubmitOurPolicy();
      this.setState({ errors: errors || {} });
    } else if (e.currentTarget.name === "customerPaymentPolicy") {
      errors = this.validateOnSubmitCustomerPaymentPolicy();
      this.setState({ errors: errors || {} });
    }
    if (errors) return;

    if (e.currentTarget.name === "termsConditions") {
      this.doSubmitTermsConditions();
    }
    if (e.currentTarget.name === "ourPolicy") {
      this.doSubmitOurPolicy();
    }
    if (e.currentTarget.name === "customerPaymentPolicy") {
      this.doSubmitCustomerPaymentPolicy();
    }
  };

  validateOnSubmitTermsConditions = () => {
    const result = Joi.validate(
      { termsConditions: this.state.formData.termsConditions },
      { termsConditions: Joi.string().required() },
      {
        abortEarly: false,
      }
    );
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  validateOnSubmitOurPolicy = () => {
    const result = Joi.validate(
      { ourPolicy: this.state.formData.ourPolicy },
      { ourPolicy: Joi.string().required() },
      {
        abortEarly: false,
      }
    );
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  validateOnSubmitCustomerPaymentPolicy = () => {
    const result = Joi.validate(
      { customerPaymentPolicy: this.state.formData.customerPaymentPolicy },
      { customerPaymentPolicy: Joi.string().required() },
      {
        abortEarly: false,
      }
    );
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  doSubmitTermsConditions = async () => {
    try {
      const {
        data,
      } = await httpService.post(
        `${process.env.REACT_APP_APIENDPOINT}/admin/editTermsConditions`,
        { termsConditions: this.state.formData.termsConditions }
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  doSubmitOurPolicy = async () => {
    try {
      const {
        data,
      } = await httpService.post(
        `${process.env.REACT_APP_APIENDPOINT}/admin/editOurPolicy`,
        { ourPolicy: this.state.formData.ourPolicy }
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  doSubmitCustomerPaymentPolicy = async () => {
    try {
      const {
        data,
      } = await httpService.post(
        `${process.env.REACT_APP_APIENDPOINT}/admin/editCustomerPaymentPolicy`,
        { customerPaymentPolicy: this.state.formData.customerPaymentPolicy }
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="breadcrumb-header justify-content-between">
          <div className="my-auto">
            <div className="d-flex">
              <h4 className="content-title mb-0 my-auto">Page</h4>
              <span className="text-muted mt-1 tx-13 ml-2 mb-0">
                / Terms & Conditions
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
                    Terms & Conditions
                  </h4>
                </div>
                <p className="tx-12 tx-gray-500 mb-2">
                  Lorem Ipsum is simply dummy texttypesetting industry.
                </p>
              </div>
              <div className="card-body">
                <div className="card-sigin">
                  <div className="main-signup-header">
                    <div className="row">
                      <div className="col-md-12">
                        {this.renderTextArea(
                          "termsConditions",
                          "Write Terms & Condition"
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      {this.renderButton(
                        "Submit",
                        this.handleSubmit,
                        "btn btn-primary-gradient btn-block",
                        this.validateOnSubmitTermsConditions,
                        "termsConditions"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row row-sm">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header pb-0">
                <div className="d-flex justify-content-between">
                  <h4 className="card-title mg-b-0 datatable-link">
                    Our policy
                  </h4>
                </div>
                <p className="tx-12 tx-gray-500 mb-2">
                  Lorem Ipsum is simply dummy texttypesetting industry.
                </p>
              </div>
              <div className="card-body">
                <div className="card-sigin">
                  <div className="main-signup-header">
                    <div className="row">
                      <div className="col-md-12">
                        {this.renderTextArea("ourPolicy", "Write Our policy")}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      {this.renderButton(
                        "Submit",
                        this.handleSubmit,
                        "btn btn-primary-gradient btn-block",
                        this.validateOnSubmitOurPolicy,
                        "ourPolicy"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row row-sm">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header pb-0">
                <div className="d-flex justify-content-between">
                  <h4 className="card-title mg-b-0 datatable-link">
                    Customer Payment Policy
                  </h4>
                </div>
                <p className="tx-12 tx-gray-500 mb-2">
                  Lorem Ipsum is simply dummy texttypesetting industry.
                </p>
              </div>
              <div className="card-body">
                <div className="card-sigin">
                  <div className="main-signup-header">
                    <div className="row">
                      <div className="col-md-12">
                        {this.renderTextArea(
                          "customerPaymentPolicy",
                          "Write Customer Payment Policy"
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      {this.renderButton(
                        "Submit",
                        this.handleSubmit,
                        "btn btn-primary-gradient btn-block",
                        this.validateOnSubmitCustomerPaymentPolicy,
                        "customerPaymentPolicy"
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

export default AdminTermsConditions;
