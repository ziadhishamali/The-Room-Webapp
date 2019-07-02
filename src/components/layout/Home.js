import React, {Component} from 'react';
import '../../styles/Home.css';
import Friends from './Friends';
import ChatArea from './ChatArea';
import Informations from './Informations';
import { LogContext } from '../../contexts/LogContext';
import { db } from '../auth/firebase';

class Home extends Component {

    _isMounted = false;

    state = {
        loaded: false,
        friendsVisible: false,
        infoVisible: false,
        friends: [],
        messages: [],
        messagesRef: null,
        messagesDocId: "",
        selectedFriend: {firstName: "", lastName: ""},
    }

    static contextType = LogContext;

    componentWillMount() {
        const { signedin } = this.context;
        if (!signedin) {
            this.props.history.push('/signin');
        }
    }

    componentDidMount() {
        this._isMounted = true;
        const { firebaseUser, firstName, lastName, setFirstName, setLastName, setUsersRef, setFriends } = this.context;

        // get the data of the currently logged in user
        if (firebaseUser) {
            let usersRef = db.collection("users");
            setUsersRef(usersRef);

            // get the user's data using the userID
            usersRef.doc(firebaseUser.uid).onSnapshot(doc => {
                console.log(doc);
                if (doc.exists) {
                    console.log("friends: ", doc.data().friends);
                    let friends = doc.data().friends;
                    let firstName = doc.data().firstName;
                    let lastName = doc.data().lastName;
                    setFirstName(firstName);
                    setLastName(lastName);
                    setFriends(friends);

                    // making friends list
                    var realFriends = [];
                    let firstTime = true;
                    console.log("friends ids: ", friends);
                    friends.forEach(element => {
                        var fr = {};
                        usersRef.doc(element).get().then(doc => {
                            fr.id = doc.id;
                            fr.name = doc.data().firstName + " " + doc.data().lastName;
                            fr.status = "online";
                            fr.image = "../../images/DSC_0287.jpg";
                            realFriends.push(fr);
                            if (this._isMounted) {
                                this.setState({friends: realFriends});
                            }
                            if (firstTime) {
                                this.updateSelected(realFriends[0]);
                                firstTime = false;
                            }
                        })
                    });
                } else {
                    usersRef.doc(firebaseUser.uid).set({
                        friends: [],
                        firstName: firstName,
                        lastName: lastName,
                        imageUrl: ""
                    })
                }
                if (this._isMounted) {
                    this.setState({loaded: true});
                }
            })
        }
    }

    componentDidUpdate() {
        const { signedin } = this.context;
        if (!signedin) {
            this.props.history.push('/signin');
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
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

    updateFriends = (friend) => {
        const { friends, setFriends, usersRef, firebaseUser } = this.context;
        let realFriends = [...this.state.friends, friend];
        this.setState({friends: realFriends});
        let friendsTemp = [...friends, friend.id];

        // update the other user's friends
        usersRef.doc(friend.id).get().then(doc => {
            let friendsSec = doc.data().friends;
            friendsSec.push(firebaseUser.uid);
            usersRef.doc(friend.id).update({friends: friendsSec});
        })

        setFriends(friendsTemp);
    }

    updateSelected = (friend) => {
        this.setState({selectedFriend: friend});
        console.log(friend);
        const { firebaseUser } = this.context;
        let myId = firebaseUser.uid;
        let hisId = friend.id;
        let messagesDocId = "";
        if (myId < hisId) {
            messagesDocId = myId + hisId;
        } else {
            messagesDocId = hisId + myId;
        }

        var messagesRef = db.collection("messages");
        this.setState({messagesRef, messagesDocId});
        messagesRef.doc(messagesDocId).onSnapshot(doc => {
            if (doc.exists) {
                this.setState({messages: doc.data().messages});
            } else {
                messagesRef.doc(messagesDocId).set({
                    messages: []
                })
            }
        })
    }

    sendMessage = (message) => {
        console.log(message);
        let mes = {};
        mes.content = message;
        mes.from = this.context.firebaseUser.uid;
        mes.to = this.state.selectedFriend.id;
        this.state.messages.push(mes);
        this.state.messagesRef.doc(this.state.messagesDocId).update({messages: this.state.messages});
    }

    render() {
        if (this._isMounted) {
            return (
                <div className={this.getHomeClass()}>
                    <Friends changeVisibilityFriends={this.changeVisibilityFriends} friends={this.state.friends} updateFriends={this.updateFriends} updateSelected={this.updateSelected} />
                    <ChatArea changeVisibilityFriends={this.changeVisibilityFriends} changeVisibilityInfo={this.changeVisibilityInfo} selectedFriend={this.state.selectedFriend} messages={this.state.messages} sendMessage={this.sendMessage} />
                    <Informations changeVisibilityInfo={this.changeVisibilityInfo} history={this.props.history}/>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default Home