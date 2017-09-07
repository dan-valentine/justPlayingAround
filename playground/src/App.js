import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './components/Login/Login';
import Private from './components/Private/Private';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/private' component={Private} />
        </Switch>
      </div>
    );
  }
}

export default App;
