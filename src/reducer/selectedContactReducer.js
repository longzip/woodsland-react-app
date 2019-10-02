import * as ActionType from "../action/ActionType";
import initialState from "./initialState";
import _ from "lodash";

const selectedContactReducer = (
  state = initialState.selectedContactReducer,
  action
) => {
  switch (action.type) {
    case ActionType.GET_CONTACT_RESPONSE: {
      return {
        ...state,
        contact: _.assign(action.contact)
      };
    }

    default: {
      return state;
    }
  }
};

export default selectedContactReducer;
