import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter, NavLink } from "react-router-dom";
import { withFirebase } from "react-redux-firebase";
import { compose } from "redux";
import { anonymousCreateChat } from "./../Auth/authActions";


const mapState = state => ({
  auth: state.firebase.auth
});

const actions = {
  anonymousCreateChat
};

class LeftComponent extends Component {
  componentDidMount() {
    if (this.props.auth.isLoaded && !this.props.auth.isEmpty) {
      console.log("already logged");
    } else {
      // this.props.anonymousCreateChat();
    }
  }

  handleSignOut = async () => {
    await this.props.firebase.logout();
    console.log("logged out");
  };

  render() {
    const { auth } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;

    return (
      <div>
        {authenticated ? (
          <h1 onClick={this.handleSignOut}>Logout</h1>
        ) : (
          <h1>Hiya</h1>
        )}
      </div>
    );
  }
}
export default compose(
  withRouter,
  withFirebase,
  connect(
    mapState,
    actions
  )
)(LeftComponent);
