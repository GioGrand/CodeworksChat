import React, { Component } from 'react'
import {compose} from 'redux'
import { connect } from 'react-redux';
import ChatForm from './ChatForm';

const mapState = (state) => ({
    auth: state.firebase.auth,
})

 class ChatDashboard extends Component {
    render() {
        return (
            <div>
                <ChatForm/>
            </div>
        )
    }
}
export default compose(
    connect(mapState, null)
    
)(ChatDashboard)