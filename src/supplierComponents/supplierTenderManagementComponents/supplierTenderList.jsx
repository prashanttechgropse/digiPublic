import React, { Component } from "react";
import httpService from "../../services/httpService";
import pad from "../../services/padding";

import { toast } from "react-toastify";
import Pagination from "../../microComponents/pagination";
import { paginate } from "../../utilities/paginate";
import { Link } from "react-router-dom";
class TenderList extends Component {
  state = {
    tenderList: [],
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
        `${process.env.REACT_APP_APIENDPOINT}/tenderList`
      );
      const { tenderList } = data;
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

  renderTenderList = () => {
    const tenderList = this.state.displayTenderList;
    if (tenderList === null) return;
    let srNo = (this.state.currentPage - 1) * this.state.pageSize;
    let styleOfBadge;
    return tenderList.map((tender) => {
      srNo++;
      if (tender.status === "completed") styleOfBadge = "success";
      else if (tender.status === "cancelled") styleOfBadge = "danger";
      else if (tender.status === "awarded") styleOfBadge = "primary";
      else {
        styleOfBadge = "warning";
      }

      return (
        <tr role="row" key={srNo}>
          <td>{pad(srNo, 3)}</td>
          <td>
            <Link
              to={
                tender.status === "inProcess"
                  ? `/supplier/tenderDetails/${tender._id}`
                  : `/supplier/myBidDetails/${tender._id}`
              }
            >
              {tender._id.toString().substring(18, 24)}
            </Link>
          </td>
          <td>{`${tender.budgetAmount} USD`}</td>
          <td>{`${tender.creationDate.toString().substring(0, 10)}`}</td>
          <td>{tender.deliveryDate.toString().substring(0, 10)}</td>
          <td>{tender.closingDate.toString().substring(0, 10)}</td>

          <td>
            <span className={`badge badge-${styleOfBadge} f-14`}>
              {tender.status === "completed"
                ? tender.paymentStatus
                : tender.status}
            </span>
          </td>
        </tr>
      );
    });
  };

  render() {
    if (this.state.tenderList.length === 0)
      return <h1 className="no-data-found">No Tenders Yet</h1>;
    return (
      <div className="container-fluid">
        <div className="breadcrumb-header justify-content-between">
          <div className="my-auto">
            <div className="d-flex">
              <h4 className="content-title mb-0 my-auto">Tender</h4>
              <span className="text-muted mt-1 tx-13 ml-2 mb-0">
                / Tender List
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
                    Your Tender List
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
                        <table className="table text-md-nowrap dataTable ">
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

export default TenderList;
