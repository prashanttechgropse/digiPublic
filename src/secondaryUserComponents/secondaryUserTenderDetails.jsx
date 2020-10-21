import React, { Component } from "react";
import httpService from "../services/httpService";

import { toast } from "react-toastify";

import pad from "../services/padding";
import { Link } from "react-router-dom";
class SecondaryUserTenderDetails extends Component {
  state = { tender: null, profileType: "" };

  async componentDidMount() {
    if (!this.props.match.params.tenderId) return null;

    try {
      if (this.props.match.path.includes("/receiver")) {
        this.setState({ profileType: "receiver" });
        const { data } = await httpService.get(
          `${process.env.REACT_APP_APIENDPOINT}/receiver/myTenders/${this.props.match.params.tenderId}`
        );
        await this.setState({ tender: data.tender });
      }
      if (this.props.match.path.includes("/employee")) {
        this.setState({ profileType: "employee" });
        const { data } = await httpService.get(
          `${process.env.REACT_APP_APIENDPOINT}/employee/myTenders/${this.props.match.params.tenderId}`
        );
        await this.setState({ tender: data.tender });
      }
    } catch (error) {
      toast.error(error.message);
      return;
    }
  }

  componentWillUnmount() {
    window.location.reload();
  }

  displayTenderItems = () => {
    let srNo = 0;
    return this.state.tender.itemList.map((item) => {
      srNo++;
      return (
        <tr role="row" key={srNo}>
          <td>{pad(srNo, 3)}</td>
          <td>{item.category}</td>
          <td>{item.name}</td>
          <td>
            <span className="badge badge-primary f-14">{item.quantity}</span>
          </td>
          <td>
            <span className="badge badge-success f-14">
              {item.unitOfMeasure}
            </span>
          </td>
        </tr>
      );
    });
  };

  handleCompleteTender = async () => {
    return await this.props.history.push(
      `/receiver/createDeliveryNote/${this.props.match.params.tenderId}/completed`
    );
  };

  handleRejectTender = async () => {
    return await this.props.history.push(
      `/receiver/createDeliveryNote/${this.props.match.params.tenderId}/rejected`
    );
  };

  renderCompleteTenderButton() {
    return (
      <div className="pr-1 mb-3 mb-xl-0">
        <button
          href="#publishmodalComplete"
          data-target="#publishmodalComplete"
          data-toggle="modal"
          className="btn btn-success btn-block"
        >
          <i className="fa fa-check"></i> Complete Tender
        </button>
        <div className="modal show" id="publishmodalComplete" aria-modal="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content tx-size-sm">
              <div className="modal-body tx-center pd-y-20 pd-x-20 pl-4 pr-4">
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                >
                  <span aria-hidden="true">×</span>
                </button>
                <i className="fa fa-check-circle tx-100 tx-success lh-1 mg-t-20 d-inline-block"></i>
                <h4 className="tx-success tx-semibold mg-b-20 mb-2">
                  Confirmation..!!
                </h4>
                <p>Do you really want to complete this Tender ?</p>
                <div className="text-center mt-4 mb-4">
                  <Link
                    to="#"
                    className="btn btn-primary mr-3"
                    onClick={this.handleCompleteTender}
                  >
                    Yes
                  </Link>
                  <Link to="#" className="btn btn-primary" data-dismiss="modal">
                    No
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  renderRejectTenderButton() {
    return (
      <div className="pr-1 mb-3 mb-xl-0">
        <button
          href="#publishmodalReject"
          data-target="#publishmodalReject"
          data-toggle="modal"
          className="btn btn-danger btn-block"
        >
          <i className="fa fa-times"></i> Reject Tender
        </button>
        <div className="modal show" id="publishmodalReject" aria-modal="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content tx-size-sm">
              <div className="modal-body tx-center pd-y-20 pd-x-20 pl-4 pr-4">
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                >
                  <span aria-hidden="true">×</span>
                </button>
                <i className="fa fa-times-circle tx-100 tx-danger lh-1 mg-t-20 d-inline-block"></i>
                <h4 className="tx-danger tx-semibold mg-b-20 mb-2">
                  Confirmation..!!
                </h4>
                <p>Do you really want to Reject this Tender ?</p>
                <div className="text-center mt-4 mb-4">
                  <Link
                    to="#"
                    className="btn btn-primary mr-3"
                    onClick={this.handleRejectTender}
                  >
                    Yes
                  </Link>
                  <Link to="#" className="btn btn-primary" data-dismiss="modal">
                    No
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderTenderDetails = () => {
    const { tender } = this.state;
    if (tender === null) return null;
    return (
      <React.Fragment>
        <div className="breadcrumb-header justify-content-between">
          <div className="my-auto">
            <div className="d-flex">
              <h4 className="content-title mb-0 my-auto">Tender</h4>
              <span className="text-muted mt-1 tx-13 ml-2 mb-0">
                / Tender Detail
              </span>
            </div>
          </div>
          <div className="d-flex my-xl-auto right-content">
            {this.state.profileType === "receiver" &&
            this.state.tender.status === "awarded"
              ? this.renderCompleteTenderButton()
              : ""}
            {this.state.profileType === "receiver" &&
            this.state.tender.status === "awarded"
              ? this.renderRejectTenderButton()
              : ""}
          </div>
        </div>
        <div className="row row-sm">
          <div className="col-lg-6 col-xl-4 col-md-6 col-12">
            <div className="card bg-primary-gradient text-white">
              <div className="card-body">
                <div className="row">
                  <div className="col-4">
                    <div className="icon1 mt-2 text-center">
                      <i className="fa fa-list tx-30"></i>
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="mt-0 text-right">
                      <span className="text-white">Tender Ref No</span>
                      <h2 className="text-white mb-0">
                        {tender._id.toString().substring(18, 24)}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-xl-4 col-md-6 col-12">
            <div className="card bg-danger-gradient text-white">
              <div className="card-body">
                <div className="row">
                  <div className="col-4">
                    <div className="icon1 mt-2 text-center">
                      <i className="fa fa-calendar tx-30"></i>
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="mt-0 text-right">
                      <span className="text-white">Closing Date</span>
                      <h2 className="text-white mb-0">
                        {tender.closingDate.toString().substring(0, 10)}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-xl-4 col-md-6 col-12">
            <div className="card bg-warning-gradient text-white">
              <div className="card-body">
                <div className="row">
                  <div className="col-4">
                    <div className="icon1 mt-2 text-center">
                      <i className="fa fa-map-marker tx-30"></i>
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="mt-0 text-right">
                      <span className="text-white">Delivery Location</span>
                      <h2 className="text-white mb-0">
                        {tender.deliveryLocation}
                      </h2>
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
                    Tender Products List
                  </h4>
                </div>
                <p className="tx-12 tx-gray-500 mb-2">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <div className="dataTables_wrapper dt-bootstrap4">
                    <div className="row">
                      <div className="col-sm-12">
                        <table className="table text-md-nowrap dataTable">
                          <thead>
                            <tr role="row">
                              <th>Sr. No</th>
                              <th>Category</th>
                              <th>Item </th>
                              <th>Qty</th>
                              <th>Unit of Meassure</th>
                            </tr>
                          </thead>
                          <tbody>{this.displayTenderItems()}</tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  render() {
    const { tender } = this.state;
    if (tender === null) {
      return null;
    }
    return <div className="container-fluid">{this.renderTenderDetails()}</div>;
  }
}

export default SecondaryUserTenderDetails;
