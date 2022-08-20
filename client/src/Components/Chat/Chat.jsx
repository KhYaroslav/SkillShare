import './Chat.scss';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { sendChatMessage, getChatMessages } from '../../Redux/actions/chatActions';
import MessageItem from './MessageItem';
import UserItem from './UserItem';

export default function ChatTest() {
  const [input, setInput] = useState('');

  const messages = useSelector((state) => state.messages);
  const chatUsers = useSelector((state) => state.chatUsers);
  const user = useSelector((state) => state.user);
  const ws = useSelector((state) => state.ws);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id && ws) {
      dispatch(getChatMessages());
    }
  }, [user, ws]);

  const inputHAndler = (e) => {
    setInput(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(sendChatMessage({ message: input }));
    setInput('');
  };
  return (
    <div className="container" ng-cloak ng-app="chatApp">
      <h1>Swanky Chatbox UI With Angular</h1>
      <div className="chatbox" ng-controller="MessageCtrl as chatMessage">
        {chatUsers.map((el) => <UserItem key={el.id} user={el} />)}
        <div className="chatbox__messages" ng-repeat="message in messages">
          <div className="chatbox__messages__user-message">
            {messages.map((el) => <MessageItem key={el.msId} message={el} />)}
          </div>
        </div>
        <form onSubmit={submitHandler}>
          <input value={input} onChange={inputHAndler} type="text" placeholder="Enter your message" />
        </form>
      </div>
    </div>
  );
}
