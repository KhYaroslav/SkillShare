import axios from 'axios';
import { ADD_POST, ADD_POSTS, DEL_POST, ADD_LIKE, FAVORITE_POST, ADD_COMMENT, ADD_COMMENTS, DEL_COMMENT } from '../types';

export const postAdd = (value) => ({
  type: ADD_POST,
  payload: value,
});

export const addPosts = () => (dispatch) => {
  axios('/api/post/posts')
    .then((res) => dispatch({ type: ADD_POSTS, payload: res.data }));
};

export const deletePost = (id) => {
  axios.delete(`/api/post/${id}`);
  return {
    type: DEL_POST,
    payload: id,
  };
};

export const addLike = (postId) => (dispatch) => {
  axios(`/api/likes/${postId}`).then((res) => dispatch({ type: ADD_LIKE, payload: res.data }));
};
export const addFavorite = (postId) => (dispatch) => {
  axios(`/api/favorites/${postId}`).then((res) => dispatch({ type: FAVORITE_POST, payload: res.data }));
};

export const commentAdd = (postId, input) => (dispatch) => {
  axios.post(`/api/comment/${postId}`, input).then((res) => dispatch({ type: ADD_COMMENT, payload: res.data }));
};

export const deleteComment = (id) => {
  axios.delete(`/api/comment/${id}`);
  return {
    type: DEL_COMMENT,
    payload: id,
  };
};
