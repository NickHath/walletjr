import React, { Component } from 'react'
import {getUserInfo} from '../../ducks/reducer'
import {connect} from 'react-redux'
import axios from 'axios'
 class Dashboard extends Component {


    componentDidMount(){

        this.props.getUserInfo();
        console.log(this.props.user);
        axios.post('/api/createAccount', this.props.user)
        
      }

  render() {



    return (
        <div className = "dashboard_wrapper">
        <div className = "dash_header">
            <div>Account Name</div>
            <div>This is the Header</div>
        </div>
        <div className = "body">
            <div><img src="" alt=""/></div>
            <div>
                <h1>
                </h1>
                </div>
            <div>
                <h2></h2>
            </div>
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