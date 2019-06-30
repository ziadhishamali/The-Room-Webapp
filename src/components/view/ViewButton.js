import React from 'react';

const ViewButton = ({icon, label, color, onClick}) => {
    return (
        <div className="flex-row align button" onClick={onClick}>
            <img className="button-icon margin-left margin-top margin-bottom" src={icon} alt="img"/>
            <span className={"small-text " + color + "-text margin-left berlin-font"}>{label}</span>
        </div>
    )
}

export default ViewButton