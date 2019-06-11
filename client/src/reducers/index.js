import {combineReducers} from 'redux'

import alert from "./alert"
import auth from "./auth"
import recipe from "./recipe"


// this sets the name of the state
export default combineReducers({
    alert,
    auth,
    recipe
    
})