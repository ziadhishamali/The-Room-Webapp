import React from 'react';

const ViewSearching = ({searchList, addFriend}) => {
    const view = searchList.length ? (
        searchList.map((element, idx) => {
            return (
                <div key={idx} className="friend-item align" onClick={() => addFriend(idx)}>
                        <span className="small-text white-text berlin-font light-weight margin-top--- margin-bottom--- margin-left-2 margin-right-2">{element.name}</span>
                </div>
            )
        })
    ) : (
        <div className="medium-text berlin-font white-text">No Search Results</div>
    )

    return (
        <div className="friends-list">
            {view}
        </div>
    )
}

export default ViewSearching