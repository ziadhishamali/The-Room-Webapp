import React, {Component} from 'react';
import '../../styles/Friends.css';
import ViewFriends from '../view/ViewFriends';

class Friends extends Component {
    state = {
        friends: [
            {name: "Ziad Hisham Ali", status: "active", image: "../../images/DSC_0287.jpg"},
            {name: "Youssef Ahmed", status: "offline", image: "../../images/DSC_0287.jpg"},
            {name: "Tarek Maher", status: "active", image: "../../images/DSC_0287.jpg"},
            {name: "Omar Shaker", status: "active", image: "../../images/DSC_0287.jpg"},
            {name: "Khalid Ramadan", status: "offline", image: "../../images/DSC_0287.jpg"},
            {name: "Mostafa Lasheen", status: "offline", image: "../../images/DSC_0287.jpg"},
            {name: "Mostafa Farrag", status: "active", image: "../../images/DSC_0287.jpg"}
        ],
        current: 0
    }
    render() {
        return (
            <div className="friends grid-item">
                <h1 className="small-text white-text berlin-font light-weight margin-top margin-bottom-2">Friends</h1>
                <ViewFriends friends={this.state.friends} current={this.state.current}/>
            </div>
        )
    }
}

export default Friends