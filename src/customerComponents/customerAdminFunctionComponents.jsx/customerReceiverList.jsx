import React, { Component } from "react";
import httpService from "../../services/httpService";
import pad from "../../services/padding";

import { toast } from "react-toastify";
import Pagination from "../../microComponents/pagination";
import { paginate } from "../../utilities/paginate";

class CustomerReceiverlist extends Component {
  state = {
    receiverList: null,
    displayReceiverList: null,
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
        `${process.env.REACT_APP_APIENDPOINT}/customer/receiverList`
      );
      const { receiversList: receiverList } = data;
      await this.setState({ receiverList });
      console.log(this.state.receiverList);
      const displayReceiverList = paginate(
        this.state.receiverList,
        this.state.currentPage,
        this.state.pageSize
      );
      await this.setState({ displayReceiverList });
    } catch (error) {
      toast.error(error.message);
      return;
    }
  }

  handlePageChange = async (pageNumber) => {
    this.setState({ currentPage: pageNumber });
    const displayReceiverList = paginate(
      this.state.receiverList,
      pageNumber,
      this.state.pageSize
    );
    await this.setState({ displayReceiverList });
  };

  toggleReceiverStatus = async (receiverId) => {
    let previousReceiverList = [...this.state.receiverList];
    try {
      let receiverList = [...this.state.receiverList];
      receiverList.map((receiver) => {
        if (receiver._id === receiverId) {
          receiver.user.isApproved = !receiver.user.isApproved;
          httpService.post(
            `${process.env.REACT_APP_APIENDPOINT}/customer/changeReceiverStatus`,
            {
              receiverId: receiverId,
              receiverStatus: receiver.user.isApproved,
            }
          );
        }
        return null;
      });
      await this.setState({ receiverList });
    } catch (error) {
      this.setState({ receiverList: previousReceiverList });
    }
  };

  renderReceiverTable = () => {
    let srNo = (this.state.currentPage - 1) * this.state.pageSize;

    let receiverList = this.state.displayReceiverList;
    if (receiverList === null) return;
    return receiverList.map((receiver) => {
      srNo++;
      return (
        <tr key={srNo} role="row">
          <td>{pad(srNo, 3)}</td>
          <td>{receiver.name}</td>
          <td>{receiver.contactNumber}</td>
          <td>{receiver.postalAddress}</td>
          <td>
            <div
              className={`main-toggle main-toggle-success ${
                receiver.user.isApproved ? "on" : "off"
              }`}
            >
              <span
                onClick={() => this.toggleReceiverStatus(receiver._id)}
              ></span>
            </div>
          </td>
        </tr>
      );
    });
  };

  render() {
    if (this.state.receiverList === null) return null;
    if (this.state.receiverList.length === 0) {
      return <h1 className="no-data-found">you dont have any receivers yet</h1>;
    }
    return (
      <div className="container-fluid">
        <div className="breadcrumb-header justify-content-between">
          <div className="my-auto">
            <div className="d-flex">
              <h4 className="content-title mb-0 my-auto">Tender</h4>
              <span className="text-muted mt-1 tx-13 ml-2 mb-0">
                / Receiver List
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
                    Your Receiver List
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
                              <th>Code No</th>
                              <th>Contact Person</th>
                              <th>Contact Number</th>
                              <th>Postal Address</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>{this.renderReceiverTable()}</tbody>
                        </table>
                        <div className="row">
                          <div className="col-sm-12">
                            <Pagination
                              currentPage={this.state.currentPage}
                              totalItemsCount={this.state.receiverList.length}
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

export default CustomerReceiverlist;
