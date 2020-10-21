import React, { Component } from "react";
import { Link } from "react-router-dom";
class SupplierSideBar extends Component {
  state = {
    toggleTenderManagement: 0,
    toggleAdminFunctions: 0,
  };

  toggleTenderManagement = () => {
    let temp = this.state.toggleTenderManagement;
    temp === 0 ? (temp = 1) : (temp = 0);
    this.setState({ toggleTenderManagement: temp });
  };
  toggleAdminFunctions = () => {
    let temp = this.state.toggleAdminFunctions;
    temp === 0 ? (temp = 1) : (temp = 0);
    this.setState({ toggleAdminFunctions: temp });
  };
  renderAdminFunctions = () => {
    if (this.state.toggleAdminFunctions === 1) {
      return (
        <ul>
          <li className="side-menu__item slide-item">
            <Link to="/supplier/supplierEmployeeList">
              Supplier Employee List
            </Link>
          </li>
          <li className="slide-item side-menu__item">
            <Link to="/supplier/assignEmployee">Assign Tender To Employee</Link>
          </li>
          <li className="slide-item side-menu__item">
            <Link to="/supplier/changePassword">Change Password</Link>
          </li>
          <li className="slide-item side-menu__item">
            <Link to="/supplier/myProfile">Profile</Link>
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
            <Link to="/supplier/tenderList">Tender List</Link>
          </li>
          <li className="slide-item side-menu__item">
            <Link to="/supplier/saveForLater">Save for Later</Link>
          </li>
          <li className="slide-item side-menu__item">
            <Link to="/supplier/transactionManagement">
              Transaction Management
            </Link>
          </li>
          <li className="slide-item side-menu__item">
            <Link to="/supplier/history">History</Link>
          </li>
        </ul>
      );
    } else return;
  };

  render() {
    const { firstName } = this.props.user.details;
    return (
      <aside className="app-sidebar sidebar-scroll">
        <div className="main-sidebar-header active">
          <Link className="desktop-logo logo-light active" to="/supplier">
            <img
              src="/common/img/logo/logo.png"
              className="main-logo"
              alt="logo"
            />
          </Link>
          <Link className="desktop-logo logo-dark active" to="/supplier">
            <img
              src="/common/img/logo/logo.png"
              className="main-logo dark-theme"
              alt="logo"
            />
          </Link>
          <Link
            className="logo-icon mobile-logo icon-light active"
            to="/supplier"
          >
            <img
              src="/common/img/logo/favicon.png"
              className="logo-icon"
              alt="logo"
            />
          </Link>
          <Link
            className="logo-icon mobile-logo icon-dark active"
            to="/supplier"
          >
            <img
              src="/common/img/logo/favicon.png"
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
                      src="/common/img/customer/01.jpg"
                    />
                    <span className="avatar-status profile-status bg-green"></span>
                  </div>
                  <div className="user-info">
                    <h4 className="font-weight-semibold mt-3 mb-0">
                      {firstName}
                    </h4>
                    <span className="mb-0 text-muted">Supplier</span>
                  </div>
                </div>
              </div>
              <ul className="side-menu">
                <li className="slide active">
                  <Link className="side-menu__item active" to="/supplier">
                    <i className="fa fa-home"></i>
                    <span className="side-menu__label">Dashborad</span>
                  </Link>
                </li>
                <li className="slide">
                  <Link
                    to="#"
                    className="side-menu__item active"
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
                    to="/supplier/deliveryNotes"
                  >
                    <i className="fa fa-book"></i>
                    <span className="side-menu__label">Delivery Notes</span>
                  </Link>
                </li>
                <li className="slide">
                  <Link
                    to="#"
                    className="side-menu__item"
                    data-toggle="slide"
                    onClick={this.toggleAdminFunctions}
                  >
                    <i className="fa fa-cog"></i>
                    <span className="side-menu__label">Admin Functions</span>
                    <i className="angle fa fa-angle-down"></i>
                  </Link>
                  {this.renderAdminFunctions()}
                </li>
                <li className="slide">
                  <Link className="side-menu__item" to="/supplier/helpSupport">
                    <i className="fa fa-question-circle"></i>
                    <span className="side-menu__label">Help & Support</span>
                  </Link>
                </li>
                <li className="slide">
                  <Link
                    className="side-menu__item"
                    to={"/supplier/termsConditions"}
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

export default SupplierSideBar;
