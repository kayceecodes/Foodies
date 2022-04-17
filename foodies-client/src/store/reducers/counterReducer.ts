import { ActionTypes } from '../actions/actionTypes'
import {
  IncrementAction,
} from '../actions/actionCreators/increment'
import { AnyAction } from 'redux'

export const initialState: {counter: number} = {
  counter: 0,
}

export default function incrementReducer(
  state = initialState,
  action: AnyAction
) {
  switch (action.type) {
    case ActionTypes.INCREMENT:
      return {
        ...state,
        counter: action.payload.value + state.counter,
      }
    default:
      return state
  }
}
