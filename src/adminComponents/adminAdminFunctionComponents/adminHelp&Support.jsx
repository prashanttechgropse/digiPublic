import React, { Component } from "react";
import { Link } from "react-router-dom";
import pad from "../../services/padding";
import httpService from "../../services/httpService";
import { toast } from "react-toastify";
class AdminHelpSupport extends Component {
  state = {
    complainList: [],
  };
  componentDidMount = async () => {
    try {
      const { data } = await httpService.get(
        `${process.env.REACT_APP_APIENDPOINT}/admin/complainList`
      );
      this.setState({ complainList: data.complainList });
      console.log(data.complainList);
    } catch (error) {
      toast.error(error.message);
    }
  };

  renderComplainList = () => {
    let srNo = 0;
    return this.state.complainList.map((complain) => {
      srNo++;
      return (
        <tr key={srNo} role="row">
          <td>{pad(srNo, 3)}</td>
          <td>{complain.user.details.firstName}</td>
          <td>{complain.user.email}</td>
          <td>{complain.subject}</td>
          <td>
            <span
              className={`badge badge-${
                complain.status ? `success` : `danger`
              } f-14`}
            >
              {complain.status ? "Replied" : "Not Replied"}
            </span>
          </td>
          <td>
            <Link
              to={`/admin/complainDetail/${complain._id}`}
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
    return (
      <div className="container-fluid">
        <div className="breadcrumb-header justify-content-between">
          <div className="my-auto">
            <div className="d-flex">
              <h4 className="content-title mb-0 my-auto">Page</h4>
              <span className="text-muted mt-1 tx-13 ml-2 mb-0">
                / Help & Support
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
                    Complain List
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
                        {this.state.complainList.length === 0 ? (
                          <h1 className="no-data-found">
                            "you dont have any complains yet"
                          </h1>
                        ) : (
                          <table
                            className="table text-md-nowrap dataTable"
                            id="example1"
                          >
                            <thead>
                              <tr role="row">
                                <th>Sr No</th>
                                <th>Name</th>
                                <th>Email Id</th>
                                <th>Subject</th>
                                <th>status</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>{this.renderComplainList()}</tbody>
                          </table>
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
    );
  }
}

export default AdminHelpSupport;
