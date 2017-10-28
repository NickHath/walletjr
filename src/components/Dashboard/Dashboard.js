import React, { Component } from 'react'
import './Dashboard.css'
import logo from './walletj-cc.png'
import { getUserInfo } from '../../ducks/reducer'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

import axios from 'axios'

class Dashboard extends Component {



    componentDidMount(){
        
                this.props.getUserInfo();
                console.log(this.props.user);
                axios.post('/api/createAccount', this.props.user)
                
              }


   

    render() {



        return (
            <div >
                <div className="dash_header">
                    <Link to = '/'>
                    <div className='leftText'> WalletJr</div>
                    </Link>
                        <a href={process.env.REACT_APP_LOGOUT}><button className='rightText'>Logout</button></a>
                </div>
                <div className="dash_body">
                    <div className='dash_title'>
                        <div>Dashboard</div>
                        <div className='profile_info'>
                    { this.props.user ? <img className='avatar' alt='' src={this.props.user.img} /> : null }
                    { this.props.user ? this.props.user.user_name : null }
                    </div>
                    </div>
                    <div className='cards'>
                    <div className='newCard'>Add New Card</div>
                    <div className='userCard'>
                        <div className='cardName'>User Name</div>
                        <Link to = '../Input'>
                       <img src={logo} className='ccImage' alt='' />
                       </Link>
                    </div>
                    </div>

                </div>
                <div>
                    <h2></h2>
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
export default connect(mstp, {getUserInfo})(Dashboard);
