import * as ActionType from "./ActionType";

import fetchClient from "../api/fetchClient";
import { ApiCallBeginAction, ApiCallErrorAction } from "./ApiAction";

export const getDeliversResponse = delivers => ({
  type: ActionType.GET_DELIVERS_RESPONSE,
  delivers
});

export function getDeliversAction() {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .get("Delivers")
      .then(response => {
        dispatch(getDeliversResponse(response.data.result));
      })
      .catch(error => {
        throw error;
      });
  };
}

export const addNewDeliverResponse = () => ({
  type: ActionType.ADD_NEW_DELIVER_RESPONSE
});

export const updateExistingDeliverResponse = () => ({
  type: ActionType.UPDATE_EXISTING_DELIVER_RESPONSE
});

export function saveDeliverAction(DeliverBeingAddedOrEdited) {
  return function(dispatch) {
    dispatch(ApiCallBeginAction());
    if (DeliverBeingAddedOrEdited.id) {
      return fetchClient
        .put(
          "Delivers/" + DeliverBeingAddedOrEdited.id,
          DeliverBeingAddedOrEdited
        )
        .then(() => {
          dispatch(updateExistingDeliverResponse());
        })
        .catch(error => {
          dispatch(ApiCallErrorAction());
          throw error;
        });
    } else {
      return fetchClient
        .post("Delivers", DeliverBeingAddedOrEdited)
        .then(() => {
          dispatch(addNewDeliverResponse());
        })
        .catch(error => {
          dispatch(ApiCallErrorAction());
          throw error;
        });
    }
  };
}

export const getDeliverResponse = DeliverFound => ({
  type: ActionType.GET_DELIVER_RESPONSE,
  Deliver: DeliverFound
});

export function getDeliverAction(DeliverId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .get("Delivers/" + DeliverId)
      .then(response => {
        dispatch(getDeliverResponse(response.data.result));
      })
      .catch(error => {
        throw error;
      });
  };
}

export const deleteDeliverResponse = () => ({
  type: ActionType.DELETE_DELIVER_RESPONSE
});

export function deleteDeliverAction(DeliverId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .delete("Delivers/" + DeliverId)
      .then(() => {
        dispatch(deleteDeliverResponse());
      })
      .then(() => {
        dispatch(getDeliversAction());
      })
      .catch(error => {
        throw error;
      });
  };
}
