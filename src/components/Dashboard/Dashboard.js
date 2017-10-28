import React, { Component } from 'react'
import './Dashboard.css'
import logo from './walletj-cc.png'




export default class Dashboard extends Component {




  render() {



    return (
        <div >
        <div className = "dash_header">
            <div className='leftText'> Walletjr</div>
            <div className='rightText'>Log Out</div>
        </div>
        <div className = "dash_body">
            
            <div className='userCard'>
                <div className='cardName'>userName</div>
                <img src={logo} className='' alt=''/>
            </div>
               
                </div>
            <div>
                <h2></h2>
            </div>
        </div>

      
    )
  }
}
