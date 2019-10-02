import * as ActionType from "../action/ActionType";
import initialState from "./initialState";
import _ from "lodash";

const selectedWorkcenterProductivityReducer = (
  state = initialState.selectedWorkcenterProductivityReducer,
  action
) => {
  switch (action.type) {
    case ActionType.GET_WORKCENTERPRODUCTIVITY_RESPONSE: {
      return {
        ...state,
        workcenterProductivity: _.assign(action.workcenterProductivity)
      };
    }

    default: {
      return state;
    }
  }
};

export default selectedWorkcenterProductivityReducer;
