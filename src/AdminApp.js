import React, { Component } from "react";
//import "./App.css";
import Footer from "./macroComponents/footer";
import MainContentHeaderBar from "./macroComponents/mainContentHeaderBar";
import AdminSideBar from "./adminComponents/adminSideBar";
import AdminDashboardMainContent from "./adminComponents/adminDashboardComponents/adminDashboardMainContent";
import AdminCustomerList from "./adminComponents/adminCustomerManagementComponents/adminCustomerList";
import AdminSupplierList from "./adminComponents/adminSupplierMangementComponents/adminSupplierList";
import AdminPaymentList from "./adminComponents/adminPaymentManagementComponents/adminPaymentList";
import AdminCreateCategory from "./adminComponents/adminAdminFunctionComponents/adminCreateCategory";
import AdminHelpSupport from "./adminComponents/adminAdminFunctionComponents/adminHelp&Support";
import AdminTermsConditions from "./adminComponents/adminAdminFunctionComponents/adminTerms&Conditions";
import ChangePassword from "./userComponents/changePassword";
import httpService from "./services/httpService";

import { toast } from "react-toastify";
import { Route } from "react-router-dom";
import CustomerDetailsContainer from "./adminComponents/customerDetailsComponents/customerDetailsContainer";

import SupplierDetailsContainer from "./adminComponents/supplierDetailsContainer/supplierDetailsContainer";
import SupplierQuotationDetails from "./customerComponents/supllierQuotationDetails";
import TenderDetails from "./customerComponents/customerTenderManagementComponents/TenderDetails";
import DeliveryNoteMainContent from "./customerComponents/customerDeliveryNotesComponents/DeliveryNoteMainContent";
import DeliveryNoteDetails from "./customerComponents/customerDeliveryNotesComponents/DeliveryNoteDetails";
import AdminComplaintDetails from "./adminComponents/adminAdminFunctionComponents/adminComplainDetails";

class AdminApp extends Component {
  state = {
    admin: "",
    customerList: "",
    supplierList: "",
    tenderList: "",
  };

  componentDidMount = async () => {
    try {
      const { data } = await httpService.get(
        `${process.env.REACT_APP_APIENDPOINT}/admin/adminData`
      );
      if (data) {
        if (data.user.profileType.toLowerCase() === "admin") {
          const admin = data.user;
          this.setState({ admin: admin });

          const customerList = data.customerList;
          this.setState({ customerList });

          const supplierList = data.supplierList;
          this.setState({ supplierList });

          const tenderList = data.tenderList;
          this.setState({ tenderList });
        } else {
          return await this.props.history.push(`/${data.user.profileType}`);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  checkAdminPopulated = () => {
    if (this.state.admin !== "") {
      return (
        <div className="page active">
          <div
            className="app-sidebar__overlay active"
            data-toggle="sidebar"
          ></div>
          <AdminSideBar admin={this.state.admin} />
          <div className="main-content app-content">
            <MainContentHeaderBar user={this.state.admin} />
            <Route
              exact
              path="/admin/customerList"
              component={AdminCustomerList}
            />

            <Route
              exact
              path="/admin/supplierList"
              component={AdminSupplierList}
            />

            <Route
              exact
              path="/admin/deliveryNoteList"
              component={DeliveryNoteMainContent}
            />
            <Route
              exact
              path="/admin/deliveryNoteDetails/:tenderId"
              component={DeliveryNoteDetails}
            />

            <Route
              exact
              path="/admin/paymentList"
              component={AdminPaymentList}
            />

            <Route
              exact
              path="/admin/createCategory"
              component={AdminCreateCategory}
            />

            <Route
              exact
              path="/admin/helpSupport"
              component={AdminHelpSupport}
            />

            <Route
              exact
              path="/admin/termsConditions"
              component={AdminTermsConditions}
            />

            <Route
              exact
              path="/admin/changePassword"
              component={ChangePassword}
            />

            <Route
              exact
              path="/admin/customerDetails/:customerId"
              component={CustomerDetailsContainer}
            />

            <Route
              exact
              path="/admin/supplierDetails/:supplierId"
              component={SupplierDetailsContainer}
            />
            <Route
              exact
              path="/admin/complainDetail/:complainId"
              component={AdminComplaintDetails}
            />

            <Route
              exact
              path="/admin/tenderDetails/:tenderId"
              component={TenderDetails}
            />

            <Route
              exact
              path="/admin/supplierQuotation/:bidId"
              component={SupplierQuotationDetails}
            />

            <Route exact path="/admin">
              <AdminDashboardMainContent
                tenderList={this.state.tenderList}
                customerList={this.state.customerList}
                supplierList={this.state.supplierList}
              />
            </Route>
          </div>
          <Footer />
        </div>
      );
    }
  };

  render() {
    return (
      <div className="main-body app sidebar-mini">
        {this.checkAdminPopulated()}
      </div>
    );
  }
}

export default AdminApp;
