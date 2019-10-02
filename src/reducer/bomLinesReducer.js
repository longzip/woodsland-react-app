import * as ActionType from "../action/ActionType";
import initialState from "./initialState";
import _ from "lodash";

const bomLinesReducer = (state = initialState.bomLinesReducer, action) => {
  switch (action.type) {
    case ActionType.GET_BOMLINES_RESPONSE: {
      return {
        ...state,
        bomLines: _.assign(action.bomLines)
      };
    }

    default: {
      return state;
    }
  }
};

export default bomLinesReducer;
