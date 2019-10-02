import * as ActionType from "../action/ActionType";
import initialState from "./initialState";
import _ from "lodash";

const deliversReducer = (state = initialState.deliversReducer, action) => {
  switch (action.type) {
    case ActionType.GET_DELIVERS_RESPONSE: {
      return {
        ...state,
        delivers: _.assign(action.delivers)
      };
    }

    default: {
      return state;
    }
  }
};

export default deliversReducer;
