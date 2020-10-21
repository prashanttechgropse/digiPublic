import React, { Component } from "react";
class SupplierCreateSubUser extends Component {
  state = {};
  render() {
    return (
      <div className="container-fluid">
        <div className="breadcrumb-header justify-content-between">
          <div className="my-auto">
            <div className="d-flex">
              <h4 className="content-title mb-0 my-auto">Tender</h4>
              <span className="text-muted mt-1 tx-13 ml-2 mb-0">
                / Create Subuser
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
                    Are You want to Create New Subuser. Fill the Forms !
                  </h4>
                </div>
                <p className="tx-12 tx-gray-500 mb-2">
                  Lorem Ipsum is simply dummy text of the printing and simply
                  dummy text of the printing and typesetting industry.
                </p>
              </div>
              <div className="card-body">
                <div className="card-sigin">
                  <div className="main-signup-header">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Organization Name</label>{" "}
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Enter Organization Name "
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Code No</label>{" "}
                          <input
                            className="form-control"
                            type="text"
                            placeholder="R0321654654"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Contact Person</label>{" "}
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Enter Contact Person "
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Contact No</label>{" "}
                        <input
                          className="form-control"
                          type="text"
                          placeholder="0000000000"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Physical Address </label>{" "}
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Enter Physical Address "
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Email Id</label>{" "}
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Enter Email Id"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Postal Adress </label>{" "}
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Enter Postal Adress "
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <button className="btn btn-primary-gradient btn-block">
                        Create Subuser
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SupplierCreateSubUser;
