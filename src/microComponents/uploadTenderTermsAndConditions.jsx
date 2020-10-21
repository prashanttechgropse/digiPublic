import React from "react";
import Form from "../macroComponents/form/form";
class UploadTenderTermsAndConditions extends Form {
  state = {
    formData: {},
    isPublished: false,
    selectedFile: null,
    errors: {},
  };

  validateOnSubmit = () => {
    if (this.state.selectedFile !== null) return null;
    if (this.state.selectedFile === null) {
      const errors = {};
      errors.selectedFile = "upload file";
      return errors;
    }
  };

  onFileChange = async (event) => {
    // Update the state
    await this.setState({ selectedFile: event.target.files[0] });
    await this.props.onUpload(this.state.selectedFile);
  };

  doSubmit = async () => {
    this.props.onUpload(this.state.selectedFile, this.state.isPublished);
  };

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <div className="card-sigin">
            <div className="main-signup-header">
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Upload terms & conditions for the tender</label>
                    <input
                      type="file"
                      className="dropify"
                      data-height="200"
                      onChange={this.onFileChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <button
                    data-target="#publishmodal"
                    data-toggle="modal"
                    className="btn btn-primary-gradient btn-block"
                    name="publishTender"
                    onClick={this.props.published}
                    disabled={this.props.disableButton}
                  >
                    Publish Tender
                  </button>
                </div>
                <div className="col-md-6">
                  <button
                    className="btn btn-warning-gradient btn-block"
                    onClick={this.props.saveForLater}
                    disabled={this.props.disableButton}
                    name="saveForLater"
                  >
                    Save for Later
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UploadTenderTermsAndConditions;
