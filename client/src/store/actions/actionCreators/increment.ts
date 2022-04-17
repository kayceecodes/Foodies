import { ActionTypes } from "../actionTypes";

export interface IncrementAction {
  type: string;
  payload: {
    value: number;
  };
}

export function increment(value: number) {
  const action: IncrementAction = {
      type: ActionTypes.INCREMENT,
      payload: {
        value: value
      }  
  }

  return action
}