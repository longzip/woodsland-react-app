import * as ActionType from "../action/ActionType";
import initialState from "./initialState";
import _ from "lodash";

const orderLinesReducer = (state = initialState.orderLinesReducer, action) => {
  switch (action.type) {
    case ActionType.GET_ORDERLINES_RESPONSE: {
      // '...' spread operator clones the state
      // lodash Object assign simply clones action.courses into a new array.
      // The return object is a copy of state and overwrites the state.courses with a fresh clone of action.courses
      return {
        ...state,
        orderLines: _.assign(action.orderLines)
      };
    }

    default: {
      return state;
    }
  }
};

export default orderLinesReducer;
