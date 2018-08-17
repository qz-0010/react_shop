import { combineReducers } from 'redux';
import { OPEN_POPUP, CLOSE_POPUP, AUTHORIZE, LOGOUT, INIT } from '../actions/types';

const popupReducer = (state={active: false, Component: null}, action) => {
  const { active, Component, props } = action;

  switch(action.type) {
    case OPEN_POPUP:
      return {
        ...state,
        active,
        Component,
        props
      }
    case CLOSE_POPUP:
      return {
        ...state,
        active
      }
    default:
      return state
  }
}

const authReducer = (state={user: null}, action) => {
  switch(action.type) {
    case AUTHORIZE:
      return {
        ...state,
        user: action.user
      }
    case LOGOUT:
      return {
        ...state,
        user: action.user
      }
    default:
      return state
  }
}

const initReducer = (state={}, action) => {
  switch(action.type) {
    case INIT:
      return {
        ...state,
        init: true
      }
    default:
      return state
  }
}

export const reducers = combineReducers({
  popup: popupReducer,
  auth: authReducer,
  init: initReducer
});