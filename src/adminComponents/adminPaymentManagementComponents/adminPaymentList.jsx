import React, { Component } from "react";
class AdminPaymentList extends Component {
  state = {};
  render() {
    return (
      <div className="container-fluid">
        <div className="breadcrumb-header justify-content-between">
          <div className="my-auto">
            <div className="d-flex">
              <h4 className="content-title mb-0 my-auto">Page</h4>
              <span className="text-muted mt-1 tx-13 ml-2 mb-0">
                / Payment List
              </span>
            </div>
          </div>
        </div>

        <div className="row row-sm">
          <div className="col-xl-12">
            <div className="card">
              <div className="panel panel-primary tabs-style-2">
                <div className="tab-menu-heading">
                  <div className="tabs-menu1">
                    <ul className="nav panel-tabs main-nav-line payment-tabs">
                      <li>
                        <a
                          href="#Customer"
                          className="nav-link active"
                          data-toggle="tab"
                        >
                          Customer
                        </a>
                      </li>
                      <li>
                        <a
                          href="#Supplier"
                          className="nav-link"
                          data-toggle="tab"
                        >
                          Supplier
                        </a>
                      </li>
                      <li>
                        <a
                          href="#Commsion"
                          className="nav-link"
                          data-toggle="tab"
                        >
                          Commsion
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="panel-body tabs-menu-body main-content-body-right border">
                  <div className="tab-content">
                    <div className="tab-pane active" id="Customer">
                      <div className="card-header pb-0">
                        <div className="d-flex justify-content-between">
                          <h4 className="card-title mg-b-0 datatable-link">
                            Customer Payment List
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
                                      <th>Sr.No</th>
                                      <th>Name</th>
                                      <th>Tender Name</th>
                                      <th>Delivery Date</th>
                                      <th>Total Payment</th>
                                      <th>Status</th>
                                      <th>Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr role="row">
                                      <td>#1001</td>
                                      <td>Imran Khan</td>
                                      <td>Mobile Phones</td>
                                      <td>20-18-2020</td>
                                      <td>$1200</td>
                                      <td>
                                        <span className="badge badge-primary f-14">
                                          Paid
                                        </span>
                                      </td>
                                      <td>
                                        <a
                                          href="/admin/customer-payment-detail"
                                          className="detail-icons"
                                        >
                                          <i className="fa fa-eye"></i>
                                        </a>
                                      </td>
                                    </tr>
                                    <tr role="row">
                                      <td>#1002</td>
                                      <td>Imran Khan</td>
                                      <td>Mobile Phones</td>
                                      <td>20-18-2020</td>
                                      <td>$1200</td>
                                      <td>
                                        <span className="badge badge-primary f-14">
                                          Paid
                                        </span>
                                      </td>
                                      <td>
                                        <a
                                          href="/admin/customer-payment-detail"
                                          className="detail-icons"
                                        >
                                          <i className="fa fa-eye"></i>
                                        </a>
                                      </td>
                                    </tr>
                                    <tr role="row">
                                      <td>#1003</td>
                                      <td>Imran Khan</td>
                                      <td>Mobile Phones</td>
                                      <td>20-18-2020</td>
                                      <td>$1200</td>
                                      <td>
                                        <span className="badge badge-primary f-14">
                                          Paid
                                        </span>
                                      </td>
                                      <td>
                                        <a
                                          href="/admin/customer-payment-detail"
                                          className="detail-icons"
                                        >
                                          <i className="fa fa-eye"></i>
                                        </a>
                                      </td>
                                    </tr>
                                    <tr role="row">
                                      <td>#1004</td>
                                      <td>Imran Khan</td>
                                      <td>Mobile Phones</td>
                                      <td>20-18-2020</td>
                                      <td>$1200</td>
                                      <td>
                                        <span className="badge badge-danger f-14">
                                          UnPaid
                                        </span>
                                      </td>
                                      <td>
                                        <a
                                          href="/admin/customer-payment-detail"
                                          className="detail-icons"
                                        >
                                          <i className="fa fa-eye"></i>
                                        </a>
                                      </td>
                                    </tr>
                                    <tr role="row">
                                      <td>#1005</td>
                                      <td>Imran Khan</td>
                                      <td>Mobile Phones</td>
                                      <td>20-18-2020</td>
                                      <td>$1200</td>
                                      <td>
                                        <span className="badge badge-primary f-14">
                                          Paid
                                        </span>
                                      </td>
                                      <td>
                                        <a
                                          href="/admin/customer-payment-detail"
                                          className="detail-icons"
                                        >
                                          <i className="fa fa-eye"></i>
                                        </a>
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
                    <div className="tab-pane" id="Supplier">
                      <div className="card-header pb-0">
                        <div className="d-flex justify-content-between">
                          <h4 className="card-title mg-b-0 datatable-link">
                            Supplier Payment List
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
                            id="example2_wrapper"
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
                                      <th>Supplier Name</th>
                                      <th>Tender Name</th>
                                      <th>Delivery Date</th>
                                      <th>Total Price</th>
                                      <th>Delivery Status</th>
                                      <th>Payment Status</th>
                                      <th>Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr role="row">
                                      <td>#1001</td>
                                      <td>Imran Khan</td>
                                      <td>Mobile Phones</td>
                                      <td>20-18-2020</td>
                                      <td>$1200</td>
                                      <td>
                                        <span className="badge badge-success f-14">
                                          Completed
                                        </span>
                                      </td>
                                      <td>
                                        <span className="badge badge-primary f-14">
                                          Paid
                                        </span>
                                      </td>
                                      <td>
                                        <a
                                          href="/admin/supplier-payment-detail"
                                          className="detail-icons"
                                        >
                                          <i className="fa fa-eye"></i>
                                        </a>
                                      </td>
                                    </tr>
                                    <tr role="row">
                                      <td>#1002</td>
                                      <td>Imran Khan</td>
                                      <td>Mobile Phones</td>
                                      <td>20-18-2020</td>
                                      <td>$1200</td>
                                      <td>
                                        <span className="badge badge-success f-14">
                                          Completed
                                        </span>
                                      </td>
                                      <td>
                                        <span className="badge badge-primary f-14">
                                          Paid
                                        </span>
                                      </td>
                                      <td>
                                        <a
                                          href="/admin/supplier-payment-detail"
                                          className="detail-icons"
                                        >
                                          <i className="fa fa-eye"></i>
                                        </a>
                                      </td>
                                    </tr>
                                    <tr role="row">
                                      <td>#1003</td>
                                      <td>Imran Khan</td>
                                      <td>Mobile Phones</td>
                                      <td>20-18-2020</td>
                                      <td>$1200</td>
                                      <td>
                                        <span className="badge badge-success f-14">
                                          Completed
                                        </span>
                                      </td>
                                      <td>
                                        <span className="badge badge-primary f-14">
                                          Paid
                                        </span>
                                      </td>
                                      <td>
                                        <a
                                          href="/admin/supplier-payment-detail"
                                          className="detail-icons"
                                        >
                                          <i className="fa fa-eye"></i>
                                        </a>
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
                    <div className="tab-pane" id="Commsion">
                      <div className="card-header pb-0">
                        <div className="d-flex justify-content-between">
                          <h4 className="card-title mg-b-0 datatable-link">
                            Commission List
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
                            id="example4_wrapper"
                            className="dataTables_wrapper dt-bootstrap4"
                          >
                            <div className="row">
                              <div className="col-sm-12">
                                <table
                                  className="table text-md-nowrap dataTable"
                                  id="example4"
                                >
                                  <thead>
                                    <tr role="row">
                                      <th>Sr.No</th>
                                      <th>Customer Name</th>
                                      <th>Tender Name</th>
                                      <th>Delivery Date</th>
                                      <th>Commission</th>
                                      <th>Payment Status</th>
                                      <th>Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr role="row">
                                      <td>#1001</td>
                                      <td>Imran Khan</td>
                                      <td>Mobile Phones</td>
                                      <td>20-18-2020</td>
                                      <td>$1200</td>
                                      <td>
                                        <span className="badge badge-primary f-14">
                                          Paid
                                        </span>
                                      </td>
                                      <td>
                                        <a
                                          href="/admin/commission-detail"
                                          className="detail-icons"
                                        >
                                          <i className="fa fa-eye"></i>
                                        </a>
                                      </td>
                                    </tr>
                                    <tr role="row">
                                      <td>#1002</td>
                                      <td>Imran Khan</td>
                                      <td>Mobile Phones</td>
                                      <td>20-18-2020</td>
                                      <td>$1200</td>
                                      <td>
                                        <span className="badge badge-primary f-14">
                                          Paid
                                        </span>
                                      </td>
                                      <td>
                                        <a
                                          href="/admin/commission-detail"
                                          className="detail-icons"
                                        >
                                          <i className="fa fa-eye"></i>
                                        </a>
                                      </td>
                                    </tr>
                                    <tr role="row">
                                      <td>#1003</td>
                                      <td>Imran Khan</td>
                                      <td>Mobile Phones</td>
                                      <td>20-18-2020</td>
                                      <td>$1200</td>
                                      <td>
                                        <span className="badge badge-primary f-14">
                                          Paid
                                        </span>
                                      </td>
                                      <td>
                                        <a
                                          href="/admin/commission-detail"
                                          className="detail-icons"
                                        >
                                          <i className="fa fa-eye"></i>
                                        </a>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminPaymentList;
