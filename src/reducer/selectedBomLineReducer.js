import * as ActionType from "../action/ActionType";
import initialState from "./initialState";
import _ from "lodash";

const selectedBomLineReducer = (
  state = initialState.selectedBomLineReducer,
  action
) => {
  switch (action.type) {
    case ActionType.GET_BOMLINE_RESPONSE: {
      return {
        ...state,
        bomLine: _.assign(action.bomLine)
      };
    }

    default: {
      return state;
    }
  }
};

export default selectedBomLineReducer;
