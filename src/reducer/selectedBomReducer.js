import * as ActionType from "../action/ActionType";
import initialState from "./initialState";
import _ from "lodash";

const selectedBomReducer = (
  state = initialState.selectedBomReducer,
  action
) => {
  switch (action.type) {
    case ActionType.GET_BOM_RESPONSE: {
      return {
        ...state,
        bom: _.assign(action.bom)
      };
    }

    default: {
      return state;
    }
  }
};

export default selectedBomReducer;
