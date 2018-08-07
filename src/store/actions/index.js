import axios from 'axios';
import { GET_CONTACTS } from './types';

export const getContacts = () => async dispatch => {
  const res = await axios.get('/goods');
  dispatch({
    type: GET_CONTACTS,
    contacts: res.data.goods
  });
};
