import axios from 'axios';
import { GET_CONTACTS, OPEN_POPUP, CLOSE_POPUP } from './types';

export const getContacts = () => async dispatch => {
  const res = await axios.get('/goods');
  dispatch({
    type: GET_CONTACTS,
    contacts: res.data.goods
  });
};

export const openPopup = (Component, props) => dispatch => {
  console.log('openPopupAction', Component, props);
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
