import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter, NavLink } from "react-router-dom";
import { withFirebase } from "react-redux-firebase";
import { compose } from "redux";
import { anonymousCreateChat } from "./../Auth/authActions";



const mapState = state => ({
  auth: state.firebase.auth,
  loading: state.async.loading

});

const actions = {
  anonymousCreateChat
};

class RightComponent extends Component {
  handleSignIn = async () => {
    this.props.anonymousCreateChat();
    console.log("logged out");
  };

  render() {
    const {loading} = this.props
    return (
      <div className='rightComponent'>
        <div class=''>
          <h5 class='playfairTag'>read my mind </h5>
          <h1 class='h1tag'>A better way to create a quotation from your refurbishment </h1>
          <div class='Separator' />
          <p class='pTag'>
            Try our AI powered chat that will talk with your client and collect precious information about your brief in an human way
          </p>
        </div>
       
        <Button className='mainButton' onClick={this.handleSignIn} >  {loading ?  'Loading' : "Start"}</Button>
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
)(RightComponent);
