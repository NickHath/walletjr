import React, { Component } from 'react'
import './Input.css'
import { getUserInfo } from '../../ducks/reducer'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import axios from 'axios'
 class Input extends Component {

constructor(){
  super();

  this.state =({
    firstName: "",
    lastName: "",
    email: ''
  })
  this.handleSubmit = this.handleSubmit.bind(this);
}

componentWillMount() {
    
}
handleSubmit(e){
  e.preventDefault() // using this prevents the form from refreshing the page on submit
  this.setState({
    firstName: this.firstname.value,
    lastName: this.lastname.value
  })
  var users = {
    firstName: this.state.firstName,
    lastName: this.state.lastName,
    
  }

  axios.post('/api/addAccount', users)
}



  render() {
    return (
      <div className='input_wrapper'>
        <div className="input_header">
                  <Link to = '/Dashboard'>
                    <div className='leftText'> WalletJr</div>
                    </Link>
                    <div className='rightText'>Log Out</div>
            </div>
               <div className='input_body'>
               <div className='accountTitle'>
                <h1>ACCOUNT INFORMATION</h1>
                </div>
                <form onSubmit={ this.handleSubmit }>
            <input className='firstName'  placeholder='First Name'
            ref={(input) => this.firstname = input}/>
            <input className='lastName' placeholder='Last Name'
            ref={(input) => this.lastname = input}/>
            <Link to = '/DashBoard'>
            <button className='btn' value = "submit" >Submit</button>
            </Link>
            </form>
            
            
            
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