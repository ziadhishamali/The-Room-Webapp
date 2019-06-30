import React, { createContext, Component } from 'react';

export const LogContext = createContext();

class LogContextProvider extends Component {
    state = { 
        signedin: false,
    }

    changeSignedIn = () => {
        this.setState({signedin: true});
    }

    render() { 
        return ( 
            <LogContext.Provider value={{...this.state, changeSignedIn: this.changeSignedIn}}>
                {this.props.children}
            </LogContext.Provider>
        );
    }
}
 
export default LogContextProvider;