import React, {Component} from 'react';
import '../../styles/Friends.css';
import ViewFriends from '../view/ViewFriends';
import ViewSearching from '../view/ViewSearching';
import IconMenu from '../view/IconMenu';
import backIcon from '../../images/icons/back.svg';
import { LogContext } from '../../contexts/LogContext';

class Friends extends Component {
    state = {
        width: window.innerWidth,
        current: 0,
        searchList: [],
        searching: false,
    }

    static contextType = LogContext;

    componentDidMount() {
        window.addEventListener("resize", () => this.setState({width: window.innerWidth}));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", () => this.setState({width: window.innerWidth}));
    }

    getIcon = (iconName, changeVisibilityFunc, direction) => {
        if (this.state.width <= 1000) {
            return (
                <div className="flex-row align">
                    <img className="friend-image margin-left box-shadow-2 cursor" src={this.context.image} alt="my"/>
                    <div className="flex-row justify align friend-width margin-right-4"><h1 className="small-text white-text berlin-font light-weight margin-top margin-bottom-2 friend-header">Friends</h1></div>
                    <IconMenu icon={iconName} changeVisibility={changeVisibilityFunc} direction={direction}/>
                </div>
            )
        }
        return (
            <div className="flex-row justify-start align">
                <img className="friend-image margin-left box-shadow-2 cursor" src={this.context.image} alt="my"/>
                <div className="flex-row justify align friend-width"><h1 className="small-text white-text berlin-font light-weight margin-top margin-bottom-2">Friends</h1></div>
            </div>
        )
    }

    changeSearchingFalse = () => {
        setTimeout(() => {this.setState({searching: false})}, 1000);
    }

    search = (e) => {
        const { usersRef } = this.context;
        if (this.state.searching === false) {
            this.setState({searching: true});
        }
        let name = e.target.value;
        let firstName = name.split(/\s+/)[0];
        let lastName = name.split(/\s+/)[1];
        let searchListID = [];
        let searchList = [];

        usersRef.where("firstName", "==", firstName).get().then(querySnapshot => {
            console.log(querySnapshot);
            querySnapshot.forEach(doc => {
                let sitem = {};
                if (!searchListID.includes(doc.id)) {
                    searchListID.push(doc.id);
                    sitem.id = doc.id;
                    sitem.name = doc.data().firstName + " " + doc.data().lastName;
                    sitem.status = "online";
                    sitem.image = doc.data().image;
                    searchList.push(sitem);
                }
            });
            this.setState({searchList});
        });

        if (lastName !== undefined) {
            usersRef.where("firstName", "==", lastName).get().then(querySnapshot => {
                console.log(querySnapshot);
                querySnapshot.forEach(doc => {
                    let sitem = {};
                    if (!searchListID.includes(doc.id)) {
                        searchListID.push(doc.id);
                        sitem.id = doc.id;
                        sitem.name = doc.data().firstName + " " + doc.data().lastName;
                        sitem.status = "online";
                        sitem.image = doc.data().image;
                        searchList.push(sitem);
                    }
                });
                this.setState({searchList});
            });
        }

        if (lastName !== undefined) {
            usersRef.where("LastName", "==", lastName).get().then(querySnapshot => {
                console.log(querySnapshot);
                querySnapshot.forEach(doc => {
                    let sitem = {};
                    if (!searchListID.includes(doc.id)) {
                        searchListID.push(doc.id);
                        sitem.id = doc.id;
                        sitem.name = doc.data().firstName + " " + doc.data().lastName;
                        sitem.status = "online";
                        sitem.image = doc.data().image;
                        searchList.push(sitem);
                    }
                });
                this.setState({searchList});
            });
        }

        usersRef.where("lastName", "==", firstName).get().then(querySnapshot => {
            console.log(querySnapshot);
            querySnapshot.forEach(doc => {
                let sitem = {};
                if (!searchListID.includes(doc.id)) {
                    searchListID.push(doc.id);
                    sitem.id = doc.id;
                    sitem.name = doc.data().firstName + " " + doc.data().lastName;
                    sitem.status = "online";
                    sitem.image = doc.data().image;
                    searchList.push(sitem);
                }
            });
            this.setState({searchList});
        });
    }

    addFriend = (idx) => {
        let addedFriend = [...this.state.searchList][idx];

        // check if the user is already friend w/ the selected friend
        if (this.context.firebaseUser.uid === addedFriend.id) {
            return;
        }
        let flag = false;
        for (let friend of this.props.friends) {
            console.log("friend: ", friend.id, " added friend: ", addedFriend.id, (friend.id === addedFriend.id));
            if (friend.id === addedFriend.id) {
                flag = true;
                break;
            }
        }

        if (!flag) {
            // the selected friend is new
            this.props.updateFriends(addedFriend);
        }
    }

    selectFriend = (idx) => {
        let selectedFriend = [...this.props.friends][idx];
        this.setState({current: idx});
        this.props.changeVisibilityFriends();
        this.props.updateSelected(selectedFriend);
    }

    render() {
        if (!this.state.searching) {
            return (
                <div className="friends grid-item">
                    {this.getIcon(backIcon, this.props.changeVisibilityFriends, "right")}
                    <input className="search-box small-text white-text berlin-font margin-bottom trans-background" onChange={e => this.search(e)} placeholder="search"/>
                    <ViewFriends friends={this.props.friends} current={this.state.current} selectFriend={this.selectFriend}/>
                </div>
            )
        } else {
            return (
                <div className="friends grid-item">
                    {this.getIcon(backIcon, this.props.changeVisibilityFriends, "right")}
                    <input className="search-box small-text white-text berlin-font margin-bottom trans-background" onBlur={() => this.changeSearchingFalse()} onChange={e => this.search(e)} placeholder="search"/>
                    <ViewSearching addFriend={this.addFriend} searchList={this.state.searchList} current={this.state.current}/>
                </div>
            )
        }
    }
}

export default Friends