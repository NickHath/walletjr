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
        <div className = 'about'>
            <h1 className = 'aboutHeader'>
                About
            </h1>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu pharetra libero. Sed suscipit odio ex, id iaculis velit finibus eget. Aliquam mattis interdum tempor. Vestibulum sollicitudin sapien in nulla tincidunt tincidunt. Nullam magna magna, auctor id tincidunt sed, dapibus dictum nunc. Nulla rhoncus varius magna non euismod. Donec cursus justo a purus interdum, non interdum lacus aliquet. Mauris ut fringilla odio, quis dapibus elit. Sed quis libero massa. Cras tincidunt euismod quam. Maecenas et mi quis nulla maximus gravida. Nullam hendrerit pulvinar lorem nec ullamcorper. Suspendisse iaculis sodales libero, ut congue orci cursus ac. Cras ex urna, gravida sit amet tellus feugiat, accumsan luctus dolor.

Sed et rutrum magna. Etiam pretium at lorem sit amet pharetra. Sed ultrices efficitur euismod. Vivamus sodales eros et mi consectetur facilisis. Nulla eu ex tempor lectus rhoncus luctus. Morbi vitae nibh nec augue scelerisque euismod at quis quam. Sed ac faucibus ex, id facilisis orci. Vestibulum scelerisque, felis vitae facilisis ultrices, purus turpis ultrices ex, sed pretium nulla leo quis lorem. Etiam feugiat ex eget pellentesque sagittis.
            </p>
        </div>
      </div>
    )
  }
}
