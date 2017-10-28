import React, { Component } from 'react'
import './Dashboard.css'
import logo from './walletj-cc.png'
import {getUserInfo} from '../../ducks/reducer'
import {connect} from 'react-redux'



 class Dashboard extends Component {




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
