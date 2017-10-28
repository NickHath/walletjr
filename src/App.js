import React, { Component } from 'react';

import './App.css';
import {Route, Switch} from "react-router-dom"
import LandingPage from './components/LandingPage/LandingPage'
import Input from './components/Input/Input'
import Dashboard from './components/Dashboard/Dashboard'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>

        
        <Route exact path = "/" component = {LandingPage}  /> 
        <Route path = "/Dashboard" component = { Dashboard }/>
        <Route path = "/Input" component = { Input }/>    
        </Switch>
      


      </div>
    );
  }
}

export default App;
