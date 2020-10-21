import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NotFound from "./notfound";
import LoginForm from "./loginForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterContainer from "./registerContainer.jsx";
import ForgotPasswordContainer from "./forgotPasswordContainer";
import CustomerApp from "./customerApp";
import SupplierApp from "./supplierApp";

import Tokencheck from "./tokencheck";
import OtpVerificationForm from "./macroComponents/otpVerification";
import AdminLogIn from "./adminComponents/adminLoginForm";
import AdminApp from "./AdminApp";
import SignOut from "./microComponents/signOut";
import ReceiverApp from "./stakeContainers/receiverApp";
import EmployeeApp from "./stakeContainers/employeeApp";

class App extends Component {
  state = {
    userData: {
      email: "",
    },
  };

  getEmail = async (email) => {
    const userData = { email: email };
    this.setState({ userData });
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Switch>
          <Route exact path="/adminLogin" component={AdminLogIn} />
          <Route exact path="/tokenCheck" component={Tokencheck} />
          <Route
            exact
            path="/login"
            render={(props) => (
              <LoginForm
                submitEmail={(email) => this.getEmail(email)}
                {...props}
              />
            )}
          />
          <Route path="/customer" component={CustomerApp} />
          <Route path="/employee" component={EmployeeApp} />
          <Route path="/receiver" component={ReceiverApp} />
          <Route path="/admin" component={AdminApp} />
          <Route path="/supplier" component={SupplierApp} />
          <Route path="/register" component={RegisterContainer} />
          <Route path="/forgotPassword" component={ForgotPasswordContainer} />
          <Route
            exact
            path={`/verify`}
            render={(props) => (
              <OtpVerificationForm
                email={this.state.userData.email}
                forgotPassword={false}
                {...props}
              />
            )}
          />
          <Route exact path="/signOut" component={SignOut} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect exact from="/createAccount" to="/register" />
          <Redirect exact from="/signIn" to="/login" />
          <Redirect from="/" to="/login" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
