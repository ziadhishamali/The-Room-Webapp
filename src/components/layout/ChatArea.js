import React, {Component} from 'react';
import '../../styles/ChatArea.css';
import ViewMessages from '../view/ViewMessages';

class ChatArea extends Component {
    
    status = (friend) => {
        if (friend.status === "active") {
            return (
                <span className="small-text green-text arial-font light-weight margin-top--">{friend.status}</span>
            )
        } else {
            return (
                <span className="small-text red-text arial-font light-weight margin-top--">{friend.status}</span>
            )
        }
    }

    state = {
        friend: {name: "Ziad Hisham Ali", status: "active"},
        messages: [
            {from: "him", to: "you", content: "Hi !!"},
            {from: "him", to: "you", content: "How r u ?"},
            {from: "you", to: "him", content: "all good <3"},
            {from: "you", to: "him", content: "and u ?"},
            {from: "him", to: "you", content: "all fine my friend , i'd like to make this message a bit longer than usual"},
            {from: "him", to: "you", content: "Hi !!"},
            {from: "him", to: "you", content: "How r u ?"},
            {from: "you", to: "him", content: "all good <3"},
            {from: "you", to: "him", content: "and u ?"},
            {from: "him", to: "you", content: "all fine my friend"},
            {from: "him", to: "you", content: "Hi !!"},
            {from: "him", to: "you", content: "How r u ?"},
            {from: "you", to: "him", content: "all good <3"},
            {from: "you", to: "him", content: "and u ?"},
            {from: "him", to: "you", content: "all fine my friend"},
            {from: "him", to: "you", content: "Hi !!"},
            {from: "him", to: "you", content: "How r u ?"},
            {from: "you", to: "him", content: "all good <3"},
            {from: "you", to: "him", content: "and u ?"},
            {from: "him", to: "you", content: "all fine my friend"},
        ]
    }
    render() {
        return (
            <div className="chat-area grid-item">
                <div className="margin-bottom margin-top">
                    <span className="medium-text white-text bold-weight">{this.state.friend.name}</span><br/>
                    <span className="status">{this.status(this.state.friend)}</span>
                </div>
                <ViewMessages messages={this.state.messages}/>
                <textarea className="message-input margin-top berlin-font" placeholder="send a message"/>
            </div>
        )
    }
}

export default ChatArea