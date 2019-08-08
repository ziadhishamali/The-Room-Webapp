import React from 'react';

const ViewFriends = ({friends, current, selectFriend}) => {

    const background = (idx) => {
        if (idx === current) {
            return "friend-item align black-background-trans";
        } else {
            return "friend-item align";
        }
    }

    const view = friends.length ? (
        friends.map((friend, idx) => {
            return (
                <div key={idx} className={background(idx)} onClick={() => selectFriend(idx)}>
                    <img src={friend.image} alt="img" className="friend-image margin-left box-shadow"/>
                    <div className="flex-column margin-left justify align">
                        <span className="small-text white-text berlin-font light-weight">{friend.name}</span>
                    </div>
                </div>
            )
        })
    ) : (
        <div>
            <span className="medium-text berlin-font white-text">you don't have friends yet !!</span><br/>
            <button className="submit-button button-orange small-text berlin-font margin-top">Add Friends</button>
        </div>
    )

    return (
        <div className="friends-list">
            {view}
        </div>
    )
}

export default ViewFriends