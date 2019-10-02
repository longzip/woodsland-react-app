import * as ActionType from "../action/ActionType";
import initialState from "./initialState";
import _ from "lodash";

const selectedWorkcenterReducer = (
  state = initialState.selectedWorkcenterReducer,
  action
) => {
  switch (action.type) {
    case ActionType.GET_WORKCENTER_RESPONSE: {
      return {
        ...state,
        workcenter: _.assign(action.workcenter)
      };
    }

    default: {
      return state;
    }
  }
};

export default selectedWorkcenterReducer;
