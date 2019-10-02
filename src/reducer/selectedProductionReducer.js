import * as ActionType from "../action/ActionType";
import initialState from "./initialState";
import _ from "lodash";

const selectedProductionReducer = (
  state = initialState.selectedProductionReducer,
  action
) => {
  switch (action.type) {
    case ActionType.GET_PRODUCTION_RESPONSE: {
      return {
        ...state,
        production: _.assign(action.production)
      };
    }

    default: {
      return state;
    }
  }
};

export default selectedProductionReducer;
