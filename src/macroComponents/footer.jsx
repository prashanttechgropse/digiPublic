import React, { Component } from "react";
import { Link } from "react-router-dom";
class Footer extends Component {
  state = {};
  render() {
    return (
      <div className="main-footer ht-40">
        <div className="container-fluid pd-t-0-f ht-100p">
          <span>
            Copyright © 2020 <Link to="#">Digibids</Link>. Powered by
            <a href="http://dbtechsolution.com/">dbtechsolution</a> All rights
            reserved.
          </span>
        </div>
      </div>
    );
  }
}

export default Footer;
