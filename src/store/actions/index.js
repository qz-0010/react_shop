import axios from 'axios';
import qs from 'qs';
import {
  OPEN_POPUP, CLOSE_POPUP, AUTHORIZE, LOGOUT, GET_GOODS, GET_BUCKET, ADMIN_ADD_GOOD, REGISTER
} from './types';

export const openPopup = (Component, componentProps) => (dispatch) => {
  dispatch({
    type: OPEN_POPUP,
    active: true,
    Component,
    componentProps
  });
};

export const closePopup = () => (dispatch) => {
  dispatch({
    type: CLOSE_POPUP,
    active: false,
    Component: null
  });
};

export const register = props => async (dispatch) => {
  const data = props ? qs.stringify(props) : '';
  const request = axios.post('/register', data);

  request.then(
    (res) => {
      dispatch({
        type: REGISTER,
        user: res.data.user
      });
    },
    err => console.error(err)
  );
  return request;
};

export const authorize = props => async (dispatch) => {
  const data = props ? qs.stringify(props) : '';
  const request = axios.post('/login', data);

  request.then(
    (res) => {
      dispatch({
        type: AUTHORIZE,
        user: res.data.user
      });
    },
    err => console.error(err)
  );
  return request;
};

export const logout = () => async (dispatch) => {
  await axios.get('/logout');

  dispatch({
    type: LOGOUT,
    user: null
  });
};

export const getGoods = (page = '1') => async (dispatch) => {
  const res = await axios.get(`/catalog/${page}`);

  dispatch({
    type: GET_GOODS,
    goods: res.data.goods
  });
};

const initOrder = () => {
  let order = localStorage.get('order');

  if (order) {
    order = JSON.parse(order);
  } else {
    order = {};
  }

  return order;
};

const setOrder = (order) => {
  localStorage.set('order', JSON.stringify(order));
};

export const addToBasket = (id, count) => async (dispatch) => {
  const order = initOrder();
  order[id] = count;

  setOrder(order);
};

export const getOrder = () => localStorage.get('order');

export const adminAddGood = (data, opt) => async (dispatch) => {
  const res = await axios.post(`/admin/good`, data);

  dispatch({
    type: ADMIN_ADD_GOOD,
    good: res.data.good
  });
};
