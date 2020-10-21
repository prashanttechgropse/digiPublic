import React from "react";
import Joi from "joi-browser";
import Form from "./form/form";
import { Link } from "react-router-dom";
import { pad } from "lodash";
import httpService from "../services/httpService";
import { toast } from "react-toastify";
class HelpSupport extends Form {
  state = {
    complainList: [],
    formData: {
      subject: "",
      query: "",
    },
    errors: {},
  };

  schema = {
    subject: Joi.string().required(),
    query: Joi.string().required(),
  };

  componentDidMount = async () => {
    try {
      const { data } = await httpService.get(
        `${process.env.REACT_APP_APIENDPOINT}/user/complainList`
      );
      this.setState({ complainList: data.complainList });
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
          <td>{complain.complainRefNo}</td>
          <td>{`${complain.creationDate
            .toString()
            .substring(0, 10)} || ${complain.creationDate
            .toString()
            .substring(11, 16)}`}</td>
          <td>
            <Link
              to={`complain-detail/${complain._id}`}
              className="detail-icons"
            >
              View Detail
            </Link>
          </td>
        </tr>
      );
    });
  };

  doSubmit = async () => {
    try {
      const { data } = await httpService.post(
        `${process.env.REACT_APP_APIENDPOINT}/user/registerComplain`,
        {
          subject: this.state.formData.subject,
          query: this.state.formData.query,
        }
      );
      toast.success(data.message);
      if (data) {
        window.location.reload();
      }
    } catch (error) {
      toast.error("complaint could not be registered. kindly try again");
      window.location.reload();
    }
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="breadcrumb-header justify-content-between">
          <div className="my-auto">
            <div className="d-flex">
              <h4 className="content-title mb-0 my-auto">
                Complaint Management
              </h4>
              <span className="text-muted mt-1 tx-13 ml-2 mb-0">
                / Complaint List
              </span>
            </div>
          </div>
          <div className="d-flex my-xl-auto right-content">
            <div className="pr-1 mb-3 mb-xl-0">
              <a
                href="#complaintcall"
                data-toggle="modal"
                className="btn btn-primary "
              >
                <i className="fa fa-plus"></i> Create New Complaint
              </a>
            </div>
          </div>
        </div>
        <div className="row row-sm">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header pb-0">
                <div className="d-flex justify-content-between">
                  <h4 className="card-title mg-b-0 datatable-link">
                    Your Complaint List
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
                                <th>Sr no</th>
                                <th>Complaint I'd</th>
                                <th>Date & Time</th>
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
        <div className="modal" id="complaintcall">
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
                      Create Your Complaint
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
                          {this.renderInput("subject", "Subject")}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12 col-md-12">
                          {this.renderTextArea("query", "")}
                        </div>
                        <div className="col-lg-12 col-md-12 mg-t-10 mg-t-30">
                          {this.renderButton(
                            "Submit",
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

export default HelpSupport;
