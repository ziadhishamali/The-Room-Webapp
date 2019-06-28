import React from 'react';
import img from '../../images/DSC_0287.jpg';

const ViewMessages = ({messages}) => {
    const status = (message) => {
        if (message.from !== "you") {
            return (
                <div className="margin-left-fix align">
                    <img className="message-image margin-left--" src={img} alt="img"/>
                    <p className="message-from small-text black-text arial-font light-weight white-background margin-left--">{message.content}</p>
                </div>
            )
        } else {
            return (
                <div className="margin-right-fix align">
                    <p className="message-to small-text black-text arial-font light-weight blue-background margin-right---">{message.content}</p>
                </div>
            )
        }
    }
    const view = messages.length ? (
        messages.map((message, idx) => {
            return (
                <div key={idx} className="">
                    {status(message)}
                </div>
            )
        })
    ) : (
        <h1>No messages in this conversation yet !!</h1>
    )

    return (
        <div className="messages">
            {view}
        </div>
    )
}

export default ViewMessages