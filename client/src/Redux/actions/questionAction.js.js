import axios from 'axios';
import {
  ADD_QUESTION,
  DEL_QUESTION,
  ADD_QUESTIONS,
  ADD_COMMENT,
  DEL_COMMENT
} from '../types';

export const addQuestion = (question) => (dispatch) => {
  axios.post('/api/question', question).then((res) => dispatch({ type: ADD_QUESTION, payload: res.data }));
};

export const addQuestions = () => (dispatch) => {
  axios('/api/question/all').then((res) => dispatch({ type: ADD_QUESTIONS, payload: res.data }));
};

export const deleteQuestion = (id) => {
  axios.delete(`/api/question/${id}`);
  return {
    type: DEL_QUESTION,
    payload: id,
  };
};

export const addCommentQuestion = (questionId, comment) => (dispatch) => {
  axios
    .post(`/api/question/comment/${questionId}`, comment)
    .then((res) => dispatch({ type: ADD_COMMENT, payload: res.data }));
};

export const deleteCommentQuestion = (id) => {
  axios.delete(`/api/question/comment/${id}`);
  return {
    type: DEL_COMMENT,
    payload: id,
  };
};
