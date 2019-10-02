import * as ActionType from "../action/ActionType";
import initialState from "./initialState";
import _ from "lodash";

const selectedOrderReducer = (
  state = initialState.selectedOrderReducer,
  action
) => {
  switch (action.type) {
    case ActionType.GET_ORDER_RESPONSE: {
      return {
        ...state,
        order: _.assign(action.order)
      };
    }

    default: {
      return state;
    }
  }
};

export default selectedOrderReducer;
