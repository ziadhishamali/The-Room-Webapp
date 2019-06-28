import React, {Component} from 'react';
import '../../styles/Friends.css';
import ViewFriends from '../view/ViewFriends';
import IconMenu from '../view/IconMenu';
import backIcon from '../../images/icons/back.svg';

class Friends extends Component {
    state = {
        width: window.innerWidth,
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

    componentDidMount() {
        window.addEventListener("resize", () => this.setState({width: window.innerWidth}));
    }

    getIcon = (iconName, changeVisibilityFunc, direction) => {
        if (this.state.width <= 1000) {
            return (
                <div className="flex-row align">
                    <h1 className="small-text white-text berlin-font light-weight margin-top margin-bottom-2 friend-header">Friends</h1>
                    <IconMenu icon={iconName} changeVisibility={changeVisibilityFunc} direction={direction}/>
                </div>
            )
        }
        return (
            <div>
                <h1 className="small-text white-text berlin-font light-weight margin-top margin-bottom-2">Friends</h1>
            </div>
        )
    }

    render() {
        return (
            <div className="friends grid-item">
                {this.getIcon(backIcon, this.props.changeVisibilityFriends, "right")}
                <input className="search-box small-text black-text berlin-font margin-bottom" placeholder="search"/>
                <ViewFriends friends={this.state.friends} current={this.state.current}/>
            </div>
        )
    }
}

export default Friends