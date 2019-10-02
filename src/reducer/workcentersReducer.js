import * as ActionType from "../action/ActionType";
import initialState from "./initialState";
import _ from "lodash";

const workcentersReducer = (state = initialState.workcentersReducer, action) => {
  switch (action.type) {
    case ActionType.GET_WORKCENTERS_RESPONSE: {
      return {
        ...state,
        workcenters: _.assign(action.workcenters)
      };
    }

    default: {
      return state;
    }
  }
};

export default workcentersReducer;
