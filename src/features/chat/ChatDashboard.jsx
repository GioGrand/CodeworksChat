import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import ChatForm from "./ChatForm";
import ChatList from "./ChatList";
import { Row, Col } from "react-bootstrap";

import { firestoreConnect } from "react-redux-firebase";
import { anonymousCreateChat } from "../Auth/authActions";

const actions = {
  anonymousCreateChat
};

const mapState = state => ({
  auth: state.firebase.auth,
  posts: state.firestore.ordered.myposts,
  mychat: state.firebase.profile.personal_chat
});

class ChatDashboard extends Component {
  render() {
    const { mychat, posts } = this.props;
    console.log(mychat);
    return (
      <React.Fragment>
        <ChatList posts={posts} />
        <ChatForm />
      </React.Fragment>
    );
  }
}
export default compose(
  connect(
    mapState,
    actions
  ),
  firestoreConnect(props => [
    {
      collection: "chats",
      doc: props.mychat || "11",
      subcollections: [{ collection: "posts", orderBy: ["createdAt", "asc"] }],
      storeAs: "myposts"
    }
  ])
)(ChatDashboard);
