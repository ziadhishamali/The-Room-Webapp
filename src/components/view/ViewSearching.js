import React from 'react';

const ViewSearching = ({searchList}) => {
    const view = searchList.length ? (
        searchList.map((element, idx) => {
            return (
                <div key={idx} className="friend-item align">
                    <div className="flex-column margin-left">
                        <span className="small-text white-text berlin-font light-weight margin-top--- margin-right-2">{element.name}</span>
                        <span className="add-button">+</span>
                    </div>
                </div>
            )
        })
    ) : (
        <div>Type a friend's name</div>
    )

    return (
        <div>
            {view}
        </div>
    )
}

export default ViewSearching