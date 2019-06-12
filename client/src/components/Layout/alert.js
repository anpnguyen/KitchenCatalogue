import React from 'react'
import PropTypes from 'prop-types'
import {connect } from 'react-redux'
// import {uuid} from 'uuid/v4'

function Alert(props){
    const {alerts} = props
    console.log(alerts)
    
    const mappedAlerts = alerts.map((alert, index) => (
        <p key={index + alert}> {alert.msg} </p>
    ))

    return(

        <div className="alert" >
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
    alerts: PropTypes.array.isRequired
}

// this gets you access to global state and makes it into a prop
// the gloabal state of alert will be mapped as props.alerts in this component
const mapStateToProps = state=>({
    alerts: state.alert
})

export default connect(mapStateToProps)(Alert)