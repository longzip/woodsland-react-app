import * as ActionType from "./ActionType";

import fetchClient from "../api/fetchClient";
import { ApiCallBeginAction } from "./ApiAction";

export const loginUsersResponse = user => ({
  type: ActionType.LOGIN_USER_RESPONSE,
  user
});

export function loginUserAction(user) {
  return dispatch => {
    dispatch(ApiCallBeginAction());
    return fetchClient
      .post("login", user)
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data.result));
          localStorage.setItem("token", response.data.token);
          dispatch(loginUsersResponse(response.data.result));
        } else {
          dispatch(ApiCallErrorAction());
          throw new Error("Khong xac dinh duoc token!");
        }
      })
      .catch(error => {
        dispatch(ApiCallErrorAction());
        throw error;
      });
  };
}
export const logoutUserResponse = () => ({
  type: ActionType.LOGOUT_USER_RESPONSE
});

export function logoutUserAction() {
  return dispatch => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(logoutUserResponse());
  };
}
