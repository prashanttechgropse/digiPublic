import React, { Component } from "react";
import { Link } from "react-router-dom";

class AdminSideBar extends Component {
  state = {
    toggleCustomerManagement: 0,
    toggleSupplierManagement: 0,
    toggleDeliveryNoteManagement: 0,
    togglePaymentManagement: 0,
    toggleAdmin: 0,
  };

  toggleCustomerManagement = () => {
    let temp = this.state.toggleCustomerManagement;
    temp === 0 ? (temp = 1) : (temp = 0);
    this.setState({ toggleCustomerManagement: temp });
  };
  toggleSupplierManagement = () => {
    let temp = this.state.toggleSupplierManagement;
    temp === 0 ? (temp = 1) : (temp = 0);
    this.setState({ toggleSupplierManagement: temp });
  };
  toggleDeliveryNoteManagement = () => {
    let temp = this.state.toggleDeliveryNoteManagement;
    temp === 0 ? (temp = 1) : (temp = 0);
    this.setState({ toggleDeliveryNoteManagement: temp });
  };
  togglePaymentManagement = () => {
    let temp = this.state.togglePaymentManagement;
    temp === 0 ? (temp = 1) : (temp = 0);
    this.setState({ togglePaymentManagement: temp });
  };
  toggleAdmin = () => {
    let temp = this.state.toggleAdmin;
    temp === 0 ? (temp = 1) : (temp = 0);
    this.setState({ toggleAdmin: temp });
  };

  renderCustomerManagement = () => {
    if (this.state.toggleCustomerManagement === 1) {
      return (
        <ul>
          <li className="slide-item side-menu__item">
            <Link to="/admin/customerList">Customer List</Link>
          </li>
        </ul>
      );
    } else return;
  };
  renderSupplierManagement = () => {
    if (this.state.toggleSupplierManagement === 1) {
      return (
        <ul>
          <li className="slide-item side-menu__item">
            <Link to={"/admin/supplierList"}>Supplier List</Link>
          </li>
        </ul>
      );
    } else return;
  };
  renderDeliveryNoteManagement = () => {
    if (this.state.toggleDeliveryNoteManagement === 1) {
      return (
        <ul>
          <li className="slide-item side-menu__item">
            <Link to={"/admin/deliveryNoteList"}>Delivery Note List</Link>
          </li>
        </ul>
      );
    } else return;
  };
  renderPaymentManagement = () => {
    if (this.state.togglePaymentManagement === 1) {
      return (
        <ul>
          <li className="slide-item side-menu__item">
            <Link to={"/admin/paymentList"}>Payment List</Link>
          </li>
        </ul>
      );
    } else return;
  };
  renderAdmin = () => {
    if (this.state.toggleAdmin === 1) {
      return (
        <ul>
          <li className="slide-item side-menu__item">
            <Link to={"/admin/createCategory"}>Create Category</Link>
          </li>
          <li className="slide-item side-menu__item">
            <Link to={"/admin/helpSupport"}>Help & Support</Link>
          </li>
          <li className="slide-item side-menu__item">
            <Link to={"/admin/termsConditions"}>Terms & Conditions</Link>
          </li>
          <li className="slide-item side-menu__item">
            <Link to={"/admin/changePassword"}>Change Password</Link>
          </li>
        </ul>
      );
    } else return;
  };

  render() {
    return (
      <aside className="app-sidebar sidebar-scroll">
        <div className="main-sidebar-header active">
          <Link to={"/admin"} className="desktop-logo logo-light active">
            <img
              src="/common/img/logo/logo.png"
              className="main-logo"
              alt="logo"
            />
          </Link>
          <Link to={"/admin"} className="desktop-logo logo-dark active">
            <img
              src="/common/img/logo/logo.png"
              className="main-logo dark-theme"
              alt="logo"
            />
          </Link>
          <Link
            to={"/admin"}
            className="logo-icon mobile-logo icon-light active"
          >
            <img
              src="/common/img/logo/favicon.png"
              className="logo-icon"
              alt="logo"
            />
          </Link>
          <Link
            to={"/admin"}
            className="logo-icon mobile-logo icon-dark active"
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
                      {this.props.admin.name}
                    </h4>
                    <span className="mb-0 text-muted">Admin</span>
                  </div>
                </div>
              </div>
              <ul className="side-menu">
                <li className="slide active">
                  <Link to={"/admin"} className="side-menu__item active">
                    <i className="fa fa-home"></i>
                    <span className="side-menu__label">Dashborad</span>
                  </Link>
                </li>
                <li className="slide">
                  <Link
                    to="#"
                    className="side-menu__item"
                    data-toggle="slide"
                    onClick={this.toggleCustomerManagement}
                  >
                    <i className="fa fa-users"></i>
                    <span className="side-menu__label">
                      Customer Management
                    </span>
                    <i className="angle fa fa-angle-down"></i>
                  </Link>
                  {this.renderCustomerManagement()}
                </li>
                <li className="slide">
                  <Link
                    to="#"
                    className="side-menu__item"
                    data-toggle="slide"
                    onClick={this.toggleSupplierManagement}
                  >
                    <i className="fa fa-user"></i>
                    <span className="side-menu__label">
                      Supplier Management
                    </span>
                    <i className="angle fa fa-angle-down"></i>
                  </Link>
                  {this.renderSupplierManagement()}
                </li>
                <li className="slide">
                  <Link
                    to="#"
                    className="side-menu__item"
                    data-toggle="slide"
                    onClick={this.toggleDeliveryNoteManagement}
                  >
                    <i className="fa fa-file"></i>
                    <span className="side-menu__label">
                      Delivery Note Management
                    </span>
                    <i className="angle fa fa-angle-down"></i>
                  </Link>
                  {this.renderDeliveryNoteManagement()}
                </li>
                <li className="slide">
                  <Link
                    to="#"
                    className="side-menu__item"
                    data-toggle="slide"
                    onClick={this.togglePaymentManagement}
                  >
                    <i className="fa fa-money"></i>
                    <span className="side-menu__label">Payment Management</span>
                    <i className="angle fa fa-angle-down"></i>
                  </Link>
                  {this.renderPaymentManagement()}
                </li>
                <li className="slide">
                  <Link
                    to="#"
                    className="side-menu__item"
                    data-toggle="slide"
                    onClick={this.toggleAdmin}
                  >
                    <i className="fa fa-cog"></i>
                    <span className="side-menu__label">Admin</span>
                    <i className="angle fa fa-angle-down"></i>
                  </Link>
                  {this.renderAdmin()}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
    );
  }
}

export default AdminSideBar;
