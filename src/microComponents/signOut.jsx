import { Component } from "react";

class SignOut extends Component {
  componentDidMount = async () => {
    localStorage.removeItem("token");
    return this.props.history.push("/login");
  };
  render() {
    return null;
  }
}

export default SignOut;
