import * as ActionType from "../action/ActionType";
import initialState from "./initialState";
import _ from "lodash";

const selectedRoutingWorkcenterReducer = (
  state = initialState.selectedRoutingWorkcenterReducer,
  action
) => {
  switch (action.type) {
    case ActionType.GET_ROUTINGWORKCENTER_RESPONSE: {
      return {
        ...state,
        routingWorkcenter: _.assign(action.routingWorkcenter)
      };
    }

    default: {
      return state;
    }
  }
};

export default selectedRoutingWorkcenterReducer;
