import * as ActionType from "../action/ActionType";
import initialState from "./initialState";
import _ from "lodash";

const selectedRoutingReducer = (
  state = initialState.selectedRoutingReducer,
  action
) => {
  switch (action.type) {
    case ActionType.GET_ROUTING_RESPONSE: {
      return {
        ...state,
        routing: _.assign(action.routing)
      };
    }

    default: {
      return state;
    }
  }
};

export default selectedRoutingReducer;
