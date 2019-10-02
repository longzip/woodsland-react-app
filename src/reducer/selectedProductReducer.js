import * as ActionType from "../action/ActionType";
import initialState from "./initialState";
import _ from "lodash";

const selectedProductReducer = (
  state = initialState.selectedProductReducer,
  action
) => {
  switch (action.type) {
    case ActionType.GET_PRODUCT_RESPONSE: {
      return {
        ...state,
        product: _.assign(action.product)
      };
    }

    default: {
      return state;
    }
  }
};

export default selectedProductReducer;
