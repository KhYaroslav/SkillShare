import axios from 'axios';
import { ADD_USER, ALERT_TRUE, ALERT_FALSE } from '../types';

export const userAdd = (value) => ({
  type: ADD_USER,
  payload: value,
});

export const alertTrue = () => ({
  type: ALERT_TRUE,
  payload: true,
});

export const alertFalse = () => ({
  type: ALERT_FALSE,
  payload: false,
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
      dispatch(alertTrue());
    })
    .catch((err) => {
      console.log(err);
      if (err.response.status === 401) {
        dispatch(alertFalse());
      }
    });
};

export const userLogin = (log) => (dispatch) => {
  axios
    .post('/api/user/signin', log)
    .then((res) => {
      dispatch(userAdd(res.data));
      dispatch(alertTrue());
    })
    .catch((err) => {
      console.log(err);
      if (err.response.status === 401) {
        dispatch(alertFalse());
      }
    });
};

export const logoutUser = () => (dispatch) => {
  axios('/api/user/logout')
    .then((res) => dispatch(userAdd({})))
    .catch((err) => console.log('err'));
};
