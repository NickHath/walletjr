import axios from 'axios'
const initialState = {
    user: {}
}

const GET_USER_INFO = 'GET_USER_INFO'

export function getUserInfo(){
    const user = axios.get("/auth/me").then(res =>res.data)
    return{
    type: GET_USER_INFO,
    payload: user
  }
}

const CREATE_USER_INFO = 'CREATE_USER_INFO'

export function createUSerInfo(){
  const newUser = axios.post("/api/createAccount").then(res => res.data)
  return{
    type: CREATE_USER_INFO,
    payload: newUser
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
