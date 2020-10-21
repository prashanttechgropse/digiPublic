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
import ReceiverDashboardMainContent from "../receiverComponents/receiverDashboardMainContent";
import ReceiverSideBar from "../receiverComponents/receiverSideBar";
import SecondaryUserMyProfile from "../microComponents/secondaryUserMyProfile";

import CreateDeliveryNote from "../customerComponents/createDeliveryNote";
import DeliveryNoteMainContent from "../customerComponents/customerDeliveryNotesComponents/DeliveryNoteMainContent";
import DeliveryNoteDetails from "../customerComponents/customerDeliveryNotesComponents/DeliveryNoteDetails";
import SecondaryUserTenderDetails from "../secondaryUserComponents/secondaryUserTenderDetails";
import SecondaryUserTenderList from "../secondaryUserComponents/secondaryUserTenderList";
import SecondaryUserEditProfile from "../secondaryUserComponents/secondaryUserEditProfile";
import UserComplainDetails from "../macroComponents/userComplaindetails";

class ReceiverApp extends Component {
  state = {
    receiver: null,
  };

  async componentDidMount() {
    try {
      const { data } = await httpService.get(
        `${process.env.REACT_APP_APIENDPOINT}/receiver/myData`
      );
      console.log(data);
      if (data) {
        if (data.user.profileType.toLowerCase() === "receiver") {
          const receiver = data.user;
          this.setState({ receiver: receiver });
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
    if (this.state.receiver) {
      return (
        <React.Fragment>
          <div
            className="app-sidebar__overlay active"
            data-toggle="sidebar"
          ></div>
          <ReceiverSideBar user={this.state.receiver} />
          <div className="main-content app-content">
            <MainContentHeaderBar user={this.state.receiver} />

            <Route exact path="/receiver/myProfile">
              <SecondaryUserMyProfile
                user={this.state.receiver}
                {...this.props}
              />
            </Route>
            <Route
              exact
              path="/receiver/tenderDetails/:tenderId"
              component={SecondaryUserTenderDetails}
            />
            <Route
              exact
              path="/receiver/tenderList"
              component={SecondaryUserTenderList}
            />
            <Route
              exact
              path="/receiver/deliveryNotes"
              component={DeliveryNoteMainContent}
            />
            <Route
              exact
              path="/receiver/createDeliveryNote/:tenderId/:status"
              component={CreateDeliveryNote}
            />
            <Route
              exact
              path="/receiver/deliveryNoteDetails/:tenderId"
              component={DeliveryNoteDetails}
            />
            <Route
              exact
              path="/receiver/changePassword"
              component={ChangePassword}
            />
            <Route
              exact
              path="/receiver/termsConditions"
              component={TermsConditions}
            />
            <Route exact path="/receiver/editProfile">
              <SecondaryUserEditProfile
                user={this.state.receiver}
                {...this.props}
              />
            </Route>
            <Route exact path="/receiver/helpSupport" component={HelpSupport} />
            <Route
              exact
              path="/receiver/complain-detail/:complainId"
              component={UserComplainDetails}
            />

            <Route
              exact
              path="/receiver"
              component={ReceiverDashboardMainContent}
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

export default ReceiverApp;
