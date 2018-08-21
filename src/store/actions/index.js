import axios from 'axios';
import qs from 'qs';
import {
  OPEN_POPUP, CLOSE_POPUP, AUTHORIZE, LOGOUT, INIT, GET_GOODS, GET_BUCKET, ADMIN_ADD_GOOD
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

export const authorize = props => async (dispatch) => {
  const data = props ? qs.stringify(props) : '';

  return axios.post('/login', data).then(
    (res) => {
      dispatch({
        type: AUTHORIZE,
        user: res.data
      });
    },
    err => console.error(err)
  );
};

export const logout = () => async (dispatch) => {
  await axios.get('/logout');

  dispatch({
    type: LOGOUT,
    user: null
  });
};

export const getGoods = (type = 'all') => async (dispatch) => {
  const res = await axios.get(`/goods/${type}`);

  dispatch({
    type: GET_GOODS,
    goods: res.data
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
  const res = await axios.post(`/admin/good`, data, opt);

  dispatch({
    type: ADMIN_ADD_GOOD,
    good: res.data
  });
};
