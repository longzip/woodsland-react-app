import * as ActionType from "../action/ActionType";
import initialState from "./initialState";
import _ from "lodash";

const selectedUomReducer = (
  state = initialState.selectedUomReducer,
  action
) => {
  switch (action.type) {
    case ActionType.GET_UOM_RESPONSE: {
      return {
        ...state,
        uom: _.assign(action.uom)
      };
    }

    default: {
      return state;
    }
  }
};

export default selectedUomReducer;
