import * as ActionType from "./ActionType";

import fetchClient from "../api/fetchClient";
import { ApiCallBeginAction, ApiCallErrorAction } from "./ApiAction";

export const getUomsResponse = uoms => ({
  type: ActionType.GET_UOMS_RESPONSE,
  uoms
});

export function getUomsAction() {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .get("uoms")
      .then(response => {
        dispatch(getUomsResponse(response.data.result));
      })
      .catch(error => {
        throw error;
      });
  };
}

export const addNewUomResponse = () => ({
  type: ActionType.ADD_NEW_UOM_RESPONSE
});

export const updateExistingUomResponse = () => ({
  type: ActionType.UPDATE_EXISTING_UOM_RESPONSE
});

export function saveUomAction(item) {
  return function(dispatch) {
    dispatch(ApiCallBeginAction());
    if (item.id) {
      return fetchClient
        .put(
          "uoms/" + item.id,
          item
        )
        .then(() => {
          dispatch(updateExistingUomResponse());
        })
        .catch(error => {
          dispatch(ApiCallErrorAction());
          throw error;
        });
    } else {
      return fetchClient
        .post("uoms", item)
        .then(() => {
          dispatch(addNewUomResponse());
        })
        .catch(error => {
          dispatch(ApiCallErrorAction());
          throw error;
        });
    }
  };
}

export const getUomResponse = item => ({
  type: ActionType.GET_UOM_RESPONSE,
  uom: item
});

export function getUomAction(id) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .get("uoms/" + id)
      .then(response => {
        dispatch(getUomResponse(response.data.result));
      })
      .catch(error => {
        throw error;
      });
  };
}

export const deleteUomResponse = () => ({
  type: ActionType.DELETE_UOM_RESPONSE
});

export function deleteUomAction(id) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .delete("uoms/" + id)
      .then(() => {
        dispatch(deleteUomResponse());
      })
      .then(() => {
        dispatch(getUomsAction());
      })
      .catch(error => {
        throw error;
      });
  };
}
