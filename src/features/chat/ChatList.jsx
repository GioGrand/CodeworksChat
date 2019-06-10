import React, { Component } from "react";
import ChatListItem from "./ChatListItem";
import Fade from "react-reveal/Fade";
import ReactLoading from "react-loading";
import { Media } from "react-bootstrap";
import { connect } from "react-redux";
import { compose } from "redux";

const mapState = state => ({
  chats: state.firestore.ordered.chats,
  loadingPost: state.async.loadingPost
});

class ChatList extends Component {
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    const { posts, loadingPost } = this.props;
    return (
      <Fade>
        <div className='overflow d-flex flex-column'>
          {posts &&
            posts.map(post => {
              return <ChatListItem post={post} />;
            })}
          {loadingPost && (
            <Media className='mediaBody2 myMedia3 ml-5 mr-5 mt-3 mb-3'>
              <Media.Body>
                <p className='chatContent'>
                  <ReactLoading type='bubbles' color='#222222' />
                </p>
              </Media.Body>
            </Media>
          )}
          <div
            style={{ float: "left", clear: "both" }}
            ref={el => {
              this.messagesEnd = el;
            }}
          />
        </div>
      </Fade>
    );
  }
}
export default compose(connect(mapState))(ChatList);
