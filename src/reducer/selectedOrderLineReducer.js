import * as ActionType from "../action/ActionType";
import initialState from "./initialState";
import _ from "lodash";

const selectedOrderLineReducer = (
  state = initialState.selectedOrderLineReducer,
  action
) => {
  switch (action.type) {
    case ActionType.GET_ORDERLINE_RESPONSE: {
      return {
        ...state,
        orderLine: _.assign(action.orderLine)
      };
    }

    default: {
      return state;
    }
  }
};

export default selectedOrderLineReducer;
