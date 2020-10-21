import React, { Component } from "react";
//import "./App.css";
import CustomerSidebar from "./customerComponents/customersidebar";
import Footer from "./macroComponents/footer";
import MainContentHeaderBar from "./macroComponents/mainContentHeaderBar";
import CustomerDashboardMainContent from "./customerComponents/customerDashboardComponents/customerDashboardMainConent";

import HelpSupport from "./macroComponents/helpSupport";
import TermsConditions from "./macroComponents/termsConditions";
import MyProfile from "./macroComponents/myProfile";
import EditProfile from "./macroComponents/editProfile";
import ChangePassword from "./userComponents/changePassword";
import CustomerTenderList from "./customerComponents/customerTenderManagementComponents/customerTenderList";
import CustomerSaveForLater from "./customerComponents/customerTenderManagementComponents/customerSaveForLater";
import CustomerTransactionList from "./customerComponents/customerTenderManagementComponents/customerTransactionList";
import CustomerCreateTender from "./customerComponents/customerTenderManagementComponents/customerCreateTender";
import CustomerReceiverlist from "./customerComponents/customerAdminFunctionComponents.jsx/customerReceiverList";

import httpService from "./services/httpService";
import { toast } from "react-toastify";
import { Route } from "react-router-dom";
import SupplierQuotationDetails from "./customerComponents/supllierQuotationDetails";
import TenderDetails from "./customerComponents/customerTenderManagementComponents/TenderDetails";
import CustomerEditTender from "./customerComponents/customerTenderManagementComponents/customerEditTender";
import AssignReceiver from "./customerComponents/customerAdminFunctionComponents.jsx/assignReceiver";
import CreateDeliveryNote from "./customerComponents/createDeliveryNote";
import DeliveryNoteMainContent from "./customerComponents/customerDeliveryNotesComponents/DeliveryNoteMainContent";
import DeliveryNoteDetails from "./customerComponents/customerDeliveryNotesComponents/DeliveryNoteDetails";
import UserComplainDetails from "./macroComponents/userComplaindetails";

class CustomerApp extends Component {
  state = {
    customer: null,
  };

  async componentDidMount() {
    try {
      const { data } = await httpService.get(
        `${process.env.REACT_APP_APIENDPOINT}/customer/myData`
      );
      if (data) {
        if (data.user.profileType.toLowerCase() === "customer") {
          const customer = data.user;
          this.setState({ customer: customer });
          return;
        } else {
          this.props.history.push(`/${data.user.profileType}`);
          return;
        }
      }
    } catch (error) {
      toast.error(error.message);
      return;
    }
  }

  checkCustomerPopulated = () => {
    if (this.state.customer) {
      return (
        <React.Fragment>
          <div
            className="app-sidebar__overlay active"
            data-toggle="sidebar"
          ></div>
          <CustomerSidebar user={this.state.customer} />
          <div className="main-content app-content">
            <MainContentHeaderBar user={this.state.customer} />
            <Route
              exact
              path="/customer/createTender"
              component={CustomerCreateTender}
            />
            <Route exact path="/customer/myProfile">
              <MyProfile user={this.state.customer} {...this.props} />
            </Route>
            <Route
              exact
              path="/customer/tenderList"
              component={CustomerTenderList}
            />

            <Route
              exact
              path="/customer/saveForLater"
              component={CustomerSaveForLater}
            />
            <Route
              exact
              path="/customer/editSavedTender/:tenderId"
              component={CustomerEditTender}
            />
            <Route
              exact
              path="/customer/changePassword"
              component={ChangePassword}
            />
            <Route
              exact
              path="/customer/transactionList"
              component={CustomerTransactionList}
            />
            <Route
              exact
              path="/customer/tenderDetails/:tenderId"
              component={TenderDetails}
            />
            <Route
              exact
              path="/customer/supplierQuotation/:bidId"
              component={SupplierQuotationDetails}
            />
            <Route
              exact
              path="/customer/termsConditions"
              component={TermsConditions}
            />
            <Route exact path="/customer/editProfile">
              <EditProfile user={this.state.customer} {...this.props} />
            </Route>
            <Route exact path="/customer/helpSupport" component={HelpSupport} />
            <Route
              exact
              path="/customer/complain-detail/:complainId"
              component={UserComplainDetails}
            />
            <Route
              exact
              path="/customer/assignReceiver"
              component={AssignReceiver}
            />
            <Route
              exact
              path="/customer/deliveryNotes"
              component={DeliveryNoteMainContent}
            />
            <Route
              exact
              path="/customer/deliveryNoteDetails/:tenderId"
              component={DeliveryNoteDetails}
            />
            <Route
              exact
              path="/customer/customerReceiverList"
              component={CustomerReceiverlist}
            />
            <Route
              exact
              path="/customer/createDeliveryNote/:tenderId/:status"
              component={CreateDeliveryNote}
            />
            <Route
              exact
              path="/customer"
              component={CustomerDashboardMainContent}
            />
          </div>
        </React.Fragment>
      );
    }
  };

  render() {
    return (
      <div className="main-body app sidebar-mini">
        <div className="page active">
          {this.checkCustomerPopulated()}
          <Footer />
        </div>
      </div>
    );
  }
}

export default CustomerApp;
