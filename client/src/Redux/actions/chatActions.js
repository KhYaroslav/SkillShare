import { ADD_CHAT_USER, GET_CHAT_MESSAGES, SET_CHAT_MESSAGE } from '../types';

export const chatUserAction = (payload) => ({
  type: ADD_CHAT_USER,
  payload,
});

export const getChatMessages = () => ({
  type: GET_CHAT_MESSAGES,
});

export const sendChatMessage = (payload) => ({
  type: SET_CHAT_MESSAGE,
  payload,
});
