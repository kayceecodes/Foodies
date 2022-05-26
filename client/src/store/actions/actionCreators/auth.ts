import { Dispatch } from "redux";
import { ActionTypes } from "../actionTypes";

const url = "https://localhost:7292/api/Authenticate/login?";

export interface LoginAction {
  type: string;
  payload: LoginState;
}
export interface LoginState {
  username: string;
  password: string;
}
export function setLogin(payload: LoginState) {
  const action: LoginAction = {
    type: ActionTypes.LOGIN,
    payload: {
      username: payload.username,
      password: payload.password,
    },
  };
  return action;
}

export const login = (data: LoginState) => (dispatch: Dispatch) => {
  dispatch(setLogin(data));
  
  return fetch(url, {
    method: "post",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => console.log("Data in auth/login: ", data))
    .catch((error) => console.log(error));
};
