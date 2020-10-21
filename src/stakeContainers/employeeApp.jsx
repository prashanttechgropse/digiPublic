import React, { Component } from "react";
//import "./App.css";

import Footer from "../macroComponents/footer";
import MainContentHeaderBar from "../macroComponents/mainContentHeaderBar";
import HelpSupport from "../macroComponents/helpSupport";
import TermsConditions from "../macroComponents/termsConditions";

import ChangePassword from "../userComponents/changePassword";

import httpService from "../services/httpService";
import { toast } from "react-toastify";
import { Route } from "react-router-dom";

import SecondaryUserMyProfile from "../microComponents/secondaryUserMyProfile";

import EmployeeSideBar from "../employeeComponents.jsx/employeeSideBar";
import EmployeeDashBoardMainContent from "../employeeComponents.jsx/employeeDashboardMainContent";
import SecondaryUserTenderDetails from "../secondaryUserComponents/secondaryUserTenderDetails";
import SecondaryUserTenderList from "../secondaryUserComponents/secondaryUserTenderList";
import DeliveryNoteMainContent from "../customerComponents/customerDeliveryNotesComponents/DeliveryNoteMainContent";
import DeliveryNoteDetails from "../customerComponents/customerDeliveryNotesComponents/DeliveryNoteDetails";
import SecondaryUserEditProfile from "../secondaryUserComponents/secondaryUserEditProfile";
import UserComplainDetails from "../macroComponents/userComplaindetails";

class EmployeeApp extends Component {
  state = {
    employee: null,
  };

  async componentDidMount() {
    try {
      const { data } = await httpService.get(
        `${process.env.REACT_APP_APIENDPOINT}/employee/myData`
      );
      console.log(data);
      if (data) {
        if (data.user.profileType.toLowerCase() === "employee") {
          const employee = data.user;
          this.setState({ employee: employee });
          return;
        } else {
          return await this.props.history.push(`/${data.user.profileType}`);
        }
      }
    } catch (error) {
      toast.error(error.message);
      return;
    }
  }

  checkReceiverPopulated = () => {
    if (this.state.employee) {
      return (
        <React.Fragment>
          <div
            className="app-sidebar__overlay active"
            data-toggle="sidebar"
          ></div>
          <EmployeeSideBar user={this.state.employee} />
          <div className="main-content app-content">
            <MainContentHeaderBar user={this.state.employee} />

            <Route exact path="/employee/myProfile">
              <SecondaryUserMyProfile
                user={this.state.employee}
                {...this.props}
              />
            </Route>
            <Route
              exact
              path="/employee/tenderDetails/:tenderId"
              component={SecondaryUserTenderDetails}
            />
            <Route
              exact
              path="/employee/tenderList"
              component={SecondaryUserTenderList}
            />
            <Route
              exact
              path="/employee/deliveryNotes"
              component={DeliveryNoteMainContent}
            />
            <Route
              exact
              path="/employee/deliveryNoteDetails/:tenderId"
              component={DeliveryNoteDetails}
            />

            <Route
              exact
              path="/employee/changePassword"
              component={ChangePassword}
            />
            <Route
              exact
              path="/employee/termsConditions"
              component={TermsConditions}
            />
            <Route exact path="/employee/editProfile">
              <SecondaryUserEditProfile
                user={this.state.employee}
                {...this.props}
              />
            </Route>
            <Route exact path="/employee/helpSupport" component={HelpSupport} />
            <Route
              exact
              path="/employee/complain-detail/:complainId"
              component={UserComplainDetails}
            />

            <Route
              exact
              path="/employee"
              component={EmployeeDashBoardMainContent}
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
          {this.checkReceiverPopulated()}
          <Footer />
        </div>
      </div>
    );
  }
}

export default EmployeeApp;
