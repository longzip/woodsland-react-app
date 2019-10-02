import * as ActionType from "../action/ActionType";
import initialState from "./initialState";
import _ from "lodash";

const selectedDeliverReducer = (
  state = initialState.selectedDeliverReducer,
  action
) => {
  switch (action.type) {
    case ActionType.GET_DELIVER_RESPONSE: {
      return {
        ...state,
        deliver: _.assign(action.deliver)
      };
    }

    default: {
      return state;
    }
  }
};

export default selectedDeliverReducer;
