import React, { Component } from "react";
//import "./App.css";
import Footer from "./macroComponents/footer";
import MainContentHeaderBar from "./macroComponents/mainContentHeaderBar";

import HelpSupport from "./macroComponents/helpSupport";
import TermsConditions from "./macroComponents/termsConditions";
import MyProfile from "./macroComponents/myProfile";
import EditProfile from "./macroComponents/editProfile";

import SupplierDashboardMainContent from "./supplierComponents/supplierDashboardComponents/supplierDashboardMainContent";
import SupplierSideBar from "./supplierComponents/supplierSideBar";
import TenderList from "./supplierComponents/supplierTenderManagementComponents/supplierTenderList";
import SupplierSaveForLater from "./supplierComponents/supplierTenderManagementComponents/supplierSaveForLater";
import SupplierTransactionManagement from "./supplierComponents/supplierTenderManagementComponents/supplierTransactionManagement";
import SupplierHistory from "./supplierComponents/supplierTenderManagementComponents/supplierHistory";
import SupplierEmployeeList from "./supplierComponents/supplierAdminFunctionsComponents/supplierEmployeeList";

import httpService from "./services/httpService";

import { toast } from "react-toastify";
import ChangePassword from "./userComponents/changePassword";
import { Route } from "react-router-dom";
import SupllierBid from "./supplierComponents/supplierBid";
import SupplierMyBidDetails from "./supplierComponents/supplierMyBidDetails";
import SavedTenderDetails from "./supplierComponents/savedTenderDetails";
import DeliveryNoteMainContent from "./customerComponents/customerDeliveryNotesComponents/DeliveryNoteMainContent";
import DeliveryNoteDetails from "./customerComponents/customerDeliveryNotesComponents/DeliveryNoteDetails";

import AssignEmployee from "./supplierComponents/assignEmployee";
import UserComplainDetails from "./macroComponents/userComplaindetails";

class SupplierApp extends Component {
  state = { supplier: "", displayTenderDetailsId: null };

  async componentDidMount() {
    try {
      const { data } = await httpService.get(
        `${process.env.REACT_APP_APIENDPOINT}/supplier/myData`
      );
      if (data.user.profileType.toLowerCase() === "supplier") {
        const supplier = data.user;
        this.setState({ supplier: supplier });
      } else this.props.history.push(`/${data.user.profileType}`);
    } catch (error) {
      toast.error(error.message);
      return;
    }
  }

  displayTenderDetailsID = async (tenderId) => {
    this.setState({ displayTenderDetailsId: tenderId });
  };

  checkSupplierPopulated() {
    if (this.state.supplier !== "") {
      return (
        <React.Fragment>
          <SupplierSideBar user={this.state.supplier} />
          <div className="main-content app-content">
            <MainContentHeaderBar user={this.state.supplier} />
            <Route
              exact
              path="/supplier/deliveryNotes"
              component={DeliveryNoteMainContent}
            ></Route>
            <Route exact path="/supplier/tenderList" component={TenderList} />
            <Route exact path="/supplier/saveForLater">
              <SupplierSaveForLater
                tenderClicked={this.displayTenderDetailsID}
              />
              ;
            </Route>
            <Route
              exact
              path="/supplier/transactionManagement"
              component={SupplierTransactionManagement}
            />
            <Route exact path="/supplier/history">
              <SupplierHistory />;
            </Route>
            <Route
              exact
              path="/supplier/supplierEmployeeList"
              component={SupplierEmployeeList}
            />
            <Route
              exact
              path="/supplier/assignEmployee"
              component={AssignEmployee}
            />
            <Route exact path="/supplier/helpSupport">
              <HelpSupport />
            </Route>
            <Route
              exact
              path="/supplier/complain-detail/:complainId"
              component={UserComplainDetails}
            />
            <Route exact path="/supplier/termsConditions">
              <TermsConditions />;
            </Route>
            <Route exact path="/supplier/myProfile">
              <MyProfile user={this.state.supplier} {...this.props} />
            </Route>
            <Route exact path="/supplier/editProfile">
              <EditProfile user={this.state.supplier} />
            </Route>
            <Route exact path="/supplier/changePassword">
              <ChangePassword {...this.props} />
            </Route>
            <Route
              exact
              path="/supplier/tenderDetails/:tenderId"
              component={SupllierBid}
            />
            <Route
              exact
              path="/supplier/savedTenderDetails/:tenderId"
              component={SavedTenderDetails}
            />
            <Route
              exact
              path="/supplier/myBidDetails/:tenderId"
              component={SupplierMyBidDetails}
            />
            <Route
              exact
              path="/supplier/deliveryNoteDetails/:tenderId"
              component={DeliveryNoteDetails}
            />
            <Route exact path="/supplier">
              <SupplierDashboardMainContent user={this.state.supplier} />
            </Route>
          </div>
        </React.Fragment>
      );
    }
  }

  render() {
    return (
      <div className="main-body app sidebar-mini">
        <div className="page active">
          <div
            className="app-sidebar__overlay active"
            data-toggle="sidebar"
          ></div>
          {this.checkSupplierPopulated()}
          <Footer />
        </div>
      </div>
    );
  }
}

export default SupplierApp;
