import React, { Component } from "react";
import httpService from "../services/httpService";

import { toast } from "react-toastify";
import SupplierBidCards from "./supplierBidCards";
import pad from "../services/padding";
class SupplierBidDetails extends Component {
  state = { bid: null, bidNotFound: false };

  async componentDidMount() {
    if (!this.props.match.params.tenderId) return;
    try {
      const { data } = await httpService.get(
        `${process.env.REACT_APP_APIENDPOINT}/supplier/myBidDetails/${this.props.match.params.tenderId}`
      );
      await this.setState({ bid: data.bid });
      if (this.state.bid === null) {
        let bidNotFound = true;
        await this.setState({ bidNotFound: bidNotFound });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      return;
    }
  }

  renderBidItemDetails = () => {
    if (this.state.bid === null) return null;
    let srNo;
    return this.state.bid.itemList.map((item) => {
      srNo++;
      return (
        <tr role="row" key={srNo}>
          <td>{pad(srNo, 3)}</td>
          <td>{item.category}</td>
          <td>{item.name}</td>
          <td>
            <span className="badge badge-primary f-14">
              {item.unitOfMeasure}
            </span>
          </td>
          <td>
            <span className="badge badge-success f-14">{item.quantity}</span>
          </td>
          <td>{item.price}</td>
          <td>{parseFloat(item.price) * parseFloat(item.quantity)}</td>
        </tr>
      );
    });
  };

  render() {
    if (this.state.bid === null) {
      if (this.state.bidNotFound === true) {
        return (
          <h1 className="no-data-found">you did not bid for this tender</h1>
        );
      }
      return null;
    }
    return (
      <div className="container-fluid">
        <div className="breadcrumb-header justify-content-between">
          <div className="my-auto">
            <div className="d-flex">
              <h4 className="content-title mb-0 my-auto">Bid</h4>
              <span className="text-muted mt-1 tx-13 ml-2 mb-0">
                /My Bid Details
              </span>
            </div>
          </div>
        </div>
        <SupplierBidCards tender={this.state.bid.tender} />
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
                              <th>Unit of Meassure</th>
                              <th>Qty</th>
                              <th>Price</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>{this.renderBidItemDetails()}</tbody>
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

export default SupplierBidDetails;
