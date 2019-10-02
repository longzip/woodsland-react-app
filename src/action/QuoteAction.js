import * as ActionType from "./ActionType";

import fetchClient from "../api/fetchClient";
import { ApiCallBeginAction, ApiCallErrorAction } from "./ApiAction";

export const getQuotesResponse = quotes => ({
  type: ActionType.GET_QUOTES_RESPONSE,
  quotes
});

export function getQuotesAction(contactId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());
    let url = "orders";
    if (contactId) url = "orders?contactId=" + contactId;
    return fetchClient
      .get(url)
      .then(response => {
        dispatch(getQuotesResponse(response.data.result));
      })
      .catch(error => {
        throw error;
      });
  };
}

export const addNewQuoteResponse = () => ({
  type: ActionType.ADD_NEW_QUOTE_RESPONSE
});

export const updateExistingQuoteResponse = () => ({
  type: ActionType.UPDATE_EXISTING_QUOTE_RESPONSE
});

export function saveQuoteAction(quoteBeingAddedOrEdited) {
  return function(dispatch) {
    dispatch(ApiCallBeginAction());
    if (quoteBeingAddedOrEdited.id) {
      return fetchClient
        .put("orders/" + quoteBeingAddedOrEdited.id, quoteBeingAddedOrEdited)
        .then(() => {
          dispatch(updateExistingQuoteResponse());
        })
        .catch(error => {
          dispatch(ApiCallErrorAction());
          throw error;
        });
    } else {
      return fetchClient
        .post("orders", quoteBeingAddedOrEdited)
        .then(() => {
          dispatch(addNewQuoteResponse());
        })
        .catch(error => {
          dispatch(ApiCallErrorAction());
          throw error;
        });
    }
  };
}

export const getQuoteResponse = quoteFound => ({
  type: ActionType.GET_QUOTE_RESPONSE,
  quote: quoteFound
});

export function getQuoteAction(quoteId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .get("orders/" + quoteId)
      .then(response => {
        dispatch(getQuoteResponse(response.data.result));
      })
      .catch(error => {
        throw error;
      });
  };
}

export const deleteQuoteResponse = () => ({
  type: ActionType.DELETE_QUOTE_RESPONSE
});

export function deleteQuoteAction(quoteId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .delete("orders/" + quoteId)
      .then(() => {
        dispatch(deleteQuoteResponse());
      })
      .then(() => {
        dispatch(getQuotesAction());
      })
      .catch(error => {
        throw error;
      });
  };
}
