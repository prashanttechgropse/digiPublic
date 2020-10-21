import React, { Component } from "react";
import httpService from "../services/httpService";

import { toast } from "react-toastify";
import BidItemListRow from "../microComponents/bidItemList";
import { acceptTender } from "../services/tenderService";
class SupplierQuotationDetails extends Component {
  state = { bid: null };

  async componentDidMount() {
    console.log(this.props.match.params.bidId);
    if (!this.props.match.params.bidId) return;
    try {
      const { data } = await httpService.get(
        `${process.env.REACT_APP_APIENDPOINT}/bids/${this.props.match.params.bidId}`
      );
      await this.setState({ bid: data.bid });
    } catch (error) {
      toast.error(error.message);
      this.history.push("/customer");
      return;
    }
  }

  tenderAccept = async () => {
    const { bid } = this.state;
    let reqDetails = {};
    reqDetails.bidId = bid._id;
    reqDetails.tenderId = bid.tender._id;
    reqDetails.supplierId = bid.createdBy._id;
    await acceptTender(reqDetails);
    this.props.history.push("/customer");
    return;
  };

  render() {
    const { bid } = this.state;
    if (bid === null) return null;
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="breadcrumb-header justify-content-between">
            <div className="my-auto">
              <div className="d-flex">
                <h4 className="content-title mb-0 my-auto">Tender</h4>
                <span className="text-muted mt-1 tx-13 ml-2 mb-0">
                  / Supplier Quotation
                </span>
              </div>
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
                        <h2 className="text-white mb-0 tx-20">
                          {bid.tender._id.toString().substring(18, 24)}
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
                        <h2 className="text-white mb-0 tx-20">
                          {bid.tender.closingDate.toString().substring(0, 10)}
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
                        <h2 className="text-white mb-0 tx-20">
                          {bid.tender.deliveryLocation}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-4 col-md-6 col-12">
              <div className="card bg-success-gradient text-white">
                <div className="card-body">
                  <div className="row">
                    <div className="col-4">
                      <div className="icon1 mt-2 text-center">
                        <i className="fa fa-user tx-30"></i>
                      </div>
                    </div>
                    <div className="col-8">
                      <div className="mt-0 text-right">
                        <span className="text-white">Supplier Name</span>
                        <h2 className="text-white mb-0 tx-20">
                          {bid.createdBy.firstName}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-4 col-md-6 col-12">
              <div className="card bg-purple-gradient text-white">
                <div className="card-body">
                  <div className="row">
                    <div className="col-4">
                      <div className="icon1 mt-2 text-center">
                        <i className="fa fa-phone tx-30"></i>
                      </div>
                    </div>
                    <div className="col-8">
                      <div className="mt-0 text-right">
                        <span className="text-white">Supplier Contact</span>
                        <h2 className="text-white mb-0 tx-20">
                          {bid.createdBy.contactNumber}
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
                      Suppliers Quotation For Tender
                    </h4>
                  </div>
                  <p className="tx-12 tx-gray-500 mb-2">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
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
                            id="example1"
                          >
                            <thead>
                              <tr role="row">
                                <th>Sr. No</th>
                                <th>Category</th>
                                <th>Item </th>
                                <th>Qty</th>
                                <th>Unit Price</th>
                                <th>Total Amount</th>
                              </tr>
                            </thead>
                            <tbody>
                              {bid.itemList.map((item, index) => {
                                return (
                                  <BidItemListRow
                                    key={index}
                                    item={item}
                                    index={index}
                                  />
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {bid.tender.status === "inProcess" ? (
              <div className="col-lg-12 col-md-12">
                <div className="card" id="button33">
                  <div className="card-body">
                    <div className="text-wrap">
                      <div className="row">
                        <div className="col-sm-12 col-md-12">
                          <button
                            data-target="#tenderaccept"
                            data-toggle="modal"
                            className="btn btn-primary-gradient btn-block"
                            disabled={bid.tender.status !== "inProcess"}
                          >
                            Accept Tender
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="modal" id="tenderaccept">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content tx-size-sm">
                <div className="modal-body tx-center pd-y-20 pd-x-20">
                  <button
                    aria-label="Close"
                    className="close"
                    data-dismiss="modal"
                    type="button"
                  >
                    <span aria-hidden="true">×</span>
                  </button>{" "}
                  <i className="fa fa-check-circle tx-100 tx-orange lh-1 mg-t-20 d-inline-block"></i>
                  <h4 className="tx-orange tx-semibold mg-b-20">
                    Congratulations !
                  </h4>
                  <p className="mg-b-20 mg-x-20">
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration.
                  </p>
                  <button
                    onClick={this.tenderAccept}
                    aria-label="Close"
                    className="btn ripple btn-success pd-x-25"
                    data-dismiss="modal"
                    type="button"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SupplierQuotationDetails;
