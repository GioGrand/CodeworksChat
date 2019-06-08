import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import ChatForm from "./ChatForm";
import ChatList from "./ChatList";
import { Row, Col } from "react-bootstrap";

const mapState = state => ({
  auth: state.firebase.auth
});

class ChatDashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <ChatList />
        <ChatForm />
      </React.Fragment>
    );
  }
}
export default compose(
  connect(
    mapState,
    null
  )
)(ChatDashboard);
