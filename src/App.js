import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Link} from "react-router-dom"
import Home from './components/LandingPage/LandingPage'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>

        <Route exact path = "/" component = {LandingPage}  />

        </Switch>
      


      </div>
    );
  }
}

export default App;
