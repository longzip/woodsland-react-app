import * as ActionType from "./ActionType";

import fetchClient from "../api/fetchClient";
import { ApiCallBeginAction, ApiCallErrorAction } from "./ApiAction";

export const getProductionsResponse = productions => ({
  type: ActionType.GET_PRODUCTIONS_RESPONSE,
  productions
});

export function getProductionsAction() {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .get("Productions")
      .then(response => {
        dispatch(getProductionsResponse(response.data.result));
      })
      .catch(error => {
        throw error;
      });
  };
}

export const addNewProductionResponse = () => ({
  type: ActionType.ADD_NEW_PRODUCTION_RESPONSE
});

export const updateExistingProductionResponse = () => ({
  type: ActionType.UPDATE_EXISTING_PRODUCTION_RESPONSE
});

export function saveProductionAction(productionBeingAddedOrEdited) {
  return function(dispatch) {
    dispatch(ApiCallBeginAction());
    if (productionBeingAddedOrEdited.id) {
      return fetchClient
        .put(
          "Productions/" + productionBeingAddedOrEdited.id,
          productionBeingAddedOrEdited
        )
        .then(() => {
          dispatch(updateExistingProductionResponse());
        })
        .catch(error => {
          dispatch(ApiCallErrorAction());
          throw error;
        });
    } else {
      return fetchClient
        .post("Productions", productionBeingAddedOrEdited)
        .then(() => {
          dispatch(addNewProductionResponse());
        })
        .catch(error => {
          dispatch(ApiCallErrorAction());
          throw error;
        });
    }
  };
}

export const getProductionResponse = ProductionFound => ({
  type: ActionType.GET_PRODUCTION_RESPONSE,
  production: ProductionFound
});

export function getProductionAction(ProductionId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .get("Productions/" + ProductionId)
      .then(response => {
        dispatch(getProductionResponse(response.data.result));
      })
      .catch(error => {
        throw error;
      });
  };
}

export const deleteProductionResponse = () => ({
  type: ActionType.DELETE_PRODUCTION_RESPONSE
});

export function deleteProductionAction(ProductionId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .delete("Productions/" + ProductionId)
      .then(() => {
        dispatch(deleteProductionResponse());
      })
      .then(() => {
        dispatch(getProductionsAction());
      })
      .catch(error => {
        throw error;
      });
  };
}
