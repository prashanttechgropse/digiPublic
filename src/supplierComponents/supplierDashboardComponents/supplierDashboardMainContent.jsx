import React, { Component } from "react";
import RecentlyAddedTenders from "../../microComponents/recentlyAddedTenders";
import httpService from "../../services/httpService";
import { toast } from "react-toastify";

class SupplierDashboardMainContent extends Component {
  state = {
    supplier: null,
    increaseInTenders: "",
    increaseInOngoingTenders: "",
    increaseInCompletedTenders: "",
  };

  async componentDidMount() {
    try {
      const { data } = await httpService.get(
        `${process.env.REACT_APP_APIENDPOINT}/supplier/myData`
      );
      if (data.user.profileType.toLowerCase() === "supplier") {
        const supplier = data.user;
        this.setState({ supplier: supplier });
        this.setState({ increaseInTenders: data.increaseInTenders });
        this.setState({
          increaseInOngoingTenders: data.increaseInOngoingTenders,
        });
        this.setState({
          increaseInCompletedTenders: data.increaseInCompletedTenders,
        });
      } else return await this.props.history.push(`/${data.user.profileType}`);
    } catch (error) {
      toast.error(error.message);
      return;
    }
  }

  calculateOnGoingTenders = () => {
    const { tendersAwarded: tenders } = this.state.supplier.details;
    const temp = tenders.filter(
      (tender) => tender.status.toLowerCase() === "awarded"
    );
    return temp.length;
  };

  calculateCompletedTenders = () => {
    const { tendersAwarded: tenders } = this.state.supplier.details;
    const temp = tenders.filter(
      (tender) => tender.status.toLowerCase() === "completed"
    );
    return temp.length;
  };

  render() {
    const { supplier: user } = this.state;
    if (user === null) return null;
    return (
      <div className="container-fluid">
        <div className="breadcrumb-header justify-content-between">
          <div className="left-content">
            <div>
              <h2 className="main-content-title tx-24 mg-b-1 mg-b-lg-1">
                {user.details.firstName}
              </h2>
              <p className="mg-b-0">Welcome Back to DigiBids Platform.</p>
            </div>
          </div>
        </div>
        <div className="row row-sm">
          <div className="col-xl-3 col-lg-6 col-md-6 col-xm-12">
            <div className="card overflow-hidden sales-card bg-primary-gradient">
              <div className="pl-3 pt-3 pr-3 pb-2 pt-0">
                <div className="">
                  <h6 className="mb-3 tx-12 text-white">No Of Tenders</h6>
                </div>
                <div className="pb-0 mt-0">
                  <div className="d-flex">
                    <div className="">
                      <h4 className="tx-20 font-weight-bold mb-1 text-white">
                        {user.details.tendersAwarded.length}
                      </h4>
                      <p className="mb-0 tx-12 text-white op-7">
                        Compared to last month
                      </p>
                    </div>
                    <span className="float-right my-auto ml-auto">
                      <i
                        className={`fa fa-arrow-circle-${
                          this.state.increaseInTenders > 0 ? "up" : "down"
                        } text-white`}
                      ></i>
                      <span className="text-white op-7">
                        {this.state.increaseInTenders > 0
                          ? `+${this.state.increaseInTenders}`
                          : this.state.increaseInTenders}
                      </span>
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
                      <i
                        className={`fa fa-arrow-circle-${
                          this.state.increaseInOngoingTenders > 0
                            ? "up"
                            : "down"
                        } text-white`}
                      ></i>
                      <span className="text-white op-7">
                        {this.state.increaseInOngoingTenders > 0
                          ? `+${this.state.increaseInOngoingTenders}`
                          : this.state.increaseInOngoingTenders}
                      </span>
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
                      <i
                        className={`fa fa-arrow-circle-${
                          this.state.increaseInCompletedTenders > 0
                            ? "up"
                            : "down"
                        } text-white`}
                      ></i>
                      <span className="text-white op-7">
                        {this.state.increaseInCompletedTenders > 0
                          ? `+${this.state.increaseInCompletedTenders}`
                          : this.state.increaseInCompletedTenders}
                      </span>
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
                  <h6 className="mb-3 tx-12 text-white">
                    Total Monthly Earning
                  </h6>
                </div>
                <div className="pb-0 mt-0">
                  <div className="d-flex">
                    <div className="">
                      <h4 className="tx-20 font-weight-bold mb-1 text-white">
                        4,820.50USD
                      </h4>
                      <p className="mb-0 tx-12 text-white op-7">
                        Compared to last month
                      </p>
                    </div>
                    <span className="float-right my-auto ml-auto">
                      {" "}
                      <i className="fa fa-arrow-circle-down text-white"></i>{" "}
                      <span className="text-white op-7"> 24%</span>{" "}
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
        <div className="row row-sm">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header pb-0">
                <div className="d-flex justify-content-between">
                  <h4 className="card-title mg-b-0 datatable-link">
                    Recent Tenders posted by the customers
                  </h4>
                </div>
                <p className="tx-12 tx-gray-500 mb-2">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>
              <RecentlyAddedTenders />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SupplierDashboardMainContent;
