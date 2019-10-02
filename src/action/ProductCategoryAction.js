import * as ActionType from "./ActionType";

import fetchClient from "../api/fetchClient";
import { ApiCallBeginAction, ApiCallErrorAction } from "./ApiAction";

export const getProductCategoriesResponse = ProductCategories => ({
  type: ActionType.GET_PRODUCTCATEGORIES_RESPONSE,
  ProductCategories
});

export function getProductCategoriesAction() {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .get("ProductCategories")
      .then(response => {
        dispatch(getProductCategoriesResponse(response.data.result));
      })
      .catch(error => {
        throw error;
      });
  };
}

export const addNewProductCategoryResponse = () => ({
  type: ActionType.ADD_NEW_PRODUCTCATEGORY_RESPONSE
});

export const updateExistingProductCategoryResponse = () => ({
  type: ActionType.UPDATE_EXISTING_PRODUCTCATEGORY_RESPONSE
});

export function saveProductCategoryAction(ProductCategoryBeingAddedOrEdited) {
  return function(dispatch) {
    dispatch(ApiCallBeginAction());
    if (ProductCategoryBeingAddedOrEdited.id) {
      return fetchClient
        .put(
          "ProductCategories/" + ProductCategoryBeingAddedOrEdited.id,
          ProductCategoryBeingAddedOrEdited
        )
        .then(() => {
          dispatch(updateExistingProductCategoryResponse());
        })
        .catch(error => {
          dispatch(ApiCallErrorAction());
          throw error;
        });
    } else {
      return fetchClient
        .post("ProductCategories", ProductCategoryBeingAddedOrEdited)
        .then(() => {
          dispatch(addNewProductCategoryResponse());
        })
        .catch(error => {
          dispatch(ApiCallErrorAction());
          throw error;
        });
    }
  };
}

export const getProductCategoryResponse = ProductCategoryFound => ({
  type: ActionType.GET_PRODUCTCATEGORY_RESPONSE,
  ProductCategory: ProductCategoryFound
});

export function getProductCategoryAction(ProductCategoryId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .get("ProductCategories/" + ProductCategoryId)
      .then(response => {
        dispatch(getProductCategoryResponse(response.data.result));
      })
      .catch(error => {
        throw error;
      });
  };
}

export const deleteProductCategoryResponse = () => ({
  type: ActionType.DELETE_PRODUCTCATEGORY_RESPONSE
});

export function deleteProductCategoryAction(ProductCategoryId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .delete("ProductCategories/" + ProductCategoryId)
      .then(() => {
        dispatch(deleteProductCategoryResponse());
      })
      .then(() => {
        dispatch(getProductCategoriesAction());
      })
      .catch(error => {
        throw error;
      });
  };
}
