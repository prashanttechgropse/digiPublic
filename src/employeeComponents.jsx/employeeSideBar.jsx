import React, { Component } from "react";
import { Link } from "react-router-dom";
class EmployeeSideBar extends Component {
  state = {
    toggleTenderManagement: 0,
    toggleEmployeeSetting: 0,
  };
  toggleEmployeeSetting = () => {
    let temp = this.state.toggleEmployeeSetting;
    temp === 0 ? (temp = 1) : (temp = 0);
    this.setState({ toggleEmployeeSetting: temp });
  };
  toggleTenderManagement = () => {
    let temp = this.state.toggleTenderManagement;
    temp === 0 ? (temp = 1) : (temp = 0);
    this.setState({ toggleTenderManagement: temp });
  };
  renderEmployeeSetting = () => {
    if (this.state.toggleEmployeeSetting === 1) {
      return (
        <ul>
          <li className="slide-item side-menu__item">
            <Link to={`/${this.props.user.profileType}/changePassword`}>
              Change Password
            </Link>
          </li>
          <li className="slide-item side-menu__item">
            <Link to={`/${this.props.user.profileType}/myProfile`}>
              Profile
            </Link>
          </li>
        </ul>
      );
    } else return;
  };
  renderTenderManagement = () => {
    if (this.state.toggleTenderManagement === 1) {
      return (
        <ul>
          <li className="slide-item side-menu__item">
            <Link to="/employee/tenderList">Tender List</Link>
          </li>
        </ul>
      );
    } else return;
  };
  render() {
    return (
      <aside className="app-sidebar sidebar-scroll">
        <div className="main-sidebar-header active">
          <Link
            className="desktop-logo logo-light active"
            to={`/${this.props.user.profileType}`}
          >
            <img
              src={"/common/img/logo/logo.png"}
              className="main-logo"
              alt="logo"
            />
          </Link>
          <Link
            className="desktop-logo logo-dark active"
            to={`/${this.props.user.profileType}`}
          >
            <img
              src={"/common/img/logo/logo.png"}
              className="main-logo dark-theme"
              alt="logo"
            />
          </Link>
          <Link
            className="logo-icon mobile-logo icon-light active"
            to={`/${this.props.user.profileType}`}
          >
            <img
              src={"/common/img/logo/favicon.png"}
              className="logo-icon"
              alt="logo"
            />
          </Link>
          <Link
            className="logo-icon mobile-logo icon-dark active"
            to={`/${this.props.user.profileType}`}
          >
            <img
              src={"/common/img/logo/favicon.png"}
              className="logo-icon dark-theme"
              alt="logo"
            />
          </Link>
        </div>
        <div className="main-sidemenu mCustomScrollbar _mCS_1 mCS-autoHide">
          <div
            id="mCSB_1"
            className="mCustomScrollBox mCS-minimal mCSB_vertical mCSB_outside"
            tabIndex="0"
          >
            <div id="mCSB_1_container" className="mCSB_container" dir="ltr">
              <div className="app-sidebar__user clearfix active">
                <div className="dropdown user-pro-body">
                  <div className="">
                    <img
                      alt="user-img"
                      className="avatar avatar-xl brround mCS_img_loaded"
                      src={"/common/img/customer/01.jpg"}
                    />
                    <span className="avatar-status profile-status bg-green"></span>
                  </div>
                  <div className="user-info">
                    <h4 className="font-weight-semibold mt-3 mb-0">
                      {this.props.user.details.firstName}
                    </h4>
                    <span className="mb-0 text-muted">Employee</span>
                  </div>
                </div>
              </div>
              <ul className="side-menu">
                <li className="slide active">
                  <Link
                    className="side-menu__item active"
                    to={`/${this.props.user.profileType}`}
                  >
                    <i className="fa fa-home"></i>
                    <span className="side-menu__label">Dashboard</span>
                  </Link>
                </li>
                <li className="slide">
                  <Link
                    className="side-menu__item"
                    data-toggle="slide"
                    onClick={this.toggleTenderManagement}
                  >
                    <i className="fa fa-address-book"></i>
                    <span className="side-menu__label">Tender Management</span>
                    <i className="angle fa fa-angle-down"></i>
                  </Link>
                  {this.renderTenderManagement()}
                </li>
                <li className="slide">
                  <Link
                    className="side-menu__item"
                    to={`/${this.props.user.profileType}/deliveryNotes`}
                  >
                    <i className="fa fa-book"></i>
                    <span className="side-menu__label">Delivery Notes</span>
                  </Link>
                </li>
                <li className="slide">
                  <Link
                    className="side-menu__item"
                    data-toggle="slide"
                    onClick={this.toggleEmployeeSetting}
                  >
                    <i className="fa fa-cog"></i>
                    <span className="side-menu__label">Employee Setting</span>
                    <i className="angle fa fa-angle-down"></i>
                  </Link>
                  {this.renderEmployeeSetting()}
                </li>
                <li className="slide">
                  <Link
                    className="side-menu__item"
                    to={`/${this.props.user.profileType}/helpSupport`}
                  >
                    <i className="fa fa-support"></i>
                    <span className="side-menu__label">Help & Support</span>
                  </Link>
                </li>
                <li className="slide">
                  <Link
                    className="side-menu__item"
                    to={`/${this.props.user.profileType}/termsConditions`}
                  >
                    <i className="fa fa-info"></i>
                    <span className="side-menu__label">
                      Terms and Conditions
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
    );
  }
}

export default EmployeeSideBar;
