import React, { Component } from "react";
import { Route } from "react-router-dom";
import ForgotPassword from "./macroComponents/forgotPasswordForm";
import ResetPassword from "./macroComponents/resetPassword";
import OtpVerificationForm from "./macroComponents/otpVerification";
class ForgotPasswordContainer extends Component {
  state = {
    register: {
      email: "",
    },
  };

  getEmail = async (email) => {
    const register = { email: email };
    this.setState({ register });
  };
  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path={["/forgotPassword", "/verify"]}
          render={(props) => (
            <ForgotPassword
              submitEmail={(email) => this.getEmail(email)}
              {...props}
            />
          )}
        />
        <Route
          exact
          path={`/forgotPassword/otpVerification`}
          render={(props) => (
            <OtpVerificationForm
              email={this.state.register.email}
              forgotPassword={true}
              {...props}
            />
          )}
        />
        <Route
          exact
          path="/forgotPassword/resetPassword"
          render={(props) => <ResetPassword {...props} />}
        />
      </React.Fragment>
    );
  }
}

export default ForgotPasswordContainer;
