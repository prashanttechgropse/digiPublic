import React, { Component } from "react";
import { Link } from "react-router-dom";
import pad from "../../services/padding";
class AdminRecentlyAddedSupplierList extends Component {
  state = {};

  renderSupplierList = () => {
    let srNo = 0;
    if (this.props.supplierList === "") return null;
    return this.props.supplierList.map((supplier) => {
      srNo++;
      if (srNo <= 5) {
        return (
          <tr role="row" key={srNo}>
            <td>{pad(srNo, 3)}</td>
            <td>{supplier.firstName}</td>
            <td>{supplier.entityRegistrationNo}</td>
            <td>{supplier.contactNumber}</td>
            <td>{`${supplier.tendersAwarded.length} Tenders`}</td>
            <td>
              <span className="badge badge-primary f-14">Active</span>
            </td>
            <td>
              <Link
                to={`/admin/supplierDetails/${supplier._id}`}
                className="detail-icons"
              >
                <i className="fa fa-eye"></i>
              </Link>
            </td>
          </tr>
        );
      } else return null;
    });
  };

  render() {
    return (
      <div className="row row-sm">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header pb-0">
              <div className="d-flex justify-content-between">
                <h4 className="card-title mg-b-0 datatable-link">
                  Recently Added Suppliers{" "}
                </h4>
              </div>
              <p className="tx-12 tx-gray-500 mb-2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <div>
                  <div className="row">
                    <div className="col-sm-12">
                      <table className="table text-md-nowrap">
                        <thead>
                          <tr role="row">
                            <th>Sr No</th>
                            <th>Name</th>
                            <th>Reference No</th>
                            <th>Contact No</th>
                            <th>No Of Tenders</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>{this.renderSupplierList()}</tbody>
                      </table>
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

export default AdminRecentlyAddedSupplierList;
