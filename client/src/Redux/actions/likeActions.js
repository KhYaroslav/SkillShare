import axios from 'axios';
import { ADD_LIKE } from '../types';

export const addLike = (id) => (dispatch) => {
  axios(`/api/likes/${id}`).then((res) => console.log(res.data));
  dispatch({ type: ADD_LIKE, payload: id });// {user.id:post.id}
};
