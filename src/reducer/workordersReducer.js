import * as ActionType from "../action/ActionType";
import initialState from "./initialState";
import _ from "lodash";

const workordersReducer = (state = initialState.workordersReducer, action) => {
  switch (action.type) {
    case ActionType.GET_WORKORDERS_RESPONSE: {
      // '...' spread operator clones the state
      // lodash Object assign simply clones action.courses into a new array.
      // The return object is a copy of state and overwrites the state.courses with a fresh clone of action.courses
      return {
        ...state,
        workorders: _.assign(action.workorders)
      };
    }

    default: {
      return state;
    }
  }
};

export default workordersReducer;
