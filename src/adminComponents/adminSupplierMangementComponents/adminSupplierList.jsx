import React, { Component } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../microComponents/pagination";
import { paginate } from "../../utilities/paginate";
import httpService from "../../services/httpService";
import { toast } from "react-toastify";
import pad from "../../services/padding";

class AdminSupplierList extends Component {
  state = {
    currentPage: "",
    pageSize: "",
    supplierList: "",
    displaySupplierList: "",
  };

  constructor(props) {
    super(props);
    this.state.currentPage = 1;
    this.state.pageSize = 4;
  }

  componentDidMount = async () => {
    try {
      const { data } = await httpService.get(
        `${process.env.REACT_APP_APIENDPOINT}/admin/suppliers`
      );

      this.setState({ supplierList: data.supplierList });

      const displaySupplierList = paginate(
        data.supplierList,
        this.state.currentPage,
        this.state.pageSize
      );
      this.setState({ displaySupplierList });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      return;
    }
  };

  handlePageChange = async (pageNumber) => {
    this.setState({ currentPage: pageNumber });
    const displaySupplierList = paginate(
      this.state.supplierList,
      pageNumber,
      this.state.pageSize
    );
    await this.setState({ displaySupplierList });
  };

  renderSupplierList = () => {
    let srNo = (this.state.currentPage - 1) * this.state.pageSize;
    if (this.state.displaySupplierList === "") return;
    return this.state.displaySupplierList.map((supplier) => {
      srNo++;
      return (
        <tr role="row" key={srNo}>
          <td>{pad(srNo, 3)}</td>
          <td>{supplier.firstName}</td>
          <td>{supplier.entityRegistrationNo}</td>
          <td>{supplier.contactNumber}</td>
          <td>{`${supplier.tendersAwarded.length} Tenders`}</td>
          <td>
            <span className="badge badge-primary f-14">Active</span>
          </td>
          <td>
            <Link
              to={`/admin/supplierDetails/${supplier._id}`}
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
    if (this.state.supplierList === "") return null;
    return (
      <div className="container-fluid">
        <div className="breadcrumb-header justify-content-between">
          <div className="my-auto">
            <div className="d-flex">
              <h4 className="content-title mb-0 my-auto">Page</h4>
              <span className="text-muted mt-1 tx-13 ml-2 mb-0">
                / Supplier List
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
                    Supplier List
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
                              <th>Sr No</th>
                              <th>Name</th>
                              <th>Reference No</th>
                              <th>Contact No</th>
                              <th>No Of Tenders</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>{this.renderSupplierList()}</tbody>
                        </table>
                      </div>
                    </div>

                    <Pagination
                      currentPage={this.state.currentPage}
                      totalItemsCount={this.state.supplierList.length}
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
    );
  }
}

export default AdminSupplierList;
