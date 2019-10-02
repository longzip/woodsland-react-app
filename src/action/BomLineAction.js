import * as ActionType from "./ActionType";

import fetchClient from "../api/fetchClient";
import { ApiCallBeginAction, ApiCallErrorAction } from "./ApiAction";

export const getBomLinesResponse = bomLines => ({
  type: ActionType.GET_BOMLINES_RESPONSE,
  bomLines
});

export function setBomLinesAction(bomLines) {
  return dispatch => {
    dispatch(ApiCallBeginAction());
    dispatch(getBomLinesResponse(bomLines));
  };
}

export function getBomLinesAction(bomId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .get("bomLines?bom=" + bomId)
      .then(response => {
        dispatch(getBomLinesResponse(response.data.result));
      })
      .catch(error => {
        throw error;
      });
  };
}

export const addNewBomLineResponse = () => ({
  type: ActionType.ADD_NEW_BOMLINE_RESPONSE
});

export const updateExistingBomLineResponse = () => ({
  type: ActionType.UPDATE_EXISTING_BOMLINE_RESPONSE
});

export function saveBomLineAction(bomLineBeingAddedOrEdited) {
  return function(dispatch) {
    dispatch(ApiCallBeginAction());
    if (bomLineBeingAddedOrEdited.id) {
      return fetchClient
        .put(
          "bomLines/" + bomLineBeingAddedOrEdited.id,
          bomLineBeingAddedOrEdited
        )
        .then(() => {
          dispatch(updateExistingBomLineResponse());
        })
        .catch(error => {
          dispatch(ApiCallErrorAction());
          throw error;
        });
    } else {
      return fetchClient
        .post("bomLines", bomLineBeingAddedOrEdited)
        .then(() => {
          dispatch(addNewBomLineResponse());
        })
        .catch(error => {
          dispatch(ApiCallErrorAction());
          throw error;
        });
    }
  };
}

export const getBomLineResponse = bomLineFound => ({
  type: ActionType.GET_BOMLINE_RESPONSE,
  bomLine: bomLineFound
});

export function setBomLineAction(bomLine) {
  return dispatch => {
    dispatch(ApiCallBeginAction());
    dispatch(getBomLineResponse(bomLine));
  };
}

export function getBomLineAction(bomLineId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .get("bomLines/" + bomLineId)
      .then(response => {
        dispatch(getBomLineResponse(response.data.result));
      })
      .catch(error => {
        throw error;
      });
  };
}

export const deleteBomLineResponse = () => ({
  type: ActionType.DELETE_BOMLINE_RESPONSE
});

export function deleteBomLineAction(bomLineId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .delete("bomLines/" + bomLineId)
      .then(() => {
        dispatch(deleteBomLineResponse());
      })
      .then(() => {
        dispatch(getBomLinesAction());
      })
      .catch(error => {
        throw error;
      });
  };
}
