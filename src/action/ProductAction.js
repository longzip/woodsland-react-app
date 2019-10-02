import * as ActionType from "./ActionType";

import fetchClient from "../api/fetchClient";
import { ApiCallBeginAction, ApiCallErrorAction } from "./ApiAction";

export const getProductsResponse = payload => ({
  type: ActionType.GET_PRODUCTS_RESPONSE,
  payload
});

export function getProductsAction() {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .get("products")
      .then(response => {
        dispatch(getProductsResponse(response.data.result));
      })
      .catch(error => {
        throw error;
      });
  };
}

export const addNewProductResponse = () => ({
  type: ActionType.ADD_NEW_PRODUCT_RESPONSE
});

export const updateExistingProductResponse = () => ({
  type: ActionType.UPDATE_EXISTING_PRODUCT_RESPONSE
});

export function saveProductAction(productBeingAddedOrEdited) {
  return function(dispatch) {
    dispatch(ApiCallBeginAction());
    if (productBeingAddedOrEdited.id) {
      return fetchClient
        .put(
          "products/" + productBeingAddedOrEdited.id,
          productBeingAddedOrEdited
        )
        .then(() => {
          dispatch(updateExistingProductResponse());
        })
        .catch(error => {
          dispatch(ApiCallErrorAction());
          throw error;
        });
    } else {
      return fetchClient
        .post("products", productBeingAddedOrEdited)
        .then(() => {
          dispatch(addNewProductResponse());
        })
        .catch(error => {
          dispatch(ApiCallErrorAction());
          throw error;
        });
    }
  };
}

export const getProductResponse = productFound => ({
  type: ActionType.GET_PRODUCT_RESPONSE,
  product: productFound
});

export function getProductAction(productId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .get("products/" + productId)
      .then(response => {
        dispatch(getProductResponse(response.data.result));
      })
      .catch(error => {
        throw error;
      });
  };
}

export const deleteProductResponse = () => ({
  type: ActionType.DELETE_PRODUCT_RESPONSE
});

export function deleteProductAction(courseId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .delete("products/" + courseId)
      .then(() => {
        dispatch(deleteProductResponse());
      })
      .then(() => {
        dispatch(getProductsAction());
      })
      .catch(error => {
        throw error;
      });
  };
}
