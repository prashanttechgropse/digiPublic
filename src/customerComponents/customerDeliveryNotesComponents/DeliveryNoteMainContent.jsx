import React, { Component } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../microComponents/pagination";
import { toast } from "react-toastify";
import { paginate } from "../../utilities/paginate";

import httpService from "../../services/httpService";
import pad from "../../services/padding";
class DeliveryNoteMainContent extends Component {
  state = {
    profileType: "",
    tenderList: null,
    displayTenderList: null,
    currentPage: null,
    pageSize: null,
  };

  constructor(props) {
    super(props);
    this.state.currentPage = 1;
    this.state.pageSize = 4;
  }

  async componentDidMount() {
    try {
      let res;
      if (this.props.match.path.includes("/admin")) {
        this.setState({ profileType: "admin" });
        res = await httpService.get(
          `${process.env.REACT_APP_APIENDPOINT}/admin/deliveryNoteTenderList`
        );
      }
      if (this.props.match.path.includes("/customer")) {
        this.setState({ profileType: "customer" });
        res = await httpService.get(
          `${process.env.REACT_APP_APIENDPOINT}/customer/deliveryNoteTenderList`
        );
      }
      if (this.props.match.path.includes("/receiver")) {
        this.setState({ profileType: "receiver" });
        res = await httpService.get(
          `${process.env.REACT_APP_APIENDPOINT}/receiver/deliveryNoteTenderList`
        );
      }
      if (this.props.match.path.includes("/supplier")) {
        this.setState({ profileType: "supplier" });
        res = await httpService.get(
          `${process.env.REACT_APP_APIENDPOINT}/supplier/deliveryNoteTenderList`
        );
      }
      if (this.props.match.path.includes("/employee")) {
        this.setState({ profileType: "employee" });
        res = await httpService.get(
          `${process.env.REACT_APP_APIENDPOINT}/employee/deliveryNoteTenderList`
        );
      }
      const { tenderList } = res.data;
      await this.setState({ tenderList });
      const displayTenderList = paginate(
        this.state.tenderList,
        this.state.currentPage,
        this.state.pageSize
      );
      await this.setState({ displayTenderList });
    } catch (error) {
      toast.error(error.message);
      return;
    }
  }

  handlePageChange = async (pageNumber) => {
    this.setState({ currentPage: pageNumber });
    const displayTenderList = paginate(
      this.state.tenderList,
      pageNumber,
      this.state.pageSize
    );
    await this.setState({ displayTenderList });
  };

  renderTenderTable = () => {
    let srNo = (this.state.currentPage - 1) * this.state.pageSize;

    let tenderList = this.state.displayTenderList;
    if (tenderList === null) return;
    return tenderList.map((tender) => {
      srNo++;
      return (
        <tr key={srNo} role="row">
          <td>
            <Link
              to={`/${this.state.profileType}/deliveryNoteDetails/${tender._id}`}
            >
              {pad(srNo, 3)}
            </Link>
          </td>
          <td>
            <Link to={`/${this.state.profileType}/tenderDetails/${tender._id}`}>
              {tender._id.toString().substring(18, 24)}
            </Link>
          </td>
          <td>{tender.suppliedBy.firstName}</td>
          <td>{`DN${tender.tenderRefNo}`}</td>
          <td>{tender.deliveryLocation}</td>
          {this.state.profileType === "customer" ? (
            <td>
              {tender.receiver ? tender.receiver.name : "no receiver assigned"}
            </td>
          ) : (
            ""
          )}
          <td>
            <span
              className={`badge badge-${
                tender.status === "completed" ? "success" : "danger"
              } f-14`}
            >
              {tender.status}
            </span>
          </td>
        </tr>
      );
    });
  };
  render() {
    if (this.state.tenderList === null) return null;
    if (this.state.tenderList.length === 0) {
      return (
        <h1 className="no-data-found">You Dont Have Any Delivery Notes yet</h1>
      );
    }
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
                              {this.state.profileType === "customer" ? (
                                <th>Receiver Name</th>
                              ) : (
                                ""
                              )}
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>{this.renderTenderTable()} </tbody>
                        </table>
                        <div className="row">
                          <div className="col-sm-12">
                            <Pagination
                              currentPage={this.state.currentPage}
                              totalItemsCount={this.state.tenderList.length}
                              pageSize={this.state.pageSize}
                              onPageChange={this.handlePageChange}
                            />
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

export default DeliveryNoteMainContent;
