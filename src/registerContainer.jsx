import React, { Component } from "react";
import CreateAccount from "./macroComponents/createAccount";
import { Route } from "react-router-dom";
import OtpVerificationForm from "./macroComponents/otpVerification";
import ProfileSetup from "./macroComponents/profileSetup";
import BankDetails from "./macroComponents/bankDetails";
import CreateAccountReceiver from "./macroComponents/createAccountReceiver";
import SecondaryUserProfileSetup from "./secondaryUserComponents/secondaryUserProfileSetup";
class RegisterContainer extends Component {
  state = {
    register: {
      email: "",
      profileType: "",
    },
  };

  getEmail = async (email) => {
    const register = { email: email };
    this.setState({ register });
  };

  getProfileDetails = async (formData) => {
    const register = formData;
    this.setState({ register: register });
    console.log(this.state);
  };
  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/register"
          render={(props) => (
            <CreateAccount
              submitEmail={(email) => this.getEmail(email)}
              {...props}
            />
          )}
        />
        <Route
          exact
          path="/register/receiver"
          render={(props) => (
            <CreateAccountReceiver
              submitEmail={(email) => this.getEmail(email)}
              {...props}
            />
          )}
        />
        <Route
          exact
          path="/register/secondaryUserProfileSetup"
          component={SecondaryUserProfileSetup}
        />
        <Route
          exact
          from="/register/employeeProfileSetup"
          to="/receiverProfileSetup"
        />
        <Route
          exact
          path={`/register/otpVerification`}
          render={(props) => (
            <OtpVerificationForm
              email={this.state.register.email}
              forgotPassword={false}
              {...props}
            />
          )}
        />
        <Route exact path={`/register/profileSetup`} component={ProfileSetup} />
        <Route
          exact
          path={`/register/uploadBankDetails/:profileType/:organisationType`}
          component={BankDetails}
        />
      </React.Fragment>
    );
  }
}

export default RegisterContainer;
