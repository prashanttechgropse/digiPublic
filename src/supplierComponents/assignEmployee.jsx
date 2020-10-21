import React from "react";
import httpService from "../services/httpService";

import { toast } from "react-toastify";
import Pagination from "../microComponents/pagination";
import { paginate } from "../utilities/paginate";
import { Link } from "react-router-dom";
import Form from "../macroComponents/form/form";
import Joi from "joi-browser";
import pad from "../services/padding";

class AssignEmployee extends Form {
  state = {
    tenderList: null,
    employeeList: null,
    displayTenderList: null,
    currentPage: null,
    pageSize: null,
    formData: {
      employeeId: "",
      tenderId: null,
    },
    errors: {},
  };
  constructor(props) {
    super(props);
    this.state.currentPage = 1;
    this.state.pageSize = 4;
  }
  schema = {
    employeeId: Joi.string().required(),
    tenderId: Joi.string().required(),
  };

  async componentDidMount() {
    try {
      {
        const { data } = await httpService.get(
          `${process.env.REACT_APP_APIENDPOINT}/supplier/employeeList`
        );
        const { employeeList } = data;
        await this.setState({ employeeList });
        console.log(this.state.employeeList);
      }
      const { data } = await httpService.get(
        `${process.env.REACT_APP_APIENDPOINT}/supplier/myTenderList`
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

  populateTenderId = async (tenderId) => {
    const formData = { ...this.state.formData };
    formData.tenderId = tenderId;
    await this.setState({ formData });
  };

  doSubmit = async () => {
    await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/supplier/assignEmployee`,
      this.state.formData
    );
    window.location.reload();
  };

  renderTenderList = () => {
    const tenderList = this.state.displayTenderList;
    if (tenderList === null) return null;
    let srNo = (this.state.currentPage - 1) * this.state.pageSize;

    return tenderList.map((tender) => {
      srNo++;

      return (
        <tr role="row" key={srNo}>
          <td>{pad(srNo, 3)}</td>
          <td>
            <Link to={`/supplier/tenderDetails/${tender._id}`}>
              {tender._id.toString().substring(18, 24)}
            </Link>
          </td>
          <td>{tender.budgetAmount}</td>
          <td>{tender.creationDate.toString().substring(0, 10)}</td>
          <td>{tender.deliveryDate.toString().substring(0, 10)}</td>
          <td>
            <span className="badge badge-primary f-14">
              {tender.employee ? tender.employee.name : "no employee"}
            </span>
          </td>
          <td>
            <button
              href="#assignemployee"
              data-toggle="modal"
              className="btn btn-main-primary pd-x-20 w-100"
              disabled={tender.employee}
              onClick={() => this.populateTenderId(tender._id)}
            >
              Assign Employee
            </button>
          </td>
        </tr>
      );
    });
  };

  render() {
    if (this.state.tenderList === null) return null;
    if (this.state.tenderList.length === 0) {
      return (
        <h1 className="no-data-found">you dont have any awarded tenders yet</h1>
      );
    }
    return (
      <div className="container-fluid">
        <div className="breadcrumb-header justify-content-between">
          <div className="my-auto">
            <div className="d-flex">
              <h4 className="content-title mb-0 my-auto">Tender</h4>
              <span className="text-muted mt-1 tx-13 ml-2 mb-0">
                /Assign Employee
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
                        <table className="table text-md-nowrap dataTable">
                          <thead>
                            <tr role="row">
                              <th>Sr no</th>
                              <th>Tender I'd</th>
                              <th>Tender Amount</th>
                              <th>Date of Creation</th>
                              <th>Date of Delivery</th>
                              <th>Assign Employee</th>
                              <th>Action</th>
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
        <div className="modal" id="assignemployee">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content tx-size-sm">
              <div className="modal-body tx-center pd-y-20 pd-x-20">
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                >
                  <span aria-hidden="true">×</span>
                </button>
                <div className="main-section">
                  <div className="card-body">
                    <div className="main-content-label mg-b-5">
                      Assign Driver For Tender
                    </div>
                    <p className="mg-b-20">
                      Lorem Ipsum is simply dummy text of the printing .
                    </p>
                    <form
                      action=""
                      id="selectForm"
                      name="selectForm"
                      noValidate=""
                      data-select2-id="selectForm"
                    >
                      <div className="row">
                        <div className="col-lg-12 col-md-12">
                          {this.renderSelect(
                            "employeeId",
                            "List of employee",
                            this.state.employeeList.filter(
                              (employee) => employee.user.isApproved === true
                            )
                          )}
                        </div>
                        <div className="col-lg-12 col-md-12 mg-t-10 mg-t-30">
                          {this.renderButton(
                            "assign Employee",
                            this.handleSubmit,
                            "btn btn-main-primary pd-x-20 w-100"
                          )}
                        </div>
                      </div>
                    </form>
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

export default AssignEmployee;
