import React, { Component } from "react";
import AdminDashBoardCards from "./adminDashboardCards";
import AdminDashBoardRecentlyAddedCustomers from "./adminDashboardRecentlyAddedCustomers";
import AdminRecentlyAddedSupplierList from "./adminDashboardRecentlyAddedSupplierList";
class AdminDashboardMainContent extends Component {
  state = {};
  render() {
    return (
      <div className="container-fluid">
        <div className="breadcrumb-header justify-content-between">
          <div className="left-content">
            <div>
              <h2 className="main-content-title tx-24 mg-b-1 mg-b-lg-1">
                Hi, Admin !
              </h2>
              <p className="mg-b-0">Welcome Back to Digibids Platform.</p>
            </div>
          </div>
        </div>
        <AdminDashBoardCards
          tenderList={this.props.tenderList}
          customerList={this.props.customerList}
          supplierList={this.props.supplierList}
        />
        <AdminDashBoardRecentlyAddedCustomers
          customerList={this.props.customerList}
        />
        <AdminRecentlyAddedSupplierList
          supplierList={this.props.supplierList}
        />
      </div>
    );
  }
}

export default AdminDashboardMainContent;
