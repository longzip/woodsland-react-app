import * as ActionType from "../action/ActionType";
import initialState from "./initialState";
import _ from "lodash";

const loginedUserReducer = (
  state = initialState.loginedUserReducer,
  action
) => {
  switch (action.type) {
    case ActionType.LOGIN_USER_RESPONSE: {
      return {
        ...state,
        userAuth: _.assign(action.user)
      };
    }

    case ActionType.LOGOUT_USER_RESPONSE: {
      return Object.assign({}, state, {
        userAuth: undefined
      });
    }

    default: {
      return state;
    }
  }
};

export default loginedUserReducer;
