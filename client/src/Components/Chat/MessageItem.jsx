import React from 'react';

export default function MessageItem({ message }) {
  return (
    <div className="chatbox__messages__user-message--ind-message">
      <p className="name">{message.name}</p>
      <br />
      <p className="message">{message.message}</p>
    </div>
  );
}
