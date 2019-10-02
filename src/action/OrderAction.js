import * as ActionType from "./ActionType";

import fetchClient from "../api/fetchClient";
import { ApiCallBeginAction, ApiCallErrorAction } from "./ApiAction";

export const getOrdersResponse = orders => ({
  type: ActionType.GET_ORDERS_RESPONSE,
  orders
});

export function getOrdersAction() {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .get("Orders")
      .then(response => {
        dispatch(getOrdersResponse(response.data.result));
      })
      .catch(error => {
        throw error;
      });
  };
}

export const addNewOrderResponse = () => ({
  type: ActionType.ADD_NEW_ORDER_RESPONSE
});

export const updateExistingOrderResponse = () => ({
  type: ActionType.UPDATE_EXISTING_ORDER_RESPONSE
});

export function saveOrderAction(OrderBeingAddedOrEdited) {
  return function(dispatch) {
    dispatch(ApiCallBeginAction());
    if (OrderBeingAddedOrEdited.id) {
      return fetchClient
        .put("Orders/" + OrderBeingAddedOrEdited.id, OrderBeingAddedOrEdited)
        .then(() => {
          dispatch(updateExistingOrderResponse());
        })
        .catch(error => {
          dispatch(ApiCallErrorAction());
          throw error;
        });
    } else {
      return fetchClient
        .post("Orders", OrderBeingAddedOrEdited)
        .then(() => {
          dispatch(addNewOrderResponse());
        })
        .catch(error => {
          dispatch(ApiCallErrorAction());
          throw error;
        });
    }
  };
}

export const getOrderResponse = OrderFound => ({
  type: ActionType.GET_ORDER_RESPONSE,
  order: OrderFound
});

export function getOrderAction(OrderId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .get("Orders/" + OrderId)
      .then(response => {
        dispatch(getOrderResponse(response.data.result));
      })
      .catch(error => {
        throw error;
      });
  };
}

export const deleteOrderResponse = () => ({
  type: ActionType.DELETE_ORDER_RESPONSE
});

export function deleteOrderAction(OrderId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .delete("Orders/" + OrderId)
      .then(() => {
        dispatch(deleteOrderResponse());
      })
      .then(() => {
        dispatch(getOrdersAction());
      })
      .catch(error => {
        throw error;
      });
  };
}
