import React from 'react';

const ViewMessages = ({messages, you, selectedFriend, getMessageStatus}) => {
    const status = (message) => {
        if (message.from !== you) {
            return (
                <div className="margin-left-fix align">
                    <img className="message-image margin-left-- box-shadow" src={selectedFriend.image} alt="img"/>
                    <p className="message-from small-text black-text berlin-font light-weight white-background margin-left--">{message.content}</p>
                </div>
            )
        } else {
            return (
                <div className="margin-right-fix align">
                    <p className="message-to small-text white-text berlin-font light-weight blue-background margin-right---">{message.content}</p>
                </div>
            )
        }
    }
    const view = messages.length ? (
        messages.map((message, idx) => {
            return (
                <div key={idx}>
                    {status(message)}
                </div>
            )
        })
    ) : (
        <h1 className="medium-text berlin-font white-text margin-top-2">No messages in this conversation yet !!</h1>
    )

    return (
        <div className="messages">
            {view}
            {getMessageStatus(selectedFriend.name)}
        </div>
    )
}

export default ViewMessages