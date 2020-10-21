import React from "react";
import Form from "../../macroComponents/form/form";
import httpService from "../../services/httpService";
import { toast } from "react-toastify";
import pad from "../../services/padding";
import { Link } from "react-router-dom";

const Joi = require("joi-browser");

class AdminCreateCategory extends Form {
  state = {
    formData: {
      organisationName: "",
      organisationTypes: [],
      itemName: "",
      itemTypes: [],
    },
    errors: {},
  };

  schema = {
    organisationName: Joi.string().required(),
    organisationTypes: Joi.array().items(Joi.string()),
    itemName: Joi.string().required(),
    itemTypes: Joi.array().items(Joi.string()),
  };

  componentDidMount = async () => {
    try {
      const { data } = await httpService.get(
        `${process.env.REACT_APP_APIENDPOINT}/admin/categoryTypes`
      );
      const formData = { ...this.state.formData };
      formData.organisationTypes = data.organisationTypes;
      formData.itemTypes = data.itemTypes;
      await this.setState({ formData });
    } catch (error) {
      toast.error(error.message);
    }
  };

  renderOrganisationTypes() {
    const { organisationTypes } = this.state.formData;
    let srNo = 0;
    if (organisationTypes === "") return null;
    return organisationTypes.map((organistationType) => {
      srNo++;
      const index = srNo - 1;
      return (
        <tr role="row" key={srNo}>
          <td>{pad(srNo, 3)}</td>
          <td>{organistationType}</td>
          <td>
            <Link
              to="#"
              onClick={() => this.removeCategory(index)}
              className="detail-icons"
            >
              <i className="fa fa-trash"></i>
            </Link>
          </td>
        </tr>
      );
    });
  }

  renderItems() {
    const { itemTypes } = this.state.formData;
    let srNo = 0;
    if (itemTypes === "") return null;
    return itemTypes.map((itemType) => {
      srNo++;
      const index = srNo - 1;
      return (
        <tr role="row" key={srNo}>
          <td>{pad(srNo, 3)}</td>
          <td>{itemType}</td>
          <td>
            <Link
              to="#"
              onClick={() => this.removeItem(index)}
              className="detail-icons"
            >
              <i className="fa fa-trash"></i>
            </Link>
          </td>
        </tr>
      );
    });
  }

  removeCategory = async (index) => {
    const previousFormData = { ...this.state.formData };
    try {
      const formData = { ...this.state.formData };
      formData.organisationTypes.splice(index, 1);
      this.setState({ formData });
      const {
        data,
        error,
      } = await httpService.post(
        `${process.env.REACT_APP_APIENDPOINT}/admin/removeOrganisationTypes`,
        { organisationTypes: this.state.formData.organisationTypes }
      );
      if (error) throw error;
      toast.success(data.message);
    } catch (error) {
      const formData = previousFormData;
      this.setState({ formData });
    }
  };

  removeItem = async (index) => {
    const previousFormData = { ...this.state.formData };
    try {
      const formData = { ...this.state.formData };
      formData.itemTypes.splice(index, 1);
      this.setState({ formData });
      const {
        data,
        error,
      } = await httpService.post(
        `${process.env.REACT_APP_APIENDPOINT}/admin/removeItemTypes`,
        { itemTypes: this.state.formData.itemTypes }
      );
      if (error) throw error;
      toast.success(data.message);
    } catch (error) {
      const formData = previousFormData;
      this.setState({ formData });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    let errors;

    if (e.currentTarget.name === "item") {
      errors = this.validateOnSubmitItem();
      this.setState({ errors: errors || {} });
    } else if (e.currentTarget.name === "organisation") {
      errors = this.validateOnSubmitOrganistaion();
      this.setState({ errors: errors || {} });
    }
    if (errors) return;

    if (e.currentTarget.name === "item") {
      await this.doSubmitItem();
    }
    if (e.currentTarget.name === "organisation") {
      await this.doSubmitOrganisation();
    }
  };

  validateOnSubmitItem = () => {
    const result = Joi.validate(
      { itemName: this.state.formData.itemName },
      { itemName: Joi.string().required() },
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

  validateOnSubmitOrganistaion = () => {
    const result = Joi.validate(
      { organisationName: this.state.formData.organisationName },
      { organisationName: Joi.string().required() },
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

  doSubmitOrganisation = async () => {
    const previousFormData = { ...this.state.formData };
    const formData = { ...this.state.formData };
    formData.organisationTypes.push(formData.organisationName);
    this.setState({ formData });
    try {
      const {
        data,
      } = await httpService.post(
        `${process.env.REACT_APP_APIENDPOINT}/admin/addOrganisationTypes`,
        { organisationType: this.state.formData.organisationName }
      );
      toast.success(data.message);
      formData.organisationName = "";
      this.setState({ formData });
    } catch (error) {
      toast.error(error.message);
      const formData = previousFormData;
      this.setState({ formData });
    }
  };

  doSubmitItem = async () => {
    const previousFormData = { ...this.state.formData };
    const formData = { ...this.state.formData };
    formData.itemTypes.push(formData.itemName);
    this.setState({ formData });
    try {
      const {
        data,
      } = await httpService.post(
        `${process.env.REACT_APP_APIENDPOINT}/admin/addItemTypes`,
        { itemType: this.state.formData.itemName }
      );
      toast.success(data.message);
      formData.itemName = "";
      this.setState({ formData });
    } catch (error) {
      toast.error(error.message);
      const formData = previousFormData;
      this.setState({ formData });
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
                / Create Category
              </span>
            </div>
          </div>
        </div>

        <div className="row row-sm">
          <div className="col-xl-6">
            <div className="card">
              <div className="card-header pb-0">
                <div className="d-flex justify-content-between">
                  <h4 className="card-title mg-b-0 datatable-link">
                    Create Organization
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
                        {this.renderInput(
                          "organisationName",
                          "Organisation Name"
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
                        this.validateOnSubmitOrganistaion,
                        "organisation"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="card">
              <div className="card-header pb-0">
                <div className="d-flex justify-content-between">
                  <h4 className="card-title mg-b-0 datatable-link">
                    Create Item List
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
                        {this.renderInput("itemName", "Item Name")}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      {this.renderButton(
                        "Submit",
                        this.handleSubmit,
                        "btn btn-primary-gradient btn-block",
                        this.validateOnSubmitItem,
                        "item"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row row-sm">
          <div className="col-xl-6">
            <div className="card">
              <div className="card-header pb-0">
                <div className="d-flex justify-content-between">
                  <h4 className="card-title mg-b-0 datatable-link">
                    Organization List
                  </h4>
                </div>
                <p className="tx-12 tx-gray-500 mb-2">
                  Lorem Ipsum is simply dummy industry.
                </p>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <div
                    id="example1_wrapper"
                    className="dataTables_wrapper dt-bootstrap4"
                  >
                    <div className="row">
                      <div className="col-sm-12">
                        <table
                          className="table text-md-nowrap dataTable"
                          id="example2"
                        >
                          <thead>
                            <tr role="row">
                              <th>Sr.No</th>
                              <th>Organization Name</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>{this.renderOrganisationTypes()}</tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-6">
            <div className="card">
              <div className="card-header pb-0">
                <div className="d-flex justify-content-between">
                  <h4 className="card-title mg-b-0 datatable-link">
                    Item list
                  </h4>
                </div>
                <p className="tx-12 tx-gray-500 mb-2">
                  Lorem Ipsum is simply dummy industry.
                </p>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <div
                    id="example1_wrapper"
                    className="dataTables_wrapper dt-bootstrap4"
                  >
                    <div className="row">
                      <div className="col-sm-12">
                        <table
                          className="table text-md-nowrap dataTable"
                          id="example2"
                        >
                          <thead>
                            <tr role="row">
                              <th>Sr.No</th>
                              <th>Item Name</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>{this.renderItems()}</tbody>
                        </table>
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

export default AdminCreateCategory;
