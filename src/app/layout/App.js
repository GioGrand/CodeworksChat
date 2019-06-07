import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import ChatDashboard from "../../features/chat/ChatDashboard";

const mapState = state => ({
  auth: state.firebase.auth
});

class App extends Component {
  render() {
    const { auth } = this.props;

    return (
      <Row>
        <Col
          xs={12}
          md={6}
          className='leftside d-flex justify-content-center align-items-center'
        >
          1 of 2
        </Col>
        <Col
          xs={12}
          md={6}
          className='rightside d-flex justify-content-center align-items-center'
        >
          <ChatDashboard />
        </Col>
      </Row>
    );
  }
}

export default compose(
  withRouter,
  connect(mapState)
)(App);
