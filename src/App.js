import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './styles/App.css';
import Home from './components/layout/Home';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import LogContextProvider from './contexts/LogContext';

class App extends Component {
  state = {
    signedin: false,
  }

  render() {
    return(
      <BrowserRouter>
        <div className="App">
          <LogContextProvider>
            <Route exact path='/' render={(props) => <Home {...props}/>} />
            <Route path='/signin' component={Signin}/>
            <Route path='/signup' component={Signup}/>
          </LogContextProvider>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
