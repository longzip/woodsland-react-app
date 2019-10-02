import * as ActionType from "../action/ActionType";
import initialState from "./initialState";
import _ from "lodash";

const productsReducer = (state = initialState.productsReducer, action) => {
  switch (action.type) {
    case ActionType.GET_PRODUCTS_RESPONSE: {
      // '...' spread operator clones the state
      // lodash Object assign simply clones action.courses into a new array.
      // The return object is a copy of state and overwrites the state.courses with a fresh clone of action.courses
      return {
        ...state,
        products: _.assign(action.payload)
      };
    }

    default: {
      return state;
    }
  }
};

export default productsReducer;
