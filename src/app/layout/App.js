import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import ChatDashboard from "../../features/chat/ChatDashboard";
import LeftComponent from "../../features/LeftComponent/LeftComponent";
import RightComponent from "../../features/RightComponent/RightComponent";
import Fade from "react-reveal/Fade";

const mapState = state => ({
  auth: state.firebase.auth
});

class App extends Component {
  render() {
    const { auth } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;

    return (
      <Fade>
        <Row noGutters>
          <Col
            md={6}
            className='leftside  d-flex justify-content-center align-items-center'
          >
            <LeftComponent />
          </Col>
          <Col
            xs={12}
            md={6}
            className='rightside d-flex flex-column justify-content-center align-items-center'
          >
            {authenticated ? <ChatDashboard /> : <RightComponent />}
          </Col>
        </Row>
      </Fade>
    );
  }
}

export default compose(
  withRouter,
  connect(mapState)
)(App);
