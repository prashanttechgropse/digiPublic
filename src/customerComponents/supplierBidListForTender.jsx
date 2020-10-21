import React, { Component } from "react";
import SupplierBidListRow from "./supplierBidListRow";

class SupplierBidListForTender extends Component {
  state = {};
  render() {
    return (
      <div className="row row-sm">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header pb-0">
              <div className="d-flex justify-content-between">
                <h4 className="card-title mg-b-0 datatable-link">
                  Suppliers List For Tender
                </h4>
              </div>
              <p className="tx-12 tx-gray-500 mb-2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
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
                            <th>Ref No</th>
                            <th>Supplier Code</th>
                            <th>Supplier Name</th>
                            <th>Amount</th>
                            <th>Supplier Rating</th>
                            <th>Action</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.props.tender.bidList.map((bid, index) => {
                            return (
                              <SupplierBidListRow
                                profileType={this.props.profileType}
                                key={index}
                                bidId={bid}
                                index={index}
                                bidClicked={(bidId) =>
                                  this.props.bidClicked(bidId)
                                }
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
      </div>
    );
  }
}

export default SupplierBidListForTender;
