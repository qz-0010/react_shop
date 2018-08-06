import { INIT } from '../actions/types';

export const initReducer = (state={text: 'Hello redux'}, action) => {
  switch(action.type) {
    case INIT:
      return {
        ...state,
        text: action.text
      }
    default:
      return state
  }
}