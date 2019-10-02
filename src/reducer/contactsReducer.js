import * as ActionType from "../action/ActionType";
import initialState from "./initialState";
import _ from "lodash";

const contactsReducer = (state = initialState.contactsReducer, action) => {
  switch (action.type) {
    case ActionType.GET_CONTACTS_RESPONSE: {
      return {
        ...state,
        contacts: _.assign(action.contacts)
      };
    }

    default: {
      return state;
    }
  }
};

export default contactsReducer;
