import * as ActionType from "./ActionType";
import fetchClient from "../api/fetchClient";
import { ApiCallBeginAction, ApiCallErrorAction } from "./ApiAction";
import fileClient from "../api/fileClient";

export const getDocumentsResponse = documents => ({
  type: ActionType.GET_DOCUMENTS_RESPONSE,
  documents
});

export function getDocumentsAction(contactId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .get("documents?contactId=" + contactId)
      .then(response => {
        dispatch(getDocumentsResponse(response.data.result));
      })
      .catch(error => {
        throw error;
      });
  };
}

export const addNewDocumentResponse = () => ({
  type: ActionType.ADD_NEW_DOCUMENT_RESPONSE
});

export const updateExistingDocumentResponse = () => ({
  type: ActionType.UPDATE_EXISTING_DOCUMENT_RESPONSE
});

export function saveDocumentAction(documentBeingAddedOrEdited) {
  return dispatch => {
    dispatch(ApiCallBeginAction());
    if (documentBeingAddedOrEdited.get("id")) {
      return fileClient
        .put(
          "documents/" + documentBeingAddedOrEdited.id,
          documentBeingAddedOrEdited
        )
        .then(() => {
          dispatch(updateExistingDocumentResponse());
        })
        .catch(error => {
          dispatch(ApiCallErrorAction());
          throw error;
        });
    } else {
      return fileClient
        .post("documents", documentBeingAddedOrEdited)
        .then(() => {
          dispatch(addNewDocumentResponse());
        })
        .catch(error => {
          dispatch(ApiCallErrorAction());
          throw error;
        });
    }
  };
}

export const getDocumentResponse = documentFound => ({
  type: ActionType.GET_DOCUMENT_RESPONSE,
  document: documentFound
});

export function getDocumentAction(documentId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .get("documents/" + documentId)
      .then(response => {
        dispatch(getDocumentResponse(response.data.result));
      })
      .catch(error => {
        dispatch(ApiCallErrorAction());
        throw error;
      });
  };
}

export const deleteDocumentResponse = () => ({
  type: ActionType.DELETE_DOCUMENT_RESPONSE
});

export function deleteDocumentAction(documentId) {
  return dispatch => {
    dispatch(ApiCallBeginAction());
    return fetchClient
      .delete("documents/" + documentId)
      .then(() => {
        dispatch(deleteDocumentResponse());
      })
      .catch(error => {
        dispatch(ApiCallErrorAction());
        throw error;
      });
  };
}
