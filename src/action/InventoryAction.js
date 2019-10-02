import * as ActionType from "./ActionType";

import fetchClient from "../api/fetchClient";
import { ApiCallBeginAction, ApiCallErrorAction } from "./ApiAction";

export const getInventoriesResponse = inventories => ({
  type: ActionType.GET_INVENTORIES_RESPONSE,
  inventories
});

export function getInventoriesAction() {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .get("Inventories")
      .then(response => {
        dispatch(getInventoriesResponse(response.data.result));
      })
      .catch(error => {
        throw error;
      });
  };
}

export const addNewInventoryResponse = () => ({
  type: ActionType.ADD_NEW_INVENTORY_RESPONSE
});

export const updateExistingInventoryResponse = () => ({
  type: ActionType.UPDATE_EXISTING_INVENTORY_RESPONSE
});

export function saveInventoryAction(InventoryBeingAddedOrEdited) {
  return function(dispatch) {
    dispatch(ApiCallBeginAction());
    if (InventoryBeingAddedOrEdited.id) {
      return fetchClient
        .put(
          "Inventories/" + InventoryBeingAddedOrEdited.id,
          InventoryBeingAddedOrEdited
        )
        .then(() => {
          dispatch(updateExistingInventoryResponse());
        })
        .catch(error => {
          dispatch(ApiCallErrorAction());
          throw error;
        });
    } else {
      return fetchClient
        .post("Inventories", InventoryBeingAddedOrEdited)
        .then(() => {
          dispatch(addNewInventoryResponse());
        })
        .catch(error => {
          dispatch(ApiCallErrorAction());
          throw error;
        });
    }
  };
}

export const getInventoryResponse = InventoryFound => ({
  type: ActionType.GET_INVENTORY_RESPONSE,
  Inventory: InventoryFound
});

export function getInventoryAction(InventoryId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .get("Inventories/" + InventoryId)
      .then(response => {
        dispatch(getInventoryResponse(response.data.result));
      })
      .catch(error => {
        throw error;
      });
  };
}

export const deleteInventoryResponse = () => ({
  type: ActionType.DELETE_INVENTORY_RESPONSE
});

export function deleteInventoryAction(InventoryId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .delete("Inventories/" + InventoryId)
      .then(() => {
        dispatch(deleteInventoryResponse());
      })
      .then(() => {
        dispatch(getInventoriesAction());
      })
      .catch(error => {
        throw error;
      });
  };
}
