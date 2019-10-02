import * as ActionType from "../action/ActionType";
import initialState from "./initialState";
import _ from "lodash";

const bomsReducer = (state = initialState.bomsReducer, action) => {
  switch (action.type) {
    case ActionType.GET_BOMS_RESPONSE: {
      return {
        ...state,
        boms: _.assign(action.boms)
      };
    }

    default: {
      return state;
    }
  }
};

export default bomsReducer;
