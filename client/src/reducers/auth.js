import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from '../actions/types'

// this is the intial state of the alert reducer
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null
};


export default function(state = initialState, action){

    // const {type, payload} = action
    switch(action.type){
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state, 
                ...action.payload,
                isAuthenticated: true,
                loading: false
            }

        case REGISTER_FAIL:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,                
                isAuthenticated: false,
                loading: false
            }
        
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated:true,
                loading: false,
                user: action.payload

            };
        case AUTH_ERROR:
            return {
                ...state,
                token: null,                
                isAuthenticated: false,
                loading: false
            };
        
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state, 
                ...action.payload,
                isAuthenticated: true,
                loading: false
            };

        case LOGIN_FAIL:
            return {
                ...state,
                token: null,                
                isAuthenticated: false,
                loading: false
            };
        
        case LOGOUT:
            localStorage.removeItem('token')
            return{
                ...state,
                token: null,                
                isAuthenticated: false,
                loading: false,
                user: null
            }
        
        
            default:
            return state
        }

}