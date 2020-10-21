import React from "react";
import Form from "../macroComponents/form/form";
import Joi from "joi-browser";
import pad from "../services/padding";
class SupplierSavedTenderDetailsRow extends Form {
  state = {
    formData: {
      price: null,
    },
    errors: {},
  };

  constructor(props) {
    super(props);
    let itemNo = this.props.srNo - 1;
    this.state.formData.price = this.props.bid.itemList[itemNo].price;
  }

  schema = {
    price: Joi.number().required(),
  };

  handleChange = async (srNo, e) => {
    //validation on change of input
    const errors = { ...this.state.errors };
    const errorMessage = this.validateOnChange(e.currentTarget);
    if (errorMessage) errors[e.currentTarget.name] = errorMessage;
    else delete errors[e.currentTarget.name];
    //setting state according to input
    const formData = { ...this.state.formData };
    formData[e.currentTarget.name] = e.currentTarget.value;
    await this.setState({ formData, errors });
    this.props.pushPrice(this.state.formData.price, srNo);
  };

  render() {
    const { item, srNo } = this.props;
    return (
      <tr role="row" key={srNo}>
        <td>{pad(srNo, 3)}</td>
        <td>{item.category}</td>
        <td>{item.name}</td>
        <td>
          <span className="badge badge-primary f-14">{item.unitOfMeasure}</span>
        </td>
        <td>
          <span className="badge badge-success f-14">{item.quantity}</span>
        </td>
        <td>
          <div>
            <input
              onChange={(e) => this.handleChange(srNo, e)}
              value={this.state.formData["price"]}
              type="text"
              className="form-control"
              placeholder=""
              id="price"
              name="price"
            />
            {this.state.errors["price"] && (
              <div className="alert alert-danger">
                {this.state.errors["price"]}
              </div>
            )}
          </div>
        </td>
        <td>
          {this.state.formData.price === null
            ? ""
            : parseInt(this.state.formData.price) * parseInt(item.quantity)}
        </td>
      </tr>
    );
  }
}

export default SupplierSavedTenderDetailsRow;
