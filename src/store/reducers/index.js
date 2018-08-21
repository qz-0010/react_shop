import { combineReducers } from 'redux';
import {
  OPEN_POPUP, CLOSE_POPUP, AUTHORIZE, LOGOUT, INIT, ADMIN_ADD_GOOD, GET_GOODS
} from '../actions/types';

const popupReducer = (state = { active: false, Component: null }, action) => {
  const { active, Component, componentProps } = action;

  switch (action.type) {
    case OPEN_POPUP:
      return {
        ...state,
        active,
        Component,
        componentProps
      };
    case CLOSE_POPUP:
      return {
        ...state,
        active
      };
    default:
      return state;
  }
};

const authReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case AUTHORIZE:
    case LOGOUT:
      return {
        ...state,
        user: action.user
      };
    default:
      return state;
  }
};

const goodsReducer = (state = {goods: []}, action) => {
  switch (action.type) {
    case ADMIN_ADD_GOOD:
      return {
        ...state,
        goods: [...state.goods, action.good]
      };
    case GET_GOODS:
      return {
        ...state,
        goods: action.goods
      };
    default:
      return state;
  }
};

export default combineReducers({
  popup: popupReducer,
  auth: authReducer,
  goods: goodsReducer
});
