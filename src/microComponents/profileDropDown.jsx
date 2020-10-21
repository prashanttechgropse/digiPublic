import React, { Component } from "react";
import { Link } from "react-router-dom";
class ProfileDropDown extends Component {
  state = {};
  render() {
    return (
      <div className="dropdown main-profile-menu nav nav-item nav-link digi-toggleprofile">
        <Link to="#" className="profile-user d-flex">
          <img src={"/common/img/customer/01.jpg"} alt={"C"} />
        </Link>
        <div className="dropdown-menu digi-dropDown">
          <div className="main-header-profile bg-primary p-3">
            <div className="d-flex wd-100p">
              <div className="main-img-user">
                <img src={"/common/img/customer/01.jpg"} alt={"C"} />
              </div>
              <div className="ml-3 my-auto">
                <h6>
                  {this.props.user.profileType === "admin"
                    ? this.props.user.name
                    : this.props.user.details.firstName}
                </h6>
                <span>{this.props.user.profileType}</span>
              </div>
            </div>
          </div>
          {this.props.user.profileType === "admin" ? null : (
            <Link
              className="dropdown-item"
              to={`/${this.props.user.profileType}/myProfile`}
            >
              <i className="bx bx-user-circle"></i>Profile
            </Link>
          )}
          {this.props.user.profileType === "admin" ? null : (
            <Link
              className="dropdown-item"
              to={`/${this.props.user.profileType}/editProfile`}
            >
              <i className="bx bx-cog"></i> Edit Profile
            </Link>
          )}

          <Link
            className="dropdown-item"
            to={`/${this.props.user.profileType}/changePassword`}
          >
            <i className="bx bxs-inbox"></i>Change Password
          </Link>
          <Link to="/signOut" className="dropdown-item">
            <i className="bx bx-log-out"></i> Sign Out
          </Link>
        </div>
      </div>
    );
  }
}

export default ProfileDropDown;
