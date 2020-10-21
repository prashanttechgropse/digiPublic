import React, { Component } from "react";
import RecentlyAddedTenders from "../microComponents/customerRecentTenders";
import httpService from "../services/httpService";
import { toast } from "react-toastify";

class EmployeeDashBoardMainContent extends Component {
  state = {
    employee: null,
  };

  async componentDidMount() {
    try {
      const { data } = await httpService.get(
        `${process.env.REACT_APP_APIENDPOINT}/employee/myData`
      );

      if (data) {
        if (data.user.profileType.toLowerCase() === "employee") {
          const employee = data.user;
          this.setState({ employee: employee });
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

  calculateOnGoingTenders = () => {
    const { tendersAllotted } = this.state.employee.details;
    return tendersAllotted.length;
  };

  calculateCompletedTenders = () => {
    const { tendersAllotted } = this.state.employee.details;
    const temp = tendersAllotted.filter(
      (tender) => tender.status.toLowerCase() === "completed"
    );
    return temp.length;
  };

  render() {
    const { employee: user } = this.state;
    if (user === null) return null;
    return (
      <div className="container-fluid">
        <div className="breadcrumb-header justify-content-between">
          <div className="left-content">
            <div>
              <h2 className="main-content-title tx-24 mg-b-1 mg-b-lg-1">
                {user.details.firstName}
              </h2>
              <p className="mg-b-0">Welcome Back to Digibids Platform.</p>
            </div>
          </div>
        </div>
        <div className="row row-sm">
          <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
            <div className="card overflow-hidden sales-card bg-primary-gradient">
              <div className="pl-3 pt-3 pr-3 pb-2 pt-0">
                <div className="">
                  <h6 className="mb-3 tx-12 text-white">No Of Tenders</h6>
                </div>
                <div className="pb-0 mt-0">
                  <div className="d-flex">
                    <div className="">
                      <h4 className="tx-20 font-weight-bold mb-1 text-white">
                        {user.details.tendersAllotted.length}
                      </h4>
                      <p className="mb-0 tx-12 text-white op-7">0</p>
                    </div>
                    <span className="float-right my-auto ml-auto">
                      <i className="fa fa-arrow-circle-up text-white"></i>
                      <span className="text-white op-7"> +5</span>
                    </span>
                  </div>
                </div>
              </div>
              <span id="compositeline" className="pt-1">
                <canvas width="253" height="30"></canvas>
              </span>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
            <div className="card overflow-hidden sales-card bg-danger-gradient">
              <div className="pl-3 pt-3 pr-3 pb-2 pt-0">
                <div className="">
                  <h6 className="mb-3 tx-12 text-white">Ongoing Tenders</h6>
                </div>
                <div className="pb-0 mt-0">
                  <div className="d-flex">
                    <div className="">
                      <h4 className="tx-20 font-weight-bold mb-1 text-white">
                        {this.calculateOnGoingTenders()}
                      </h4>
                      <p className="mb-0 tx-12 text-white op-7">
                        Compared to last month
                      </p>
                    </div>
                    <span className="float-right my-auto ml-auto">
                      <i className="fa fa-arrow-circle-up text-white"></i>
                      <span className="text-white op-7"> 20%</span>
                    </span>
                  </div>
                </div>
              </div>
              <span id="compositeline2" className="pt-1">
                <canvas width="253" height="30"></canvas>
              </span>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
            <div className="card overflow-hidden sales-card bg-success-gradient">
              <div className="pl-3 pt-3 pr-3 pb-2 pt-0">
                <div className="">
                  <h6 className="mb-3 tx-12 text-white">Complete Tenders</h6>
                </div>
                <div className="pb-0 mt-0">
                  <div className="d-flex">
                    <div className="">
                      <h4 className="tx-20 font-weight-bold mb-1 text-white">
                        {this.calculateCompletedTenders()}
                      </h4>
                      <p className="mb-0 tx-12 text-white op-7">
                        Compared to last month
                      </p>
                    </div>
                    <span className="float-right my-auto ml-auto">
                      <i className="fa fa-arrow-circle-up text-white"></i>
                      <span className="text-white op-7"> 10%</span>
                    </span>
                  </div>
                </div>
              </div>
              <span id="compositeline3" className="pt-1">
                <canvas width="253" height="30"></canvas>
              </span>
            </div>
          </div>
        </div>
        <RecentlyAddedTenders
          tenderList={this.state.employee.details.tendersAllotted}
          profileType="employee"
        />
      </div>
    );
  }
}

export default EmployeeDashBoardMainContent;
