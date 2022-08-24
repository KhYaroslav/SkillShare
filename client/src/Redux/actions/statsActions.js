import axios from 'axios';
import { ALL_STATS_USERS } from '../types';

export const allStats = () => (dispatch) => {
  axios
    .get('/api/stats')
    .then((res) => dispatch({ type: ALL_STATS_USERS, payload: res.data }));
};
