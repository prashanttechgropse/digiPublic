import React, { Component } from "react";
class CutomerDetailsCards extends Component {
  state = {};
  render() {
    const { customer } = this.props;
    return (
      <div className="row row-sm">
        <div className="col-xl-3 col-lg-6 col-md-6 col-xm-12">
          <div className="card overflow-hidden sales-card bg-primary-gradient">
            <div className="pl-3 pt-3 pr-3 pb-2 pt-0">
              <div className="">
                <h6 className="mb-3 tx-12 text-white">Customer Name</h6>
              </div>
              <div className="pb-0 mt-0">
                <div className="d-flex">
                  <div className="">
                    <h4 className="tx-20 font-weight-bold mb-1 text-white">
                      {customer.firstName}
                    </h4>
                  </div>
                  <span className="float-right my-auto ml-auto">
                    <i className="fa fa-user text-white f-24"></i>
                  </span>
                </div>
              </div>
            </div>
            <span id="compositeline" className="pt-1">
              <canvas width="253" height="30"></canvas>
            </span>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-md-6 col-xm-12">
          <div className="card overflow-hidden sales-card bg-danger-gradient">
            <div className="pl-3 pt-3 pr-3 pb-2 pt-0">
              <div className="">
                <h6 className="mb-3 tx-12 text-white">Number Of Receiver</h6>
              </div>
              <div className="pb-0 mt-0">
                <div className="d-flex">
                  <div className="">
                    <h4 className="tx-20 font-weight-bold mb-1 text-white">
                      {customer.receivers.length}
                    </h4>
                  </div>
                  <span className="float-right my-auto ml-auto">
                    <i className="fa fa-users text-white f-24"></i>
                  </span>
                </div>
              </div>
            </div>
            <span id="compositeline2" className="pt-1">
              <canvas width="253" height="30"></canvas>
            </span>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-md-6 col-xm-12">
          <div className="card overflow-hidden sales-card bg-success-gradient">
            <div className="pl-3 pt-3 pr-3 pb-2 pt-0">
              <div className="">
                <h6 className="mb-3 tx-12 text-white">No Of Tenders</h6>
              </div>
              <div className="pb-0 mt-0">
                <div className="d-flex">
                  <div className="">
                    <h4 className="tx-20 font-weight-bold mb-1 text-white">
                      {customer.tenders.length}
                    </h4>
                  </div>
                  <span className="float-right my-auto ml-auto">
                    <i className="fa fa-file text-white  f-24"></i>
                  </span>
                </div>
              </div>
            </div>
            <span id="compositeline3" className="pt-1">
              <canvas width="253" height="30"></canvas>
            </span>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-md-6 col-xm-12">
          <div className="card overflow-hidden sales-card bg-warning-gradient">
            <div className="pl-3 pt-3 pr-3 pb-2 pt-0">
              <div className="">
                <h6 className="mb-3 tx-12 text-white">Total Pay</h6>
              </div>
              <div className="pb-0 mt-0">
                <div className="d-flex">
                  <div className="">
                    <h4 className="tx-20 font-weight-bold mb-1 text-white">
                      $4,820.50
                    </h4>
                  </div>
                  <span className="float-right my-auto ml-auto">
                    <i className="fa fa-money text-white f-24"></i>
                  </span>
                </div>
              </div>
            </div>
            <span id="compositeline4" className="pt-1">
              <canvas width="253" height="30"></canvas>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default CutomerDetailsCards;
