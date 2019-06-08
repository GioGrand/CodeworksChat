import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import ChatListItem from "./ChatListItem";

const mapState = state => ({
  chats: state.firestore.ordered.chats
});

class ChatList extends Component {
  render() {
    const { chats } = this.props;
    return (
      <div>
        {chats &&
          chats.map(chat => {
            return <ChatListItem chat={chat} />;
          })}
      </div>
    );
  }
}
export default compose(
  connect(mapState),

  firestoreConnect(props => [
    {
      collection: "chats"
    }
  ])
)(ChatList);
