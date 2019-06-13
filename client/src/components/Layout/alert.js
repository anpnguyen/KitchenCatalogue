import React from 'react'
import PropTypes from 'prop-types'
import {connect } from 'react-redux'
// import {uuid} from 'uuid/v4'
import {removeAlert} from '../../actions/alert'

function Alert(props){
    
    
    // alertType
    const {alerts, removeAlert} = props
    console.log(alerts)
    
    const mappedAlerts = alerts.map((alert, index) => {
        
        function handleRemove(msgId){
            
            removeAlert(msgId)

        }

        return(
            
        <div  key={index + alert} className={`alert ${alert.alertType} ${index < alerts.length-1 ? 'LoginDangerPosition' : 'LoginDangerPositionLast'}`} >
            <div > {alert.msg}</div> <div className='AlertCross' onClick={()=>handleRemove(alert.id)}>x</div>
        </div>)
    })

    return(

        <div className='AlertContainer'>
             {mappedAlerts}           
        </div>

        
            
    // alerts !=null && alerts.length > 0 && alerts.map(alert=>(
    //     <div key={alert.id} className={`alert alert-${alert.alertType}`}>
    //         {alert.msg}
            
    //     </div>

    )
    
        
    

}
// this checks the props in the Alert component
Alert.propTypes = {
    // the prop alters is an array and is required
    alerts: PropTypes.array.isRequired,
    removeAlert: PropTypes.func.isRequired
}

// this gets you access to global state and makes it into a prop
// the gloabal state of alert will be mapped as props.alerts in this component
const mapStateToProps = state=>({
    alerts: state.alert
})

export default connect(mapStateToProps, {removeAlert})(Alert)