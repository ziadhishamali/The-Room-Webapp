import React, {Component} from 'react';
import '../../styles/ChatArea.css';
import ViewMessages from '../view/ViewMessages';
import IconMenu from '../view/IconMenu';
import friendsIcon from '../../images/icons/friends.svg';
import menuIcon from '../../images/icons/menu.svg';
import { LogContext } from '../../contexts/LogContext';

class ChatArea extends Component {
    
    status = () => {
        if (this.props.status) {
            return (
                <span className="status white-background small-text green-text arial-font light-weight margin-top--">online</span>
            )
        } else {
            return (
                <span className="status white-background small-text red-text arial-font light-weight margin-top--">offline</span>
            )
        }
    }

    static contextType = LogContext;

    state = {
        width: window.innerWidth,
        message: "",
        messageStatus: "",
    }

    componentDidMount() {
        window.addEventListener("resize", () => this.setState({width: window.innerWidth}));
        window.onbeforeunload = (() => {
            const { firebaseUser } = this.context;
            let myId = firebaseUser.uid;
            this.props.messagesRef.doc(this.props.messagesDocId).update({[myId + "typing"]: false})
        })
    }

    componentWillUnmount() {
        window.removeEventListener("resize", () => this.setState({width: window.innerWidth}));
    }

    componentDidUpdate() {
        console.log("his status right now: ", this.props.hisStatus);
        var messageBody = document.querySelector('.messages');
        if (messageBody !== null) {
            messageBody.scrollTop = messageBody.scrollHeight;
        }
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
        const { firebaseUser } = this.context;
        let myId = firebaseUser.uid;
        this.props.messagesRef.doc(this.props.messagesDocId).update({[myId + "typing"]: true})
        if (e.target.value === "") {
            this.props.messagesRef.doc(this.props.messagesDocId).update({[myId + "typing"]: false})
        }
    }

    sendMessage = () => {
        this.setState({message: ""});
        this.props.sendMessage(this.state.message);
        const { firebaseUser } = this.context;
        let myId = firebaseUser.uid;
        this.props.messagesRef.doc(this.props.messagesDocId).update({[myId + "typing"]: false})
    }

    getMessageStatus = (name) => {
        if (this.props.hisStatus) {
            return (
                <div className="typing-status small-text berlin-font white-text">{name + " is typing..."}</div>
            )
        } else {
            return (
                <span></span>
            )
        }
    }

    blurChanged = (e) => {
        const { firebaseUser } = this.context;
        let myId = firebaseUser.uid;
        this.props.messagesRef.doc(this.props.messagesDocId).update({[myId + "typing"]: false})
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
                    <ViewMessages messages={this.props.messages} you={this.context.firebaseUser.uid} selectedFriend={this.props.selectedFriend} getMessageStatus={this.getMessageStatus}/>
                    <div className="flex-row align justify margin-top---">
                        <textarea className="message-input berlin-font trans-background white-text margin-right" onChange={e => this.changeMessage(e)} onBlur={e => this.blurChanged(e)} value={this.state.message} placeholder="send a message"/>
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