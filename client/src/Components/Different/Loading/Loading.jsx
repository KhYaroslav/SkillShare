import React from 'react';
import './Loading.scss';

export default function Loading() {
  return (
    <div className="main">
      <div className="loader">
        <div className="loader__bar" />
        <div className="loader__bar" />
        <div className="loader__bar" />
        <div className="loader__bar" />
        <div className="loader__bar" />
        <div className="loader__ball" />
      </div>
    </div>
  );
}
