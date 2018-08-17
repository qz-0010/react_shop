import axios from 'axios';
import qs from 'qs';
import uuid from 'uuid';
import { OPEN_POPUP, CLOSE_POPUP, AUTHORIZE, LOGOUT, INIT, GET_GOODS, GET_BUCKET } from './types';

export const init = () => async dispatch => {
  dispatch({
    type: INIT
  });
};

export const openPopup = (Component, props) => dispatch => {
  dispatch({
    type: OPEN_POPUP,
    active: true,
    Component,
    props
  });
};

export const closePopup = () => dispatch => {
  dispatch({
    type: CLOSE_POPUP,
    active: false,
    Component: null
  });
};

export const authorize = (props) => async dispatch => {
  const data = props ? qs.stringify(props) : '';

  return axios.post('/login', data).then(
    (res) => {
      dispatch({
        type: AUTHORIZE,
        user: res.data
      });
    },
    (err) => console.error(err)
  );
};

export const logout = () => async dispatch => {
  const res = await axios.get('/logout');

  dispatch({
    type: LOGOUT,
    user: null
  });
};

export const getGoods = (type='all') => async dispatch => {
  const res = await axios.get(`/goods/${type}`);

  dispatch({
    type: GET_GOODS,
    goods: res.data
  });
};

const initOrder = () => {
  var order = localStorage.get('order');

  if(order) {
    order = JSON.parse(order);
  } else {
    order = {orderid: uuid(), goods: {}};
  }

  return order;
};

const setOrder = (order) => {
  localStorage.set('order', JSON.stringify(order));
}

export const addToBasket = (id, count) => async dispatch => {
  var order = initOrder();
  order.goods[id] = count;

  setOrder(order);
};


// async onAddGoodSubmit(formState) {
//     const { title, price } = formState.values;

//     if(!formState.valid) return

//     axios.post('/admin/good', { title, price }).then(
//       (res) => console.log(res),
//       (err) => console.log(err)
//     )
//   }

//   onAuthSubmit(formState) {
//     debugger;
//     const { email, password } = formState.values;

//     if(!formState.valid) return

//     console.log(qs.stringify({ email, password }));

//     axios.post('/login', qs.stringify({ email, password })).then(
//       (res) => console.log(res),
//       (err) => console.log(err)
//     )
//   }