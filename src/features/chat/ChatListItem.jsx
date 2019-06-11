import React, { Component } from "react";
import { Media, Image } from "react-bootstrap";

class ChatListItem extends Component {
  render() {
    const {post, chat} = this.props
    console.log(chat)
   // const client = chat.client_name || 'you'
    return (
      <Media className={ post.type === 'right' ? 'mediaBody2 myMedia ml-5 mr-5 mt-3 mb-3' : 'mediaBody2 myMedia2 ml-5 mr-5 mt-3 mb-3'}>
        <Image
          width={50}
          height={50}
          className='mr-3 ml-3' 
          src={ post.type !== 'right' ? './assets/images/avt1.jpg' : './assets/images/avt2.jpg'}
          roundedCircle
          rounded
        />

        <Media.Body>
          <p className='chatContent'>

            {post.type !== 'right' ? <span className="name" >Adam: </span> : <span className="name" >You: </span>}
          
          
          
          
          {post.content} 
          </p>
        </Media.Body>
      </Media>
    );
  }
}
export default ChatListItem;
