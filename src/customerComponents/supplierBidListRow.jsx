import React, { Component } from "react";
import httpService from "../services/httpService";

import { toast } from "react-toastify";
import { Link } from "react-router-dom";

class SupplierBidListRow extends Component {
  state = { bid: null };

  async componentDidMount() {
    if (!this.props.bidId) return;
    try {
      const { data } = await httpService.get(
        `${process.env.REACT_APP_APIENDPOINT}/bids/${this.props.bidId}`
      );
      await this.setState({ bid: data.bid });
    } catch (error) {
      toast.error(error.message);
      return;
    }
  }

  render() {
    const { index } = this.props;
    const { bid } = this.state;
    if (bid === null) return null;
    return (
      <tr role="row">
        <td>{`#000${index + 1}`}</td>
        <td>
          <Link to="#">{bid.createdBy._id.toString().substring(18, 24)}</Link>
        </td>
        <td>{bid.createdBy.firstName}</td>
        <td>{`${bid.totalAmount}.00 USD`}</td>
        <td>
          <span className="badge badge-primary f-14">10 Rating</span>
        </td>
        <td>
          <Link
            to={`/${this.props.profileType}/supplierQuotation/${bid._id}`}
            className="detail-icons"
          >
            View Detail
          </Link>
        </td>
        <td>
          <span
            className={`badge badge-${
              bid.bidStatus === "rejected"
                ? "danger"
                : bid.bidStatus === "accepted"
                ? "success"
                : "primary"
            } f-14`}
          >
            {bid.bidStatus}
          </span>
        </td>
      </tr>
    );
  }
}

export default SupplierBidListRow;
