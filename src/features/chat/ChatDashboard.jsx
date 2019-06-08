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
      <Col>
        <Row className='chatRow'>
          <ChatList />
        </Row>
        <Row className='formRow'>
          <ChatForm />
        </Row>
      </Col>
    );
  }
}
export default compose(
  connect(
    mapState,
    null
  )
)(ChatDashboard);
