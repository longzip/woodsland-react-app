import * as ActionType from "./ActionType";
import fetchClient from "../api/fetchClient";
import { ApiCallBeginAction, ApiCallErrorAction } from "./ApiAction";

export const getContactsResponse = contacts => ({
  type: ActionType.GET_CONTACTS_RESPONSE,
  contacts
});

export function getContactsAction() {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .get("Contacts")
      .then(response => {
        dispatch(getContactsResponse(response.data.result));
      })
      .catch(error => {
        throw error;
      });
  };
}

export const addNewContactResponse = () => ({
  type: ActionType.ADD_NEW_CONTACT_RESPONSE
});

export const updateExistingContactResponse = () => ({
  type: ActionType.UPDATE_EXISTING_CONTACT_RESPONSE
});

export function saveContactAction(contactBeingAddedOrEdited) {
  return function(dispatch) {
    dispatch(ApiCallBeginAction());
    if (contactBeingAddedOrEdited.id) {
      return fetchClient
        .put(
          "contacts/" + contactBeingAddedOrEdited.id,
          contactBeingAddedOrEdited
        )
        .then(() => {
          dispatch(updateExistingContactResponse());
        })
        .catch(error => {
          dispatch(ApiCallErrorAction());
          throw error;
        });
    } else {
      return fetchClient
        .post("contacts", contactBeingAddedOrEdited)
        .then(() => {
          dispatch(addNewContactResponse());
        })
        .catch(error => {
          dispatch(ApiCallErrorAction());
          throw error;
        });
    }
  };
}

export const getContactResponse = contactFound => ({
  type: ActionType.GET_CONTACT_RESPONSE,
  contact: contactFound
});

export function getContactAction(contactId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());
    return fetchClient
      .get("contacts/" + contactId)
      .then(response => {
        dispatch(getContactResponse(response.data.result));
      })
      .catch(error => {
        throw error;
      });
  };
}

export const deleteContactResponse = () => ({
  type: ActionType.DELETE_CONTACT_RESPONSE
});

export function deleteContactAction(contactId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());
    return fetchClient
      .delete("contacts/" + contactId)
      .then(() => {
        dispatch(deleteContactResponse());
      })
      .then(() => {
        dispatch(getContactsAction());
      })
      .catch(error => {
        throw error;
      });
  };
}
