import React, { Component } from "react";
import { toast } from "react-toastify";
import httpService from "../services/httpService";
class UserComplainDetails extends Component {
  state = {
    complain: {
      _id: "",
      complainRefNo: "",
      creationDate: "",
      status: "",
      query: "",
      subject: "",
      reply: "",
    },
  };

  componentDidMount = async () => {
    try {
      const { data } = await httpService.get(
        `${process.env.REACT_APP_APIENDPOINT}/user/complainDetails/${this.props.match.params.complainId}`
      );
      this.setState({ complain: data.complain });
    } catch (error) {
      toast.error(error.message);
    }
  };

  renderAdminReply = () => {
    const { complain } = this.state;
    if (complain.status) {
      return (
        <div className="row row-sm">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body">
                <div className="main-contact-info-body p-4 ps">
                  <div className="media-list pb-0">
                    <div className="media">
                      <div className="media-body">
                        <div>
                          <label>Admin Reply</label>
                          <span className="tx-medium">{complain.reply}</span>
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
  };

  render() {
    const { complain } = this.state;
    return (
      <div className="container-fluid">
        <div className="breadcrumb-header justify-content-between">
          <div className="my-auto">
            <div className="d-flex">
              <h4 className="content-title mb-0 my-auto">
                Complaint Management
              </h4>
              <span className="text-muted mt-1 tx-13 ml-2 mb-0">
                / Complaint Detail
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
                    Complain Detail
                  </h4>
                </div>
                <p className="tx-12 tx-gray-500 mb-2">
                  Lorem Ipsum is simply dummy text industry.
                </p>
              </div>
              <div className="card-body">
                <div className="main-contact-info-body p-4 ps">
                  <div className="media-list pb-0">
                    <div className="media">
                      <div className="media-body">
                        <div>
                          <label> Complaint Reference Number</label>
                          <span className="tx-medium">
                            {complain.complainRefNo}
                          </span>
                        </div>
                        <div>
                          <label>Date & Time</label>
                          <span className="tx-medium">
                            {`${complain.creationDate
                              .toString()
                              .substring(
                                0,
                                10
                              )} || ${complain.creationDate
                              .toString()
                              .substring(11, 16)}`}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="media">
                      <div className="media-body">
                        <div>
                          <label>Query</label>
                          <span className="tx-medium">{complain.query}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.renderAdminReply()}
      </div>
    );
  }
}

export default UserComplainDetails;
