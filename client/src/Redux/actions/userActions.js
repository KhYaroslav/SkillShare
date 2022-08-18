import axios from 'axios';
import { ADD_USER } from '../types';

export const userAdd = (value) => ({
  type: ADD_USER,
  payload: value,
});

export const userCheck = () => (dispatch) => {
  axios
    .post('/api/v1/check')
    .then((res) => {
      setTimeout(() => {
        dispatch(userAdd(res.data));
      }, 2090);
    })
    .catch((err) => {
      dispatch(userAdd({}));
    });
};

export const userSignUp = (reg) => (dispatch) => {
  axios
    .post('/api/v1/signup', reg)
    .then((res) => dispatch(userAdd(res.data)))
    .catch((err) => console.log(err));
};

export const userLogin = (log) => (dispatch) => {
  axios
    .post('/api/v1/login', log)
    .then((res) => dispatch(userAdd(res.data)))
    .catch((err) => console.log(err));
};

export const logoutUser = () => (dispatch) => {
  axios('/api/v1/logout')
    .then((res) => dispatch(userAdd({})))
    .catch((err) => console.log('err'));
};
