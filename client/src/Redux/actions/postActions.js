import axios from 'axios';
import { ADD_POST, ADD_POSTS, DEL_POST } from '../types';

export const postAdd = (value) => ({
  type: ADD_POST,
  payload: value,
});

export const addPosts = () => (dispatch) => {
  axios('/api/post/posts')
    .then((res) => dispatch({ type: ADD_POSTS, payload: res.data }));
};

export const deletePost = (id) => {
  return {
    type: DEL_POST,
    payload: id,
  };
};
