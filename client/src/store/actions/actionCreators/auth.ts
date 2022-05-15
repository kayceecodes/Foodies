import { ActionTypes } from "../actionTypes";

export interface LoginAction {
  type: string;
  payload: LoginState;
}
export interface LoginState {
  username: string,
  password: string
}
export function login(value: LoginState) {
  const action: LoginAction = {
      type: ActionTypes.LOGIN,
      payload: {
        username: value.username,
        password: value.password
      }  
  }
  return action
}
