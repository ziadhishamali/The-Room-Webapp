import React from 'react';

const IconMenu = ({icon, changeVisibility, direction}) => {
    const getClass = () => {
        if (direction === "right") {
            return "margin-right";
        } else {
            return "margin-left";
        }
    }
    return (
        <div className={"icon-menu " + getClass()}>
            <img src={icon} alt="menu" onClick={() => changeVisibility()}/>
        </div>
    )
}

export default IconMenu