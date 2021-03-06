import React, { Component } from "react";
import CustomerDetailsCards from "./customerDetailsCards";
import CustomerDetails from "./customerDetails";
import httpService from "../../services/httpService";

import { toast } from "react-toastify";

class CustomerDetailsContainer extends Component {
  state = {
    userCurrentStatus: null,
    customer: null,
  };

  async componentDidMount() {
    if (!this.props.match.params.customerId) return null;
    let data;
    try {
      data = await httpService.get(
        `${process.env.REACT_APP_APIENDPOINT}/admin/customers/${this.props.match.params.customerId}`
      );

      await this.setState({ customer: data.data.customer });
      await this.setState({
        userCurrentStatus: data.data.customer.user.isApproved,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      return;
    }
  }

  handleUserStatus = async (e) => {
    let previousState = this.state.userCurrentStatus;
    try {
      let isApproved;
      if (e.currentTarget.name === "approve") {
        isApproved = true;
      } else isApproved = false;
      this.setState({ userCurrentStatus: isApproved });
      const { data } = await httpService.post(
        `${process.env.REACT_APP_APIENDPOINT}/admin/userChangeStatus`,
        {
          userId: this.state.customer.user._id,
          status: isApproved,
        }
      );
      toast.success(data.message);
      if (!data.message) toast.success(data);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data);
        this.setState({ userCurrentStatus: previousState });
      }
    }
  };

  render() {
    if (this.state.customer === null) return null;
    return (
      <div className="container-fluid">
        <div className="breadcrumb-header justify-content-between">
          <div className="my-auto">
            <div className="d-flex">
              <h4 className="content-title mb-0 my-auto">Page</h4>
              <span className="text-muted mt-1 tx-13 ml-2 mb-0">
                / Customer Detail
              </span>
            </div>
          </div>
        </div>
        <CustomerDetailsCards customer={this.state.customer} />
        <div className="breadcrumb-header justify-content-between">
          <div className="my-auto">
            <div className="d-flex">
              <h4 className="content-title mb-0 my-auto">Status :</h4>
            </div>
          </div>
          <div className="d-flex my-xl-auto right-content">
            <div className="pr-1 mb-3 mb-xl-0">
              <button
                onClick={this.handleUserStatus}
                className="btn btn-primary "
                name="approve"
                disabled={this.state.userCurrentStatus}
              >
                <i className="fa fa-check"></i> Approve
              </button>
              <button
                onClick={this.handleUserStatus}
                className="btn btn-danger "
                name="block"
                disabled={!this.state.userCurrentStatus}
              >
                <i className="fa fa-times"></i> block
              </button>
            </div>
          </div>
        </div>
        <CustomerDetails customer={this.state.customer} {...this.props} />
      </div>
    );
  }
}

export default CustomerDetailsContainer;
