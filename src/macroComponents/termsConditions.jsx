import React, { Component } from "react";
import httpService from "../services/httpService";
import { toast } from "react-toastify";
class TermsConditions extends Component {
  state = {
    termsConditions: "",
    ourPolicy: "",
    customerPaymentPolicy: "",
  };
  componentDidMount = async () => {
    try {
      const { data } = await httpService.get(
        `${process.env.REACT_APP_APIENDPOINT}/termsConditions`
      );
      this.setState({
        termsConditions: data.termsConditions,
        ourPolicy: data.ourPolicy,
        customerPaymentPolicy: data.customerPaymentPolicy,
      });
    } catch (error) {
      toast.error(error.message);
    }
  };
  render() {
    const { termsConditions, ourPolicy, customerPaymentPolicy } = this.state;
    return (
      <div className="container-fluid">
        <div className="breadcrumb-header justify-content-between">
          <div className="my-auto">
            <div className="d-flex">
              <h4 className="content-title mb-0 my-auto">Page</h4>
              <span className="text-muted mt-1 tx-13 ml-2 mb-0">
                / Terms & Condition
              </span>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h4 className="font-weight-semibold tx-15">
                  Terms & Condition
                </h4>
                <p className="text-muted  tx-13">{termsConditions}</p>
                <h4 className="font-weight-semibold tx-15">Our Policy</h4>
                <p className="text-muted  tx-13">{ourPolicy}</p>
                <h4 className="font-weight-semibold tx-15">
                  Customer Payment Policy
                </h4>
                <p className="text-muted  tx-13">{customerPaymentPolicy}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TermsConditions;
