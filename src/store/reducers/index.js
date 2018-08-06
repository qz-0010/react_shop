import { combineReducers } from 'redux';
import { GET_CONTACTS } from '../actions/types';
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

export const reducers = combineReducers({
  hello: initReducer, 
  contact: contactReducer
});