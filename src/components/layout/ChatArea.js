import React, {Component} from 'react';
import '../../styles/ChatArea.css';
import ViewMessages from '../view/ViewMessages';
import IconMenu from '../view/IconMenu';
import friendsIcon from '../../images/icons/friends.svg';
import menuIcon from '../../images/icons/menu.svg';

class ChatArea extends Component {
    
    status = (friend) => {
        if (friend.status === "online") {
            return (
                <span className="status white-background small-text green-text arial-font light-weight margin-top--">{friend.status}</span>
            )
        } else {
            return (
                <span className="status white-background small-text red-text arial-font light-weight margin-top--">{friend.status}</span>
            )
        }
    }

    state = {
        friend: {name: "Ziad Hisham Ali", status: "online"},
        width: window.innerWidth,
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

    componentDidMount() {
        window.addEventListener("resize", () => this.setState({width: window.innerWidth}));
    }

    showIcon = (iconName, changeVisibilityFunc, direction) => {
        if (this.state.width <= 1000) {
            return (
                <IconMenu icon={iconName} changeVisibility={changeVisibilityFunc} direction={direction}/>
            )
        }
        return (
            <span></span>
        )
    }

    render() {
        return (
            <div className="chat-area grid-item">
                <div className="flex-row align">
                    {this.showIcon(friendsIcon, this.props.changeVisibilityFriends, "left")}
                    <div className="chat-status-bar margin-bottom--- margin-top---">
                        <span className="medium-text white-text bold-weight">{this.state.friend.name}</span><br/>
                        <span className="">{this.status(this.state.friend)}</span>
                    </div>
                    {this.showIcon(menuIcon, this.props.changeVisibilityInfo, "right")}
                </div>
                <ViewMessages messages={this.state.messages}/>
                <textarea className="message-input margin-top--- berlin-font trans-background white-text" placeholder="send a message"/>
            </div>
        )
    }
}

export default ChatArea