import React, { Component } from "react";
import Label from "./profileLabels";
import { Link } from "react-router-dom";

class SecondaryUserMyProfile extends Component {
  state = {};
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
                onClick={() => this.props.history.push("editProfile")}
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
                          {user.details.tendersAllotted.length}
                        </h2>
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
                  </ul>
                </div>
                <div className="tab-content border-left border-bottom border-right border-top-0 p-4">
                  <div className="tab-pane active" id="home">
                    <div className="main-contact-info-body p-4 ps">
                      <div className="media-list pb-0">
                        <div className="media">
                          <div className="media-body">
                            <Label name="Name" value={user.details.name} />
                          </div>
                        </div>
                        <div className="media">
                          <div className="media-body">
                            <Label name="Email Id" value={user.email} />
                            <Label
                              name="Contanct No"
                              value={user.details.contactNumber}
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

export default SecondaryUserMyProfile;
