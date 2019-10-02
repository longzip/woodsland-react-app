import * as ActionType from "../action/ActionType";
import initialState from "./initialState";
import _ from "lodash";

const selectedInventoryReducer = (
  state = initialState.selectedInventoryReducer,
  action
) => {
  switch (action.type) {
    case ActionType.GET_INVENTORY_RESPONSE: {
      return {
        ...state,
        inventory: _.assign(action.inventory)
      };
    }

    default: {
      return state;
    }
  }
};

export default selectedInventoryReducer;
