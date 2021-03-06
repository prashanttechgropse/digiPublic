import React, { Component } from "react";
import httpService from "../../services/httpService";
import pad from "../../services/padding";

import { toast } from "react-toastify";
import Pagination from "../../microComponents/pagination";
import { paginate } from "../../utilities/paginate";
import { Link } from "react-router-dom";
class CustomerTransactionList extends Component {
  state = {
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
      const { data } = await httpService.get(
        `${process.env.REACT_APP_APIENDPOINT}/customer/tenderList/completed`
      );
      const { tenderList } = data;
      await this.setState({ tenderList });
      console.log(tenderList);
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

  renderTenderList = () => {
    const tenderList = this.state.displayTenderList;
    if (tenderList === null) return null;
    let srNo = (this.state.currentPage - 1) * this.state.pageSize;

    return tenderList.map((tender) => {
      srNo++;
      return (
        <tr key={srNo} role="row">
          <td>{pad(srNo, 3)}</td>
          <td>
            <Link to={`/customer/tenderDetails/${tender._id}`}>
              {tender._id.toString().substring(18, 24)}
            </Link>
          </td>
          <td>"hard coded"</td>
          <td>{tender.createdBy.firstName}</td>
          <td>{tender.deliveryLocation}</td>
          <td>{`${tender.budgetAmount}.00 USD`}</td>
          <td>
            <span
              className={`badge badge-${
                tender.paymentStatus === "paid" ? "success" : "danger"
              } f-14`}
            >
              {tender.paymentStatus}
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
        <h1 className="no-data-found">you dont have any transactions yet</h1>
      );
    }

    return (
      <div className="container-fluid">
        <div className="breadcrumb-header justify-content-between">
          <div className="my-auto">
            <div className="d-flex">
              <h4 className="content-title mb-0 my-auto">Tender</h4>
              <span className="text-muted mt-1 tx-13 ml-2 mb-0">
                / Transaction List
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
                    Your Transaction List
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
                              <th>Sr No</th>
                              <th>Tender I'D</th>
                              <th>Transaction Date</th>
                              <th>Customer Name</th>
                              <th>Location</th>
                              <th>Amount</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>{this.renderTenderList()}</tbody>
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

export default CustomerTransactionList;
