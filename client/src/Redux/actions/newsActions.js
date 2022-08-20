import axios from 'axios';
import { ADD_NEWS } from '../types';

export const getNews = () => (dispatch) => {
  axios.get('/news/v1')
    .then((res) => ({ type: ADD_NEWS, payload: res.data }));
};
