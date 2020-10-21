import React, { Component } from "react";
import { Link } from "react-router-dom";
import TenderListDisplayCard from "../../microComponents/customerTenderListDisplay";
import httpService from "../../services/httpService";
import { toast } from "react-toastify";

class CustomerTenderList extends Component {
  state = {
    tenderList: [],
  };

  async componentDidMount() {
    try {
      const { data } = await httpService.get(
        `${process.env.REACT_APP_APIENDPOINT}/customer/tenderList`
      );
      const { tenderList } = data;
      await this.setState({ tenderList });
    } catch (error) {
      toast.error(error.message);
      return;
    }
  }

  render() {
    const { tenderList } = this.state;
    if (tenderList.length === 0)
      return (
        <h1 className="no-data-found">
          You Dont Have Any Published Tenders Yet
        </h1>
      );
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
          <div className="d-flex my-xl-auto right-content">
            <div className="pr-1 mb-3 mb-xl-0">
              <Link
                to={`/customer/createTender`}
                type="button"
                className="btn btn-primary "
              >
                <i className="fa fa-plus"></i> Create New Tender
              </Link>
            </div>
          </div>
        </div>

        <div className="row row-sm">
          <div className="col-xl-12">
            <TenderListDisplayCard
              tenderList={tenderList}
              profileType="customer"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerTenderList;
