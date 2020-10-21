import React, { Component } from "react";
import httpService from "../../services/httpService";
import pad from "../../services/padding";

import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const fileDownload = require("js-file-download");

class DeliveryNoteDetails extends Component {
  state = {
    profileType: "",
    deliveryNote: null,
  };
  componentDidMount = async () => {
    try {
      let res;
      if (this.props.match.path.includes("/admin")) {
        this.setState({ profileType: "admin" });
        res = await httpService.get(
          `${process.env.REACT_APP_APIENDPOINT}/admin/myDeliveryNote/${this.props.match.params.tenderId}`
        );
      }
      if (this.props.match.path.includes("/customer")) {
        this.setState({ profileType: "customer" });
        res = await httpService.get(
          `${process.env.REACT_APP_APIENDPOINT}/customer/myDeliveryNote/${this.props.match.params.tenderId}`
        );
      }
      if (this.props.match.path.includes("/receiver")) {
        this.setState({ profileType: "receiver" });
        res = await httpService.get(
          `${process.env.REACT_APP_APIENDPOINT}/receiver/myDeliveryNote/${this.props.match.params.tenderId}`
        );
      }
      if (this.props.match.path.includes("/supplier")) {
        this.setState({ profileType: "supplier" });
        res = await httpService.get(
          `${process.env.REACT_APP_APIENDPOINT}/supplier/myDeliveryNote/${this.props.match.params.tenderId}`
        );
      }
      if (this.props.match.path.includes("/employee")) {
        this.setState({ profileType: "employee" });
        res = await httpService.get(
          `${process.env.REACT_APP_APIENDPOINT}/employee/myDeliveryNote/${this.props.match.params.tenderId}`
        );
      }
      console.log(res);
      const { deliveryNote } = res.data;
      await this.setState({ deliveryNote });
      console.log(this.state.deliveryNote);
    } catch (error) {
      toast.error(error);
    }
  };

  downloadDeliveryNote = async () => {
    try {
      const { data } = await httpService.get(
        `${process.env.REACT_APP_APIENDPOINT}/deliveryNote/${this.props.match.params.tenderId}`,
        {
          responseType: "blob",
        }
      );
      await fileDownload(data, `deliveryNote.pdf`);
    } catch (error) {
      toast.error(error.message);
      return;
    }
  };

  displayTenderItems = () => {
    let srNo = 0;
    return this.state.deliveryNote.tender.itemList.map((item) => {
      srNo++;
      return (
        <tr key={srNo} role="row">
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

  render() {
    const { deliveryNote } = this.state;
    if (deliveryNote === null) return null;
    return (
      <div class="container-fluid">
        <div class="breadcrumb-header justify-content-between">
          <div class="my-auto">
            <div class="d-flex">
              <h4 class="content-title mb-0 my-auto">Page</h4>
              <span class="text-muted mt-1 tx-13 ml-2 mb-0">
                / Delivery Note Detail
              </span>
            </div>
          </div>
        </div>
        <div class="row row-sm">
          <div class="col-xl-12">
            <div class="card">
              <div class="card-header pb-0">
                <div class="d-flex justify-content-between">
                  <h4 class="card-title mg-b-0 datatable-link">
                    Delivery Note Detail
                  </h4>
                </div>
                <p class="tx-12 tx-gray-500 mb-2">
                  Lorem Ipsum is simply dummy text industry.
                </p>
              </div>
              <div class="card-body">
                <div class="main-contact-info-body p-4 ps">
                  <div class="media-list pb-0">
                    <div class="media">
                      <div class="media-body">
                        <div>
                          <label> Delivery Note No</label>
                          <span class="tx-medium">
                            {deliveryNote.deliveryNoteNo}
                          </span>
                        </div>
                        <div>
                          <label>Customer Name</label>
                          <span class="tx-medium">
                            {deliveryNote.customerId.firstName}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="media">
                      <div class="media-body">
                        <div>
                          <label> Supplier Name</label>
                          <span class="tx-medium">
                            {deliveryNote.supplierId.firstName}
                          </span>
                        </div>
                        <div>
                          <label>Tender Reference No</label>
                          <span class="tx-medium">
                            {deliveryNote.tender.tenderRefNo}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="media">
                      <div class="media-body">
                        <div>
                          <label>Delivery Status</label>
                          <span class="tx-medium">
                            {deliveryNote.tender.status}
                          </span>
                        </div>
                        <div>
                          <label>Rating</label>
                          <span class="tx-medium">{deliveryNote.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div class="media">
                      <div class="media-body">
                        <div>
                          <label>Reject Reason</label>
                          <span class="tx-medium">{deliveryNote.reason}</span>
                        </div>
                        <div>
                          <label>Delivery Date</label>
                          <span class="tx-medium">
                            {deliveryNote.deliveryDate
                              .toString()
                              .substring(0, 10)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="media">
                      <div class="media-body">
                        <div>
                          <label>Delivery Address</label>
                          <span class="tx-medium">
                            {deliveryNote.tender.deliveryLocation}
                          </span>
                        </div>
                        <div>
                          <label>Download File</label>
                          <span class="tx-medium">
                            <Link
                              to="#"
                              onClick={this.downloadDeliveryNote}
                              href="#"
                            >
                              <i class="fa fa-file"></i> Doc File
                            </Link>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="media">
                      <div class="media-body">
                        <div>
                          <label>Message</label>
                          <span class="tx-medium">{deliveryNote.message}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div class="card-header pb-0">
            <div class="d-flex justify-content-between">
              <h4 class="card-title mg-b-0 datatable-link">Item details</h4>
            </div>
            <p class="tx-12 tx-gray-500 mb-2">
              Lorem Ipsum is simply dummy text industry.
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
    );
  }
}

export default DeliveryNoteDetails;
