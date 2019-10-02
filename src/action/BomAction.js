import * as ActionType from "./ActionType";

import fetchClient from "../api/fetchClient";
import { ApiCallBeginAction, ApiCallErrorAction } from "./ApiAction";

export const getBomsResponse = boms => ({
  type: ActionType.GET_BOMS_RESPONSE,
  boms
});

export function getBomsAction() {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .get("boms")
      .then(response => {
        dispatch(getBomsResponse(response.data.result));
      })
      .catch(error => {
        throw error;
      });
  };
}

export const addNewBomResponse = () => ({
  type: ActionType.ADD_NEW_BOM_RESPONSE
});

export const updateExistingBomResponse = () => ({
  type: ActionType.UPDATE_EXISTING_BOM_RESPONSE
});

export function saveBomAction(bomBeingAddedOrEdited) {
  return function(dispatch) {
    dispatch(ApiCallBeginAction());
    if (bomBeingAddedOrEdited.id) {
      return fetchClient
        .put("boms/" + bomBeingAddedOrEdited.id, bomBeingAddedOrEdited)
        .then(() => {
          dispatch(updateExistingBomResponse());
        })
        .catch(error => {
          dispatch(ApiCallErrorAction());
          throw error;
        });
    } else {
      return fetchClient
        .post("boms", bomBeingAddedOrEdited)
        .then(() => {
          dispatch(addNewBomResponse());
        })
        .catch(error => {
          dispatch(ApiCallErrorAction());
          throw error;
        });
    }
  };
}

export const getBomResponse = bomFound => ({
  type: ActionType.GET_BOM_RESPONSE,
  bom: bomFound
});

export function getBomAction(bomId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .get("boms/" + bomId)
      .then(response => {
        dispatch(getBomResponse(response.data.result));
      })
      .catch(error => {
        throw error;
      });
  };
}

export const deleteBomResponse = () => ({
  type: ActionType.DELETE_BOM_RESPONSE
});

export function deleteBomAction(bomId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .delete("boms/" + bomId)
      .then(() => {
        dispatch(deleteBomResponse());
      })
      .then(() => {
        dispatch(getBomsAction());
      })
      .catch(error => {
        throw error;
      });
  };
}
