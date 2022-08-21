import React from 'react';

export default function Name({ user }) {
  return (
    <div className="chatbox__user--active">
      <p>{user.name}</p>
    </div>
  );
}
