import React, {Component} from 'react';
import '../../styles/ChatArea.css';
import ViewMessages from '../view/ViewMessages';
import IconMenu from '../view/IconMenu';
import friendsIcon from '../../images/icons/friends.svg';
import menuIcon from '../../images/icons/menu.svg';
import { LogContext } from '../../contexts/LogContext';

class ChatArea extends Component {
    
    status = (friend) => {
        if (friend.status === "online" || true) {
            return (
                <span className="status white-background small-text green-text arial-font light-weight margin-top--">{friend.status}</span>
            )
        } else {
            return (
                <span className="status white-background small-text red-text arial-font light-weight margin-top--">{friend.status}</span>
            )
        }
    }

    static contextType = LogContext;

    state = {
        width: window.innerWidth,
        message: "",
        /*messages: [
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
        ]*/
    }

    componentDidMount() {
        window.addEventListener("resize", () => this.setState({width: window.innerWidth}));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", () => this.setState({width: window.innerWidth}));
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

    changeMessage = (e) => {
        this.setState({message: e.target.value});
    }

    sendMessage = () => {
        this.setState({message: ""});
        this.props.sendMessage(this.state.message);
    }

    render() {
        if (this.context.firebaseUser) {
            return (
                <div className="chat-area grid-item">
                    <div className="flex-row align justify">
                        {this.showIcon(friendsIcon, this.props.changeVisibilityFriends, "left")}
                        <div className="chat-status-bar margin-bottom--- margin-top---">
                            <span className="medium-text white-text bold-weight">{this.props.selectedFriend.name}</span><br/>
                            <span className="">{this.status(this.props.selectedFriend)}</span>
                        </div>
                        {this.showIcon(menuIcon, this.props.changeVisibilityInfo, "right")}
                    </div>
                    <ViewMessages messages={this.props.messages} you={this.context.firebaseUser.uid}/>
                    <div className="flex-row align justify margin-top---">
                        <textarea className="message-input berlin-font trans-background white-text margin-right" onChange={e => this.changeMessage(e)} value={this.state.message} placeholder="send a message"/>
                        <button className="submit-button small-text berlin-font" onClick={() => this.sendMessage()}>Send</button>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="chat-area grid-item">
                    
                </div>
            )
        }
    }
}

export default ChatArea