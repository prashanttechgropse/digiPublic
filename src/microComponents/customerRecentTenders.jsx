import React, { Component } from "react";
import { Link } from "react-router-dom";
import pad from "../services/padding";
class RecentlyAddedTenders extends Component {
  state = {};

  renderTenderTable = () => {
    let srNo = 0;
    let styleOfBadge;
    let tenderList = this.props.tenderList.filter(
      (tender) => tender.isPublished === true
    );
    return tenderList.map((tender) => {
      srNo++;
      if (srNo > 5) return null;
      if (tender.status === "completed") styleOfBadge = "success";
      else if (tender.status === "cancelled" || tender.status === "rejected")
        styleOfBadge = "danger";
      else if (tender.status === "awarded") styleOfBadge = "primary";
      else {
        styleOfBadge = "warning";
      }
      return (
        <tr role="row" key={srNo}>
          <td>{pad(srNo, 3)}</td>
          <td>
            <Link to={`/${this.props.profileType}/tenderDetails/${tender._id}`}>
              {tender._id.toString().substring(18, 24)}
            </Link>
          </td>
          <td>{tender.budgetAmount}</td>
          <td>{tender.creationDate.toString().substring(0, 10)}</td>
          <td>{tender.deliveryDate.toString().substring(0, 10)}</td>
          <td>{tender.closingDate.toString().substring(0, 10)}</td>
          <td>
            <span className={`badge badge-${styleOfBadge} f-14`}>
              {tender.status}
            </span>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="row row-sm">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header pb-0">
              <div className="d-flex justify-content-between">
                <h4 className="card-title mg-b-0 datatable-link">
                  Recently Added Tenders
                </h4>
              </div>
              <p className="tx-12 tx-gray-500 mb-2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <div>
                  <div className="row">
                    <div className="col-sm-12">
                      <table className="table text-md-nowrap dataTable">
                        <thead>
                          <tr role="row">
                            <th>Sr no</th>
                            <th>Tender I'd</th>
                            <th>Tender Amount</th>
                            <th>Date of Creation</th>
                            <th>Date of Delivery</th>
                            <th>Tender Closing Date</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>{this.renderTenderTable()}</tbody>
                      </table>
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

export default RecentlyAddedTenders;
