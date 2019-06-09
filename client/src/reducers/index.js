import {combineReducers} from 'redux'

import alert from "./alert"
import auth from "./auth"
// import profile from "./profile"


// this sets the name of the state
export default combineReducers({
    alert,
    auth
    // profile
})