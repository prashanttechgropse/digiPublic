import React, { Component } from "react";
import TenderListDisplayCard from "../microComponents/customerTenderListDisplay";
import httpService from "../services/httpService";
import { toast } from "react-toastify";

class SecondaryUserTenderList extends Component {
  state = {
    tenderList: null,
    profileType: "",
  };

  async componentDidMount() {
    try {
      if (this.props.match.path.includes("/receiver")) {
        const { data } = await httpService.get(
          `${process.env.REACT_APP_APIENDPOINT}/receiver/tenderList`
        );
        const { tenderList } = data;
        await this.setState({ tenderList });
        await this.setState({ profileType: "receiver" });
      }
      if (this.props.match.path.includes("/employee")) {
        const { data } = await httpService.get(
          `${process.env.REACT_APP_APIENDPOINT}/employee/tenderList`
        );
        const { tenderList } = data;
        await this.setState({ tenderList });
        await this.setState({ profileType: "employee" });
      }
    } catch (error) {
      toast.error(error.message);
      return;
    }
  }

  render() {
    const { tenderList } = this.state;
    if (tenderList === null || tenderList.length === 0)
      return <h1 className="no-data-found">no tenders assigned yet</h1>;
    return (
      <div className="container-fluid">
        <div className="breadcrumb-header justify-content-between">
          <div className="my-auto">
            <div className="d-flex">
              <h4 className="content-title mb-0 my-auto">Tender</h4>
              <span className="text-muted mt-1 tx-13 ml-2 mb-0">
                / Tender List
              </span>
            </div>
          </div>
        </div>

        <div className="row row-sm">
          <div className="col-xl-12">
            <TenderListDisplayCard
              tenderList={tenderList}
              profileType={this.state.profileType}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SecondaryUserTenderList;
