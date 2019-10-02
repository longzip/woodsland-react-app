import * as ActionType from "../action/ActionType";
import initialState from "./initialState";
import _ from "lodash";

const selectedWorkorderReducer = (
  state = initialState.selectedWorkorderReducer,
  action
) => {
  switch (action.type) {
    case ActionType.GET_WORKORDER_RESPONSE: {
      return {
        ...state,
        workorder: _.assign(action.workorder)
      };
    }

    default: {
      return state;
    }
  }
};

export default selectedWorkorderReducer;
