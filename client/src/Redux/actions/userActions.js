import axios from 'axios';
import { ADD_USER } from '../types';
import { alertCondition } from './alertActions';

export const userAdd = (value) => ({
  type: ADD_USER,
  payload: value,
});

export const userCheck = () => (dispatch) => {
  axios
    .post('/api/user/check')
    .then((res) => {
      setTimeout(() => {
        dispatch(userAdd(res.data));
      }, 2000);
    })
    .catch((err) => {
      console.log(err);
      dispatch(userAdd({}));
    });
};

export const userSignUp = (reg) => (dispatch) => {
  axios
    .post('/api/user/signup', reg)
    .then((res) => {
      dispatch(userAdd(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const userLogin = (log, navigate) => (dispatch) => {
  axios
    .post('/api/user/signin', log)
    .then((res) => {
      dispatch(userAdd(res.data));
      navigate('/');
    })
    .catch((err) => {
      console.log(err);
      dispatch(alertCondition(5));
      navigate('/login');
    });
};

export const logoutUser = () => (dispatch) => {
  axios('/api/user/logout')
    .then((res) => dispatch(userAdd({})))
    .catch((err) => console.log('err'));
};
