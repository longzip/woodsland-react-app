import * as ActionType from "../action/ActionType";
import initialState from "./initialState";
import _ from "lodash";

const documentsReducer = (state = initialState.documentsReducer, action) => {
  switch (action.type) {
    case ActionType.GET_DOCUMENTS_RESPONSE: {
      return {
        ...state,
        documents: _.assign(action.documents)
      };
    }

    default: {
      return state;
    }
  }
};

export default documentsReducer;
