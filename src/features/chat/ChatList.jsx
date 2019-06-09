import React, { Component } from "react";
import ChatListItem from "./ChatListItem";
import Fade from "react-reveal/Fade";

const mapState = state => ({
  chats: state.firestore.ordered.chats
});

class ChatList extends Component {
  render() {
    const { posts } = this.props;
    return (
      <Fade>
        <div className='overflow d-flex flex-column'>
        {posts &&
          posts.map(post => {
            return <ChatListItem post={post} />;
          })}
      </div>
      </Fade>
      
    );
  }
}
export default ChatList;
