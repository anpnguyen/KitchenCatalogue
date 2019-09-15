import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeAlert } from "../../../actions/alert";
import "./alert.css";

const Alert = props => {
  const { alerts, removeAlert } = props;

  const mappedAlerts = alerts.map((alert, index) => {
    function handleRemove(msgId) {
      removeAlert(msgId);
    }

    return (
      <div
        key={index + alert}
        className={`alert ${alert.alertType} `}
        role="alert"
      >
        <div>{alert.msg}</div>
        <div
          className="AlertCross"
          onClick={() => handleRemove(alert.id)}
          aria-label="close"
        >
          <span aria-hidden={true}>x</span>
        </div>
      </div>
    );
  });

  return <div className="AlertContainer">{mappedAlerts}</div>;
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
  removeAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(
  mapStateToProps,
  { removeAlert }
)(Alert);
