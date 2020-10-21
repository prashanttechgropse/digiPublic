import React, { Component } from "react";
import Label from "../microComponents/profileLabels";
import { Link } from "react-router-dom";
import httpService from "../services/httpService";
import { toast } from "react-toastify";
const fileDownload = require("js-file-download");
class MyProfile extends Component {
  state = {};

  downloadProfileDoc = async () => {
    const { tender } = this.state;
    try {
      const { data } = await httpService.get(
        `${process.env.REACT_APP_APIENDPOINT}/registrationDocuments/${this.props.user.details.profileDoc}`,
        {
          responseType: "blob",
        }
      );
      await fileDownload(data, `${this.props.user.details.profileDoc}`);
    } catch (error) {
      toast.error(error.message);
      return;
    }
  };

  downloadVatDoc = async () => {
    if (this.props.user.details.vatDoc) {
      const { tender } = this.state;
      try {
        const { data } = await httpService.get(
          `${process.env.REACT_APP_APIENDPOINT}/registrationDocuments/${this.props.user.details.vatDoc}`,
          {
            responseType: "blob",
          }
        );
        await fileDownload(data, `${this.props.user.details.vatDoc}`);
      } catch (error) {
        toast.error(error.message);
        return;
      }
    } else return;
  };

  downloadBankDoc = async () => {
    const { tender } = this.state;
    try {
      const { data } = await httpService.get(
        `${process.env.REACT_APP_APIENDPOINT}/bankDocuments/${this.props.user.bankDetails.bankDoc}`,
        {
          responseType: "blob",
        }
      );
      await fileDownload(data, `${this.props.user.bankDetails.bankDoc}`);
    } catch (error) {
      toast.error(error.message);
      return;
    }
  };

  render() {
    const { user } = this.props;
    return (
      <div className="container-fluid">
        <div className="breadcrumb-header justify-content-between">
          <div className="my-auto">
            <div className="d-flex">
              <h4 className="content-title mb-0 my-auto">Account</h4>
              <span className="text-muted mt-1 tx-13 ml-2 mb-0">
                / My Profile
              </span>
            </div>
          </div>
          <div className="d-flex my-xl-auto right-content">
            <div className="pr-1 mb-3 mb-xl-0">
              <Link
                to="#"
                onClick={() => this.props.history.push(`editProfile`)}
                type="button"
                className="btn btn-primary "
              >
                <i className="fa fa-edit"></i> Edit Profile
              </Link>
            </div>
          </div>
        </div>

        <div className="row row-sm">
          <div className="col-lg-12">
            <div className="row row-sm">
              <div className="col-sm-12 col-xl-4 col-lg-12 col-md-12">
                <div className="card">
                  <div className="card-body">
                    <div className="counter-status d-flex md-mb-0">
                      <div className="counter-icon bg-primary-transparent">
                        <i className="fa fa-address-book text-primary"></i>
                      </div>
                      <div className="ml-auto">
                        <h5 className="tx-13">No Of Tenders</h5>
                        <h2 className="mb-0 tx-22 mb-1 mt-1">
                          {user.profileType === "customer"
                            ? user.details.tenders.length
                            : user.details.tendersAwarded.length}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-xl-4 col-lg-12 col-md-12">
                <div className="card">
                  <div className="card-body">
                    <div className="counter-status d-flex md-mb-0">
                      <div className="counter-icon bg-danger-transparent">
                        <i className="fa fa-user text-danger"></i>
                      </div>
                      <div className="ml-auto">
                        <h5 className="tx-13">{`No Of ${
                          user.profileType === "customer"
                            ? "Receivers"
                            : "Employees"
                        }`}</h5>
                        <h2 className="mb-0 tx-22 mb-1 mt-1">
                          {user.profileType === "customer"
                            ? user.details.receivers.length
                            : user.details.employees.length}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-xl-4 col-lg-12 col-md-12">
                <div className="card">
                  <div className="card-body">
                    <div className="counter-status d-flex md-mb-0">
                      <div className="counter-icon bg-success-transparent">
                        <i className="fa fa-money text-success"></i>
                      </div>
                      <div className="ml-auto">
                        <h5 className="tx-13">Total Earning</h5>
                        <h2 className="mb-0 tx-22 mb-1 mt-1">$1,890.00</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="tabs-menu">
                  <ul className="nav nav-tabs profile navtab-custom panel-tabs">
                    <li className="active">
                      <a href="#home" data-toggle="tab" aria-expanded="true">
                        <span className="hidden-xs">Personal Detail</span>
                      </a>
                    </li>
                    <li className="">
                      <a
                        href="#profile"
                        data-toggle="tab"
                        aria-expanded="false"
                      >
                        <span className="hidden-xs">Professional Detail</span>
                      </a>
                    </li>
                    <li className="">
                      <a
                        href="#settings"
                        data-toggle="tab"
                        aria-expanded="false"
                      >
                        <span className="hidden-xs">Bank Detail</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="tab-content border-left border-bottom border-right border-top-0 p-4">
                  <div className="tab-pane active" id="home">
                    <div className="main-contact-info-body p-4 ps">
                      <div className="media-list pb-0">
                        <div className="media">
                          <div className="media-body">
                            <Label
                              name="First Name"
                              value={user.details.firstName}
                            />
                            <Label
                              name="Last Name"
                              value={user.details.lastName}
                            />
                          </div>
                        </div>
                        <div className="media">
                          <div className="media-body">
                            <Label name="Email Id" value={user.email} />
                            <Label
                              name="Contanct No"
                              value={user.details.contactNo}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane" id="profile">
                    <div className="main-contact-info-body p-4 ps">
                      <div className="media-list pb-0">
                        <div className="media">
                          <div className="media-body">
                            <Label
                              name="Company Name"
                              value={user.details.companyName}
                            />
                            <Label
                              name="Registration No"
                              value={user.details.entityRegistrationNo}
                            />
                          </div>
                        </div>
                        <div className="media">
                          <div className="media-body">
                            <Label
                              name="VAT Registration"
                              value={
                                user.details.vatRegistration === 1
                                  ? "option1"
                                  : "option2"
                              }
                            />
                            <Label
                              name="VAT Number"
                              value={user.details.vatNumber}
                            />
                          </div>
                        </div>
                        <div className="media">
                          <div className="media-body">
                            <Label
                              name="Trading As"
                              value={user.details.tradingAs}
                            />
                            <Label
                              name="Website"
                              value={<Link to="#">{user.details.website}</Link>}
                            />
                          </div>
                        </div>
                        <div className="media">
                          <div className="media-body">
                            <Label
                              name="Physical Address"
                              value={user.details.physicalAddress}
                            />
                            <Label
                              name="Postal Address"
                              value={user.details.postalAddress}
                            />
                          </div>
                        </div>
                        <div className="media mb-0">
                          <div className="media-body">
                            <Label
                              name="Contact Person"
                              value={user.details.contactPerson}
                            />
                            <Label
                              name="Contact Number"
                              value={user.details.contactNo}
                            />
                          </div>
                        </div>
                        <div className="media mb-0">
                          <div className="media-body">
                            <Label
                              name="Document uploaded by user"
                              value={
                                <Link onClick={this.downloadProfileDoc}>
                                  <i className="fa fa-file"></i>
                                  Download File
                                </Link>
                              }
                            />
                            {user.details.vatDoc ? (
                              <Label
                                name="VAT Document uploaded by Suplier"
                                value={
                                  <Link onClick={this.downloadVatDoc}>
                                    <i className="fa fa-file"></i> Download File
                                  </Link>
                                }
                              />
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane" id="settings">
                    <div className="main-contact-info-body p-4 ps">
                      <div className="media-list pb-0">
                        <div className="media">
                          <div className="media-body">
                            <Label
                              name="Bank Name"
                              value={user.bankDetails.bankName}
                            />
                            <Label
                              name="Account No"
                              value={user.bankDetails.accountNo}
                            />
                          </div>
                        </div>
                        <div className="media">
                          <div className="media-body">
                            <Label
                              name="Account Type"
                              value={user.bankDetails.accountType}
                            />
                            <Label
                              name="Branch Code"
                              value={user.bankDetails.branchCode}
                            />
                          </div>
                        </div>
                        <div className="media">
                          <div className="media-body">
                            <Label
                              name="Upload Document"
                              value={
                                <Link onClick={this.downloadBankDoc}>
                                  <i className="fa fa-file"></i> Download File
                                </Link>
                              }
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

export default MyProfile;
