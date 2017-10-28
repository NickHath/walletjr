import React, { Component } from 'react'
import './LandingPage.css'
import logo from './254207.svg'
import axios from "axios"
export default class LandingPage extends Component {



handleClick(){
    console.log('i got here')
    axios.get('/auth/me').then(function(res){
      console.log(res);
      console.log("stuff");
    }).catch((err) => console.log(err))
  }

  render() {

    return (
      <div className = "LandingPage">
        <div className = "header">
            <div className = "hleft">WalletJr</div>
            <a href={process.env.REACT_APP_LOGIN}><button className = 'hright'>Log in </button></a>
        </div>
        <div className = "body">
            <div className = 'image'>
                <img className = 'piggy' src={logo} alt=""/>
            
            </div>
            <div className = 'websiteName'>
                <h1>
                    WalletJr
                </h1>
                </div>
            <div className = 'websiteDescription'>
                <h3>Description</h3>
            </div>
        </div>

      </div>
    )
  }
}
