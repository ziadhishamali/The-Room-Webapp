import React, {Component} from 'react';
import '../../styles/Informations.css';
import IconMenu from '../view/IconMenu';
import ViewButton from '../view/ViewButton';

import next from '../../images/icons/next.svg';
import logout from '../../images/icons/logout-white.svg';
import design from '../../images/icons/design-white.png';
import edit from '../../images/icons/edit-white.png';
import { auth } from '../auth/firebase';

class Informations extends Component {
    state = {
        width: window.innerWidth,
    }

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
                    <IconMenu icon={iconName} changeVisibility={changeVisibilityFunc} direction={direction}/>
                    <h1 className="small-text white-text berlin-font light-weight margin-top margin-bottom-2 information-header">Settings</h1>
                </div>
            )
        }
        return (
            <div>
                <h1 className="small-text white-text berlin-font light-weight margin-top margin-bottom-2">Settings</h1>
            </div>
        )
    }

    logOut = () => {
        auth.signOut();
    }

    render() {
        return (
            <div className="informations grid-item">
                {this.getIcon(next, this.props.changeVisibilityInfo, "left")}
                <ViewButton icon={logout} label={"Log Out"} color={"white"} onClick={this.logOut} />
                <h1 className="small-text white-text berlin-font light-weight margin-top margin-bottom-2">Options</h1>
                <ViewButton icon={design} label={"Change Color"} color={"white"} onClick={() => this.props.changeColor()} />
                <ViewButton icon={edit} label={"Edit Nicknames"} color={"white"} />
                <h1 className="small-text white-text berlin-font light-weight margin-top margin-bottom-2">Shared Files</h1>
            </div>
        )
    }
}

export default Informations