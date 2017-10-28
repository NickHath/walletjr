import axios from 'axios'
const initialState = {
    user: {name: 'dsfjkbdfh'}
}

const GET_USER_INFO = 'GET_USER_INFO'

export function getUserInfo(){
    const user = axios.get("/auth/me").then(res =>res.data)
    return{
    type: GET_USER_INFO,
    payload: user
  }
}

export default (state=initialState, action) => {
  switch (action.type){

 case GET_USER_INFO + '_FULFILLED':
 console.log(action.payload)
  return Object.assign({}, state, {user: action.payload})

  default:
    return state
  }
}
