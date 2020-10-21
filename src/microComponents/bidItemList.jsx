import React, { Component } from "react";
class BidItemListRow extends Component {
  state = {};
  render() {
    const { item, index } = this.props;
    return (
      <tr key={index} role="row">
        <td>{`000${index + 1}`}</td>
        <td>{item.category}</td>
        <td>{item.name}</td>
        <td>
          <span className="badge badge-primary f-14">
            {`${item.quantity} ${item.unitOfMeasure}`}
          </span>
        </td>
        <td>{`${item.price}.00 USD`}</td>
        <td>{`${item.price * item.quantity}.00 USD`}</td>
      </tr>
    );
  }
}

export default BidItemListRow;
