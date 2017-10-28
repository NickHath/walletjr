import React, { Component } from 'react'
import './LandingPage.css'
import logo from './254207.svg'
export default class LandingPage extends Component {
  render() {
    return (
      <div className = "LandingPage">
        <div className = "header">
            <div className = "hleft">WalletJr</div>
            <div className = 'hright'>Log In</div>
        </div>
        <div className = "body">
            <div className = 'image'>
                <img className = 'piggy' src={logo} alt=""/>
            
            </div>
            <div className = 'websiteName'>
                <h1>
                    WalletJr.com
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
