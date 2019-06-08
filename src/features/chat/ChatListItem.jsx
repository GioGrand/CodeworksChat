import React, { Component } from "react";
import { Media, Image } from "react-bootstrap";

class ChatListItem extends Component {
  render() {
    const {post} = this.props
    return (
      <Media className={ post.type === 'right' ? 'myMedia ml-5 mr-5 mt-3 mb-3' : 'myMedia2 ml-5 mr-5 mt-3 mb-3'}>
        <Image
          width={50}
          height={50}
          className='mr-3 ml-3' 
          src={ post.type !== 'right' ? './assets/images/avt1.png' : './assets/images/avt2.png'}
          roundedCircle
          rounded
        />

        <Media.Body>
          <p className='chatContent'>
           {post.content} 
          </p>
        </Media.Body>
      </Media>
    );
  }
}
export default ChatListItem;
