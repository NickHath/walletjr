import React, { Component } from 'react'
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
            <div className='leftText'> Name</div>
            <div className='rightText'>This is the Header</div>
        </div>
        <div className = "dash_body">
            
            <div></div>
               
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