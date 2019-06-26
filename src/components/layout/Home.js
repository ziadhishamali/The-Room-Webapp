import React, {Component} from 'react';
import '../../styles/Home.css';
import Friends from './Friends';
import ChatArea from './ChatArea';
import Informations from './Informations';

class Home extends Component {
    render() {
        return (
            <div className="home">
                <Friends />
                <ChatArea />
                <Informations />
            </div>
        )
    }
}

export default Home