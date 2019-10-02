import * as ActionType from "./ActionType";

import fetchClient from "../api/fetchClient";
import { ApiCallBeginAction, ApiCallErrorAction } from "./ApiAction";

export const getWorkcentersResponse = workcenters => ({
  type: ActionType.GET_WORKCENTERS_RESPONSE,
  workcenters
});

export function getWorkcentersAction() {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .get("workcenters")
      .then(response => {
        dispatch(getWorkcentersResponse(response.data.result));
      })
      .catch(error => {
        throw error;
      });
  };
}

export const addNewWorkcenterResponse = () => ({
  type: ActionType.ADD_NEW_WORKCENTER_RESPONSE
});

export const updateExistingWorkcenterResponse = () => ({
  type: ActionType.UPDATE_EXISTING_WORKCENTER_RESPONSE
});

export function saveWorkcenterAction(workcenterBeingAddedOrEdited) {
  return function(dispatch) {
    dispatch(ApiCallBeginAction());
    if (workcenterBeingAddedOrEdited.id) {
      return fetchClient
        .put(
          "workcenters/" + workcenterBeingAddedOrEdited.id,
          workcenterBeingAddedOrEdited
        )
        .then(() => {
          dispatch(updateExistingWorkcenterResponse());
        })
        .catch(error => {
          dispatch(ApiCallErrorAction());
          throw error;
        });
    } else {
      return fetchClient
        .post("workcenters", workcenterBeingAddedOrEdited)
        .then(() => {
          dispatch(addNewWorkcenterResponse());
        })
        .catch(error => {
          dispatch(ApiCallErrorAction());
          throw error;
        });
    }
  };
}

export const getWorkcenterResponse = workcenterFound => ({
  type: ActionType.GET_WORKCENTER_RESPONSE,
  workcenter: workcenterFound
});

export function getWorkcenterAction(workcenterId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .get("workcenters/" + workcenterId)
      .then(response => {
        dispatch(getWorkcenterResponse(response.data.result));
      })
      .catch(error => {
        throw error;
      });
  };
}

export const deleteWorkcenterResponse = () => ({
  type: ActionType.DELETE_WORKCENTER_RESPONSE
});

export function deleteWorkcenterAction(workcenterId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .delete("workcenters/" + workcenterId)
      .then(() => {
        dispatch(deleteWorkcenterResponse());
      })
      .then(() => {
        dispatch(getWorkcentersAction());
      })
      .catch(error => {
        throw error;
      });
  };
}
