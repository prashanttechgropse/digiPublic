import React, { Component } from "react";
class DisplayTenderItemList extends Component {
  state = {};

  renderItem() {
    let itemNo = 0;
    return this.props.itemList.map((item) => {
      const index = itemNo;
      itemNo++;
      return (
        <tr key={itemNo} role="row">
          <td>{`#000${itemNo}`}</td>
          <td>{item.category}</td>
          <td>{item.name} </td>
          <td>{item.quantity}</td>
          <td>{item.unitOfMeasure}</td>
          <td>
            <button
              className="detail-icons"
              onClick={() => this.props.itemDelete(index)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="card">
        <div className="card-header pb-0">
          <div className="d-flex justify-content-between">
            <h4 className="card-title mg-b-0 datatable-link">Item List</h4>
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
                        <th>Sr no</th>
                        <th>Category</th>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Unit of Meassure</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>{this.renderItem()}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DisplayTenderItemList;
