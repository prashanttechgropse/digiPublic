import React, { Component } from "react";
import SearchBar from "../microComponents/searchBar";
import ProfileDropDown from "../microComponents/profileDropDown";
import SideBarToggleButton from "../microComponents/sideBarToggleButton";
import { Link } from "react-router-dom";
class MainContentHeaderBar extends Component {
  state = {};
  render() {
    return (
      <div className="main-header sticky side-header nav nav-item sticky-pin">
        <div className="container-fluid">
          <div className="main-header-left">
            <SideBarToggleButton />
            <div className="main-header-center ml-3 d-sm-none d-md-none d-lg-block">
              <SearchBar />
            </div>
          </div>
          <div className="main-header-right">
            <div className="nav nav-item navbar-nav-right ml-auto ">
              <div className="nav-link" id="bs-example-navbar-collapse-1">
                <form className="navbar-form" role="search">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                    />
                    <span className="input-group-btn">
                      <button type="reset" className="btn btn-default">
                        <i className="fa fa-times"></i>
                      </button>
                      <button
                        type="submit"
                        className="btn btn-default nav-link resp-btn"
                      ></button>
                    </span>
                  </div>
                </form>
              </div>
              <div className="nav-item full-screen fullscreen-button">
                <Link className="new nav-link full-screen-link" to="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="header-icon-svgs"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                  </svg>
                </Link>
              </div>
              <ProfileDropDown user={this.props.user} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainContentHeaderBar;
