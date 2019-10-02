import * as ActionType from "../action/ActionType";
import initialState from "./initialState";
import _ from "lodash";

const usersReducer = (state = initialState.usersReducer, action) => {
  switch (action.type) {
    case ActionType.GET_USERS_RESPONSE: {
      // '...' spread operator clones the state
      // lodash Object assign simply clones action.courses into a new array.
      // The return object is a copy of state and overwrites the state.courses with a fresh clone of action.courses
      return {
        ...state,
        users: _.assign(action.users)
      };
    }

    default: {
      return state;
    }
  }
};

export default usersReducer;
