import React from "react";
import httpService from "../../services/httpService";
import { toast } from "react-toastify";
import Form from "../../macroComponents/form/form";
import Joi from "joi-browser";
class AdminComplaintDetails extends Form {
  state = {
    userName: "",
    userEmail: "",
    complainStatus: "",
    complain: {
      query: "",
      subject: "",
    },
    formData: {
      reply: "",
    },
    errors: {},
  };

  schema = {
    reply: Joi.string().required(),
  };

  componentDidMount = async () => {
    try {
      const { data } = await httpService.get(
        `${process.env.REACT_APP_APIENDPOINT}/admin/complainDetails/${this.props.match.params.complainId}`
      );
      this.setState({
        complain: data.complain,
        userName: data.complain.user.details.firstName,
        userEmail: data.complain.user.email,
        complainStatus: data.complain.status,
      });
      if (data.complain.status) {
        const formData = { ...this.state.formData };
        formData.reply = data.complain.reply;
        this.setState({ formData });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  doSubmit = async () => {
    try {
      const {
        data,
      } = await httpService.post(
        `${process.env.REACT_APP_APIENDPOINT}/admin/registerComplainReply/${this.props.match.params.complainId}`,
        { reply: this.state.formData.reply }
      );
      toast.success(data.message);
      this.props.history.push("/admin/helpSupport");
      return;
    } catch (error) {
      toast.error(error.message);
    }
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="breadcrumb-header justify-content-between">
          <div className="my-auto">
            <div className="d-flex">
              <h4 className="content-title mb-0 my-auto">Page</h4>
              <span className="text-muted mt-1 tx-13 ml-2 mb-0">
                / Complain Detail
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
                          <label> Name</label>
                          <span className="tx-medium">
                            {this.state.userName}
                          </span>
                        </div>
                        <div>
                          <label>Email</label>
                          <span className="tx-medium">
                            {this.state.userEmail}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="media">
                      <div className="media-body">
                        <div>
                          <label>Query</label>
                          <span className="tx-medium">
                            {this.state.complain.query}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row row-sm">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body">
                <div className="card-sigin">
                  <div className="main-signup-header">
                    <div className="row">
                      <div className="col-md-12">
                        {this.renderTextArea("reply", "Reply Message")}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      {this.renderButton(
                        "Reply",
                        this.handleSubmit,
                        "btn btn-primary-gradient btn-block",
                        () => {
                          return (
                            this.validateOnSubmit() || this.state.complainStatus
                          );
                        }
                      )}
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

export default AdminComplaintDetails;
