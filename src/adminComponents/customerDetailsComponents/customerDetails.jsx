import React, { Component } from "react";
import { Link } from "react-router-dom";
import httpService from "../../services/httpService";
import pad from "../../services/padding";
import { toast } from "react-toastify";
const fileDownload = require("js-file-download");
class CustomerDetails extends Component {
  state = { receiverList: "" };

  componentDidMount = async () => {
    try {
      const { data } = await httpService.get(
        `${process.env.REACT_APP_APIENDPOINT}/admin/receiverList/${this.props.match.params.customerId}`
      );
      const { receiversList: receiverList } = data;
      await this.setState({ receiverList });
      console.log(this.state.receiverList);
    } catch (error) {
      toast.error(error.message);
      return;
    }
  };

  downloadProfileDoc = async () => {
    const { tender } = this.state;
    try {
      const { data } = await httpService.get(
        `${process.env.REACT_APP_APIENDPOINT}/admin/registrationDocuments/${this.props.customer.user._id}/${this.props.customer.profileDoc}`,
        {
          responseType: "blob",
        }
      );
      await fileDownload(data, `${this.props.customer.profileDoc}`);
    } catch (error) {
      toast.error(error.message);
      return;
    }
  };

  downloadVatDoc = async () => {
    if (this.props.customer.vatDoc) {
      const { tender } = this.state;
      try {
        const { data } = await httpService.get(
          `${process.env.REACT_APP_APIENDPOINT}/admin/registrationDocuments/${this.props.customer.user._id}/${this.props.customer.vatDoc}`,
          {
            responseType: "blob",
          }
        );
        await fileDownload(data, `${this.props.customer.vatDoc}`);
      } catch (error) {
        toast.error(error.message);
        return;
      }
    } else return;
  };

  downloadBankDoc = async () => {
    const { tender } = this.state;
    try {
      const { data } = await httpService.get(
        `${process.env.REACT_APP_APIENDPOINT}/admin/bankDocuments/${this.props.customer.user._id}/${this.props.customer.bankDetails.bankDoc}`,
        {
          responseType: "blob",
        }
      );
      await fileDownload(data, `${this.props.customer.bankDetails.bankDoc}`);
    } catch (error) {
      toast.error(error.message);
      return;
    }
  };

  renderReceiverList = () => {
    let srNo = 0;

    let receiverList = this.state.receiverList;
    return receiverList.map((receiver) => {
      srNo++;
      return (
        <tr role="row" key={srNo}>
          <td>{srNo}</td>
          <td>{receiver.name}</td>
          <td>{receiver.physicalAddress}</td>
          <td>{receiver.postalAddress}</td>
          <td>{receiver.contactNumber}</td>
        </tr>
      );
    });
  };

  renderTenderTable = () => {
    let srNo = 0;

    let tenderList = this.props.customer.tenders.filter(
      (tender) => tender.isPublished === true
    );
    return tenderList.map((tender) => {
      srNo++;

      return (
        <tr role="row" key={srNo}>
          <td>{pad(srNo, 3)}</td>
          <td>{tender._id.toString().substring(18, 24)}</td>
          <td>{tender.deliveryDate.toString().substring(0, 10)}</td>
          <td>{tender.budgetAmount}</td>
          <td>$200</td>
          <td>
            <Link
              to={`/admin/tenderDetails/${tender._id}`}
              className="detail-icons"
            >
              <i className="fa fa-eye"></i>
            </Link>
          </td>
        </tr>
      );
    });
  };

  render() {
    const { customer } = this.props;
    return (
      <div className="row row-sm">
        <div className="col-xl-12">
          <div className="card">
            <div className="panel panel-primary tabs-style-2">
              <div className="tab-menu-heading">
                <div className="tabs-menu1">
                  <ul className="nav panel-tabs main-nav-line customer-tabs">
                    <li>
                      <a
                        href="#GeneralDetail"
                        className="nav-link active"
                        data-toggle="tab"
                      >
                        General Detail
                      </a>
                    </li>
                    <li>
                      <a
                        href="#BankingDetail"
                        className="nav-link"
                        data-toggle="tab"
                      >
                        Banking Detail
                      </a>
                    </li>
                    <li>
                      <a
                        href="#TenderDetail"
                        className="nav-link"
                        data-toggle="tab"
                      >
                        Tender Detail
                      </a>
                    </li>
                    <li>
                      <a
                        href="#PaymentDetail"
                        className="nav-link"
                        data-toggle="tab"
                      >
                        Commsion Detail
                      </a>
                    </li>
                    <li>
                      <a
                        href="#ReceiverDetail"
                        className="nav-link"
                        data-toggle="tab"
                      >
                        Receiver Detail
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="panel-body tabs-menu-body main-content-body-right border">
                <div className="tab-content">
                  <div className="tab-pane active" id="GeneralDetail">
                    <div className="card-header pb-0">
                      <div className="d-flex justify-content-between">
                        <h4 className="card-title mg-b-0 datatable-link">
                          General Detail
                        </h4>
                      </div>
                      <p className="tx-12 tx-gray-500 mb-2">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </p>
                    </div>
                    <div className="">
                      <div className="main-contact-info-body p-4 ps">
                        <div className="media-list pb-0">
                          <div className="media">
                            <div className="media-body">
                              <div>
                                <label> First Name</label>
                                <span className="tx-medium">
                                  {customer.firstName}
                                </span>
                              </div>
                              <div>
                                <label>Last Name</label>
                                <span className="tx-medium">
                                  {customer.lastName}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="media">
                            <div className="media-body">
                              <div>
                                <label> Organization Type</label>
                                <span className="tx-medium">
                                  {customer.organisationType}
                                </span>
                              </div>
                              <div>
                                <label>ID Number</label>
                                <span className="tx-medium">
                                  {customer.idNumber}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="media">
                            <div className="media-body">
                              <div>
                                <label> Company Name</label>
                                <span className="tx-medium">
                                  {customer.companyName}
                                </span>
                              </div>
                              <div>
                                <label>Entity Registration No</label>
                                <span className="tx-medium">
                                  {customer.entityRegistrationNo}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="media">
                            <div className="media-body">
                              <div>
                                <label> VAT Registration</label>
                                <span className="tx-medium">
                                  {customer.vatRegistration}
                                </span>
                              </div>
                              <div>
                                <label>VAT Number</label>
                                <span className="tx-medium">
                                  {customer.vatNumber}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="media">
                            <div className="media-body">
                              <div>
                                <label> Trading As</label>
                                <span className="tx-medium">
                                  {customer.tradingAs}
                                </span>
                              </div>
                              <div>
                                <label>Website </label>
                                <span className="tx-medium">
                                  {customer.website}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="media">
                            <div className="media-body">
                              <div>
                                <label> Contact Number</label>
                                <span className="tx-medium">
                                  {customer.contactNo}
                                </span>
                              </div>
                              <div>
                                <label>Mo Of Receivers </label>
                                <span className="tx-medium">5</span>
                              </div>
                            </div>
                          </div>
                          <div className="media">
                            <div className="media-body">
                              <div>
                                <label>Customer Document</label>
                                <span className="tx-medium">
                                  <Link
                                    to="#"
                                    onClick={this.downloadProfileDoc}
                                  >
                                    <i className="fa fa-file"></i> Download
                                  </Link>
                                </span>
                              </div>
                            </div>
                            {this.props.customer.vatDoc ? (
                              <div className="media-body">
                                <div>
                                  <label>Customer Vat Document</label>
                                  <span className="tx-medium">
                                    <Link to="#" onClick={this.downloadVatDoc}>
                                      <i className="fa fa-file"></i> Download
                                    </Link>
                                  </span>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            <div className="media-body">
                              <div>
                                <label>Customer Vat Document</label>
                                <span className="tx-medium">
                                  <Link to="#" onClick={this.downloadVatDoc}>
                                    <i className="fa fa-file"></i> Download
                                  </Link>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane" id="BankingDetail">
                    <div className="card-header pb-0">
                      <div className="d-flex justify-content-between">
                        <h4 className="card-title mg-b-0 datatable-link">
                          Banking Detail
                        </h4>
                      </div>
                      <p className="tx-12 tx-gray-500 mb-2">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </p>
                    </div>
                    <div className="">
                      <div className="main-contact-info-body p-4 ps">
                        <div className="media-list pb-0">
                          <div className="media">
                            <div className="media-body">
                              <div>
                                <label>Email Id</label>
                                <span className="tx-medium">
                                  {customer.user.email}
                                </span>
                              </div>
                              <div>
                                <label>Bank Name</label>
                                <span className="tx-medium">
                                  {customer.bankDetails.bankName}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="media">
                            <div className="media-body">
                              <div>
                                <label> Account Number</label>
                                <span className="tx-medium">
                                  {customer.bankDetails.accountNo}
                                </span>
                              </div>
                              <div>
                                <label>Account Type</label>
                                <span className="tx-medium">
                                  {customer.bankDetails.accountType}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="media">
                            <div className="media-body">
                              <div>
                                <label> Branch Code</label>
                                <span className="tx-medium">
                                  {customer.bankDetails.branchCode}
                                </span>
                              </div>
                              <div>
                                <label>Attach Documnet</label>
                                <span className="tx-medium">
                                  <Link to="#" onClick={this.downloadBankDoc}>
                                    <i className="fa fa-file"></i> Download
                                  </Link>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane" id="TenderDetail">
                    <div className="card-header pb-0">
                      <div className="d-flex justify-content-between">
                        <h4 className="card-title mg-b-0 datatable-link">
                          Tender List
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
                                    <th>Reference No</th>
                                    <th>Delivery Date</th>
                                    <th>Total Price</th>
                                    <th>Total Commsion</th>
                                    <th>Action</th>
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
                  <div className="tab-pane" id="PaymentDetail">
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
                                    <th>Customer Name</th>
                                    <th>Tender Title</th>
                                    <th>Delivery Date</th>
                                    <th>Supplier Name</th>
                                    <th>Total Commision</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr role="row">
                                    <td>#1001</td>
                                    <td>Hamid Ansari</td>
                                    <td>Mobile Phones</td>
                                    <td>20-18-2020</td>
                                    <td>Mo Danish</td>
                                    <td>$200</td>
                                    <td>
                                      <a
                                        href="/admin/customer-commision-detail"
                                        className="detail-icons"
                                      >
                                        <i className="fa fa-eye"></i>
                                      </a>
                                    </td>
                                  </tr>
                                  <tr role="row">
                                    <td>#1002</td>
                                    <td>Hamid Ansari</td>
                                    <td>Mobile Phones</td>
                                    <td>20-18-2020</td>
                                    <td>Mo Danish</td>
                                    <td>$200</td>
                                    <td>
                                      <a
                                        href="/admin/customer-commision-detail"
                                        className="detail-icons"
                                      >
                                        <i className="fa fa-eye"></i>
                                      </a>
                                    </td>
                                  </tr>
                                  <tr role="row">
                                    <td>#1003</td>
                                    <td>Hamid Ansari</td>
                                    <td>Mobile Phones</td>
                                    <td>20-18-2020</td>
                                    <td>Mo Danish</td>
                                    <td>$200</td>
                                    <td>
                                      <a
                                        href="/admin/customer-commision-detail"
                                        className="detail-icons"
                                      >
                                        <i className="fa fa-eye"></i>
                                      </a>
                                    </td>
                                  </tr>
                                  <tr role="row">
                                    <td>#1004</td>
                                    <td>Hamid Ansari</td>
                                    <td>Mobile Phones</td>
                                    <td>20-18-2020</td>
                                    <td>Mo Danish</td>
                                    <td>$200</td>
                                    <td>
                                      <a
                                        href="/admin/customer-commision-detail"
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
                  <div className="tab-pane" id="ReceiverDetail">
                    <div className="card-header pb-0">
                      <div className="d-flex justify-content-between">
                        <h4 className="card-title mg-b-0 datatable-link">
                          Receiver List
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
                          id="example3_wrapper"
                          className="dataTables_wrapper dt-bootstrap4"
                        >
                          <div className="row">
                            <div className="col-sm-12">
                              {this.state.receiverList.length !== 0 ? (
                                <table
                                  className="table text-md-nowrap dataTable"
                                  id="example3"
                                >
                                  <thead>
                                    <tr role="row">
                                      <th>Sr.No</th>
                                      <th>Receiver Name</th>
                                      <th>Physical Address</th>
                                      <th>postal Address</th>
                                      <th>contact Number</th>
                                    </tr>
                                  </thead>
                                  <tbody>{this.renderReceiverList()}</tbody>
                                </table>
                              ) : (
                                <h1>no Receiver</h1>
                              )}
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

export default CustomerDetails;
