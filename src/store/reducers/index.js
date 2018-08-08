import { combineReducers } from 'redux';
import { GET_CONTACTS, OPEN_POPUP, CLOSE_POPUP } from '../actions/types';
import { initReducer } from './init';

const contactReducer = (state={}, action) => {
  switch(action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.contacts
      }
    default:
      return state
  }
}

const popupReducer = (state={active: false, Component: null}, action) => {
  const { active, Component, props } = action;

  switch(action.type) {
    case OPEN_POPUP:
      console.log('popupReducer', {...state, active, Component, props})
      return {
        ...state,
        active,
        Component,
        props: props
      }
    case CLOSE_POPUP:
      return {
        ...state,
        active,
        Component,
        props: props
      }
    default:
      return state
  }
}

export const reducers = combineReducers({
  hello: initReducer, 
  contact: contactReducer,
  popup: popupReducer
});