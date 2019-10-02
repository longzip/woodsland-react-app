import * as ActionType from "./ActionType";

import fetchClient from "../api/fetchClient";
import { ApiCallBeginAction, ApiCallErrorAction } from "./ApiAction";
import { reset } from "redux-form";

export const getRoutingWorkcentersResponse = routingWorkcenters => ({
  type: ActionType.GET_ROUTINGWORKCENTERS_RESPONSE,
  routingWorkcenters
});

export function getRoutingWorkcentersAction(routingId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .get("routingWorkcenters?routingId=" + routingId)
      .then(response => {
        dispatch(getRoutingWorkcentersResponse(response.data.result));
      })
      .catch(error => {
        throw error;
      });
  };
}

export const addNewRoutingWorkcenterResponse = () => ({
  type: ActionType.ADD_NEW_ROUTINGWORKCENTER_RESPONSE
});

export const updateExistingRoutingWorkcenterResponse = () => ({
  type: ActionType.UPDATE_EXISTING_ROUTINGWORKCENTER_RESPONSE
});

export function saveRoutingWorkcenterAction(
  routingWorkcenterBeingAddedOrEdited
) {
  return function(dispatch) {
    dispatch(ApiCallBeginAction());
    if (routingWorkcenterBeingAddedOrEdited.id) {
      return fetchClient
        .put(
          "RoutingWorkcenters/" + routingWorkcenterBeingAddedOrEdited.id,
          routingWorkcenterBeingAddedOrEdited
        )
        .then(() => {
          dispatch(updateExistingRoutingWorkcenterResponse());
          dispatch(reset("RoutingWorkcenterForm"));
        })
        .catch(error => {
          dispatch(ApiCallErrorAction());
          throw error;
        });
    } else {
      return fetchClient
        .post("RoutingWorkcenters", routingWorkcenterBeingAddedOrEdited)
        .then(() => {
          dispatch(addNewRoutingWorkcenterResponse());
          dispatch(reset("RoutingWorkcenterForm"));
        })
        .catch(error => {
          dispatch(ApiCallErrorAction());
          throw error;
        });
    }
  };
}

export const getRoutingWorkcenterResponse = routingWorkcenterFound => ({
  type: ActionType.GET_ROUTINGWORKCENTER_RESPONSE,
  routingWorkcenter: routingWorkcenterFound
});

export function getRoutingWorkcenterAction(routingWorkcenterId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .get("routingWorkcenters/" + routingWorkcenterId)
      .then(response => {
        dispatch(getRoutingWorkcenterResponse(response.data.result));
      })
      .catch(error => {
        throw error;
      });
  };
}

export const deleteRoutingWorkcenterResponse = () => ({
  type: ActionType.DELETE_ROUTINGWORKCENTER_RESPONSE
});

export function deleteRoutingWorkcenterAction(routingWorkcenterId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .delete("routingWorkcenters/" + routingWorkcenterId)
      .then(() => {
        dispatch(deleteRoutingWorkcenterResponse());
      })
      .then(() => {
        // dispatch(getRoutingWorkcentersAction());
      })
      .catch(error => {
        throw error;
      });
  };
}
