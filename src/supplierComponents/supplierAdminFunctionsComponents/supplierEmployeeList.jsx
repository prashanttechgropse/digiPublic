import React, { Component } from "react";
import httpService from "../../services/httpService";

import { toast } from "react-toastify";
import Pagination from "../../microComponents/pagination";
import { paginate } from "../../utilities/paginate";
import pad from "../../services/padding";
class SupplierEmployeeList extends Component {
  state = {
    employeeList: null,
    displayEmployeeList: null,
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
        `${process.env.REACT_APP_APIENDPOINT}/supplier/employeeList`
      );
      const { employeeList } = data;
      await this.setState({ employeeList });

      const displayEmployeeList = paginate(
        this.state.employeeList,
        this.state.currentPage,
        this.state.pageSize
      );
      await this.setState({ displayEmployeeList });
    } catch (error) {
      toast.error(error.message);
      return;
    }
  }

  handlePageChange = async (pageNumber) => {
    this.setState({ currentPage: pageNumber });
    const displayEmployeeList = paginate(
      this.state.employeeList,
      pageNumber,
      this.state.pageSize
    );
    await this.setState({ displayEmployeeList });
  };

  toggleReceiverStatus = async (employeeId) => {
    let previousEmployeeList = [...this.state.employeeList];
    try {
      let employeeList = [...this.state.employeeList];
      employeeList.map((employee) => {
        if (employee._id === employeeId) {
          employee.user.isApproved = !employee.user.isApproved;
          httpService.post(
            `${process.env.REACT_APP_APIENDPOINT}/supplier/changeEmployeeStatus`,
            {
              employeeId: employeeId,
              employeeStatus: employee.user.isApproved,
            }
          );
        }
        return null;
      });
      await this.setState({ employeeList });
    } catch (error) {
      this.setState({ employeeList: previousEmployeeList });
    }
  };

  renderReceiverTable = () => {
    let srNo = (this.state.currentPage - 1) * this.state.pageSize;

    let employeeList = this.state.displayEmployeeList;
    if (employeeList === null) return;
    return employeeList.map((employee) => {
      srNo++;
      return (
        <tr role="row" key={srNo}>
          <td>{pad(srNo, 3)}</td>
          <td>{employee.name}</td>
          <td>{employee.contactNumber}</td>
          <td>{employee.postalAddress}</td>
          <td>
            <div
              className={`main-toggle main-toggle-success ${
                employee.user.isApproved ? "on" : "off"
              }`}
            >
              <span
                onClick={() => this.toggleReceiverStatus(employee._id)}
              ></span>
            </div>
          </td>
        </tr>
      );
    });
  };

  render() {
    if (this.state.employeeList === null) return null;
    if (this.state.employeeList.length === 0) {
      return <h1 className="no-data-found">you dont have any employees yet</h1>;
    }
    return (
      <div className="container-fluid">
        <div className="breadcrumb-header justify-content-between">
          <div className="my-auto">
            <div className="d-flex">
              <h4 className="content-title mb-0 my-auto">Tender</h4>
              <span className="text-muted mt-1 tx-13 ml-2 mb-0">
                / Employee List
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
                    Your Employee List
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
                              <th>Conatact Person</th>
                              <th>Conatact Number</th>
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
                              totalItemsCount={this.state.employeeList.length}
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

export default SupplierEmployeeList;
