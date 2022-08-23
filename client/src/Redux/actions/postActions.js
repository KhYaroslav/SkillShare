import axios from 'axios';
import {
  ALL_POST,
  ADD_POST,
  ADD_POSTS,
  DEL_POST,
  ADD_LIKE,
  FAVORITE_POST,
  ADD_COMMENT,
  DEL_COMMENT,
  GET_SEARCH_POST,
} from '../types';

export const allPosts = (value) => ({
  type: ALL_POST,
  payload: value,
});

export const addPosts = (value) => ({
  type: ADD_POSTS,
  payload: value,
});

export const getSearchPost = (input) => ({
  type: GET_SEARCH_POST,
  payload: input,
});

export const postAdd = (data) => (dispatch) => {
  axios
    .post('/api/post/posts', data)
    .then((res) => dispatch({ type: ADD_POST, payload: res.data }));
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

export const addComment = (postId, comment) => (dispatch) => {
  axios
    .post(`/api/comment/${postId}`, comment)
    .then((res) => dispatch({ type: ADD_COMMENT, payload: res.data }));
};

export const deleteComment = (id) => {
  axios.delete(`/api/comment/${id}`);
  return {
    type: DEL_COMMENT,
    payload: id,
  };
};
