import React, { Component } from 'react'
<<<<<<< HEAD
import './Dashboard.css'
import logo from './walletj-cc.png'




export default class Dashboard extends Component {

=======
import {getUserInfo} from '../../ducks/reducer'
import {connect} from 'react-redux'
 class Dashboard extends Component {
>>>>>>> f17ada2a86f83c54ca2035562c5cb41f2182283c


    componentDidMount(){
        this.props.getUserInfo();
      }

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
function mstp(state){
    
    return {
      user: state.user
      
    }
  }
export default connect(mstp, {getUserInfo})(Dashboard);