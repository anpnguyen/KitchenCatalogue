import { SET_ALERT, REMOVE_ALERT, CLEAR_ALERTS } from "./types";
import uuid from "uuid/v4";

export const clearAlerts = () => dispatch => {
  dispatch({
    type: CLEAR_ALERTS
  });
};

export const setAlert = (msg, alertType) => dispatch => {
  const id = uuid();

  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
};

export const removeAlert = msgId => dispatch => {
  dispatch({ type: REMOVE_ALERT, payload: msgId });
};
