import React, { Component } from "react";
class SupplierDeliveryNoteMainContent extends Component {
  state = {};
  render() {
    return (
      <div className="container-fluid">
        <div className="breadcrumb-header justify-content-between">
          <div className="my-auto">
            <div className="d-flex">
              <h4 className="content-title mb-0 my-auto">Tender</h4>
              <span className="text-muted mt-1 tx-13 ml-2 mb-0">
                / Delivery Notes
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
                    Delivery Notes List
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
                              <th>DN Number</th>
                              <th>Tender Id</th>
                              <th>Supplier Name</th>
                              <th>Note Number</th>
                              <th>Delivery Location</th>
                              <th>Receiver Name</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr role="row">
                              <td>
                                <a href="/supplier/delivery-note-detail">
                                  DN16276
                                </a>
                              </td>
                              <td>
                                <a href="/supplier/tender-detail">#T0003</a>
                              </td>
                              <td>Mo Danish</td>
                              <td>D797898</td>
                              <td>Mall Road 78 Hamilton</td>
                              <td>Saih Ahemed</td>
                              <td>
                                <span className="badge badge-danger f-14">
                                  Rejected
                                </span>
                              </td>
                            </tr>
                            <tr role="row">
                              <td>
                                <a href="/supplier/delivery-note-detail">
                                  DN16276
                                </a>
                              </td>
                              <td>
                                <a href="/supplier/tender-detail">#T0003</a>
                              </td>
                              <td>Mo Danish</td>
                              <td>D797898</td>
                              <td>Mall Road 78 Hamilton</td>
                              <td>Saih Ahemed</td>
                              <td>
                                <span className="badge badge-success f-14">
                                  Completed
                                </span>
                              </td>
                            </tr>
                            <tr role="row">
                              <td>
                                <a href="/supplier/delivery-note-detail">
                                  DN16276
                                </a>
                              </td>
                              <td>
                                <a href="/supplier/tender-detail">#T0003</a>
                              </td>
                              <td>Mo Danish</td>
                              <td>D797898</td>
                              <td>Mall Road 78 Hamilton</td>
                              <td>Saih Ahemed</td>
                              <td>
                                <span className="badge badge-warning f-14">
                                  Completed
                                </span>
                              </td>
                            </tr>
                            <tr role="row">
                              <td>
                                <a href="/supplier/delivery-note-detail">
                                  DN16276
                                </a>
                              </td>
                              <td>
                                <a href="/supplier/tender-detail">#T0004</a>
                              </td>
                              <td>Mo Danish</td>
                              <td>D797898</td>
                              <td>Mall Road 78 Hamilton</td>
                              <td>Saih Ahemed</td>
                              <td>
                                <span className="badge badge-danger f-14">
                                  Rejected
                                </span>
                              </td>
                            </tr>
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
      </div>
    );
  }
}

export default SupplierDeliveryNoteMainContent;
