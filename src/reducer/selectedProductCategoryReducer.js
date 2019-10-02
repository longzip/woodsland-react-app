import * as ActionType from "../action/ActionType";
import initialState from "./initialState";
import _ from "lodash";

const selectedProductCategoryReducer = (
  state = initialState.selectedProductCategoryReducer,
  action
) => {
  switch (action.type) {
    case ActionType.GET_PRODUCTCATEGORY_RESPONSE: {
      return {
        ...state,
        productCategory: _.assign(action.productCategory)
      };
    }

    default: {
      return state;
    }
  }
};

export default selectedProductCategoryReducer;
