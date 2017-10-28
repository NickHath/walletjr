import React, { Component } from 'react'
import './Input.css'
import { getUserInfo } from '../../ducks/reducer'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

 class Input extends Component {

componentWillMount() {
    
}



  render() {
    return (
      <div className='input_wrapper'>
        <div className="input_header">
                  <Link to = '/'>
                    <div className='leftText'> WalletJr</div>
                    </Link>
                    <div className='rightText'>Log Out</div>
            </div>
               <div className='input_body'>
               <div className='accountTitle'>
                <h1>ACCOUNT INFORMATION</h1>
                </div>
            <input className='firstName' placeholder='First Name'/>
            <input className='lastName' placeholder='Last Name'/>
            <input className='email' placeholder='Email'/>
            <button className='btn'>Submit</button>
        </div>
       
        </div>
        
     
    )
  }
}

function mstp(state){
    
    return {
             user: state.user

    }
  }
export default connect(mstp, {getUserInfo})(Input);