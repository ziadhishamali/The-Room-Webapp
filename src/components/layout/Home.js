import React, {Component} from 'react';
import '../../styles/Home.css';
import Friends from './Friends';
import ChatArea from './ChatArea';
import Informations from './Informations';

class Home extends Component {
    state = {
        friendsVisible: false,
        infoVisible: false,
    }

    changeVisibilityFriends = () => {
        if (this.state.friendsVisible) {
            this.setState({friendsVisible: false});
        } else {
            this.setState({friendsVisible: true});
        }
    }

    changeVisibilityInfo = () => {
        if (this.state.infoVisible) {
            this.setState({infoVisible: false});
        } else {
            this.setState({infoVisible: true});
        }
        
    }

    getHomeClass = () => {
        let homeClass = "home";
        if (this.state.friendsVisible) {
            homeClass += " yes-friend";
        } else if (this.state.infoVisible) {
            homeClass += " yes-info";
        }
        console.log(homeClass);
        return homeClass;
    }

    render() {
        return (
            <div className={this.getHomeClass()}>
                <Friends changeVisibilityFriends={this.changeVisibilityFriends} />
                <ChatArea changeVisibilityFriends={this.changeVisibilityFriends} changeVisibilityInfo={this.changeVisibilityInfo} />
                <Informations changeVisibilityInfo={this.changeVisibilityInfo} />
            </div>
        )
    }
}

export default Home