import React, {Component} from 'react';
import {auth} from './firebase';
import { LogContext } from '../../contexts/LogContext';
import man from '../../images/man.svg';
import woman from '../../images/woman.svg';

class Signup extends Component {
    state = { 
        firstName: "",
        lastName: "",
        imageUrl: "",
        email: "",
        password: "",
        image: "",
        gender: "",
    }

    static contextType = LogContext;

    changeFirst = (e) => {
        this.setState({firstName: e.target.value});
    }

    changeLast = (e) => {
        this.setState({lastName: e.target.value});
    }

    changeEmail = (e) => {
        this.setState({email: e.target.value});
    }

    changePassword = (e) => {
        this.setState({password: e.target.value});
    }

    /*changeImage = (e) => {
        var files=e.target.files;
        var mimeType=files[0].type; // You can get the mime type
        console.log(mimeType, mimeType.indexOf("image"));
        if (mimeType.indexOf("image") === -1) {
            console.log("here");
            return;
        } else {
            let value = files[0];
            let state = {...this.state};
            state["imageUrl"] = value;
            state["image"] = e.target.value;
            this.setState(state);
        }
    }*/

    changeGender = (e) => {
        let value = e.target.value;
        let image = ""
        if (value === "male") {
            image = man;
        } else {
            image = woman;
        }
        this.setState({gender: value, image});
    }

    submit = (e) => {
        e.preventDefault();

        const { setFirstName, setLastName, setImage, setGender } = this.context;

        // authentication
        const promise = auth.createUserWithEmailAndPassword(this.state.email, this.state.password);
        promise.catch(error => {console.log(error);return;});

        setFirstName(this.state.firstName);
        setLastName(this.state.lastName);
        setImage(this.state.image);
        setGender(this.state.gender);
    }

    render() { 
        return ( 
            <div className="signin">
                <form className="signin-form" onSubmit={e => this.submit(e)}>
                    <h1 className="large-text white-text berlin-font margin-top-2">SIGN UP<span className="orange-text">.</span></h1>
                    <div>
                        <input className="input-text text-name small-text white-text berlin-font trans-background margin-top-4 margin-right" type="text" value={this.state.firstName} onChange={e => this.changeFirst(e)} placeholder="first name"/>
                        <input className="input-text text-name small-text white-text berlin-font trans-background margin-top" type="text" value={this.state.lastName} onChange={e => this.changeLast(e)} placeholder="last name"/>
                    </div>
                    <select className="input-text small-text blue-text berlin-font white-background margin-top" onChange={e => this.changeGender(e)} required>
                        <option className="blue-text" value="">none</option>
                        <option className="blue-text" value="male">male</option>
                        <option className="blue-text" value="female">female</option>
                    </select>
                    <input className="input-text small-text white-text berlin-font trans-background margin-top" type="text" value={this.state.email} onChange={e => this.changeEmail(e)} placeholder="email"/>
                    <input className="input-text small-text white-text berlin-font trans-background margin-top" type="password" value={this.state.password} onChange={e => this.changePassword(e)} placeholder="password"/>
                    <button className="submit-button small-text berlin-font margin-top-2">SIGN UP</button>
                    <button type="button" className="submit-button button-orange small-text berlin-font margin-top-4 margin-bottom-2" onClick={() => {this.props.history.push('./signin')}}>SIGN IN</button>
                </form>
            </div>
        );
    }
}

export default Signup;