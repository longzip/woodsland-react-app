import * as ActionType from "./ActionType";

import fetchClient from "../api/fetchClient";
import { ApiCallBeginAction, ApiCallErrorAction } from "./ApiAction";

export const getRoutingsResponse = routings => ({
  type: ActionType.GET_ROUTINGS_RESPONSE,
  routings
});

export function getRoutingsAction() {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .get("Routings")
      .then(response => {
        dispatch(getRoutingsResponse(response.data.result));
      })
      .catch(error => {
        throw error;
      });
  };
}

export const addNewRoutingResponse = () => ({
  type: ActionType.ADD_NEW_ROUTING_RESPONSE
});

export const updateExistingRoutingResponse = () => ({
  type: ActionType.UPDATE_EXISTING_ROUTING_RESPONSE
});

export function saveRoutingAction(RoutingBeingAddedOrEdited) {
  return function(dispatch) {
    dispatch(ApiCallBeginAction());
    if (RoutingBeingAddedOrEdited.id) {
      return fetchClient
        .put(
          "Routings/" + RoutingBeingAddedOrEdited.id,
          RoutingBeingAddedOrEdited
        )
        .then(() => {
          dispatch(updateExistingRoutingResponse());
        })
        .catch(error => {
          dispatch(ApiCallErrorAction());
          throw error;
        });
    } else {
      return fetchClient
        .post("Routings", RoutingBeingAddedOrEdited)
        .then(() => {
          dispatch(addNewRoutingResponse());
        })
        .catch(error => {
          dispatch(ApiCallErrorAction());
          throw error;
        });
    }
  };
}

export const getRoutingResponse = RoutingFound => ({
  type: ActionType.GET_ROUTING_RESPONSE,
  routing: RoutingFound
});

export function getRoutingAction(RoutingId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .get("Routings/" + RoutingId)
      .then(response => {
        dispatch(getRoutingResponse(response.data.result));
      })
      .catch(error => {
        throw error;
      });
  };
}

export const deleteRoutingResponse = () => ({
  type: ActionType.DELETE_ROUTING_RESPONSE
});

export function deleteRoutingAction(RoutingId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .delete("Routings/" + RoutingId)
      .then(() => {
        dispatch(deleteRoutingResponse());
      })
      .then(() => {
        dispatch(getRoutingsAction());
      })
      .catch(error => {
        throw error;
      });
  };
}
