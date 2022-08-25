import React from 'react';
import video from './video.mp4';
import './video.css';

export default function Video() {
  return (
    <video
      className="videoPos"
      autoPlay
      loop
      muted
    >
      <source src={video} type="video/mp4" />
    </video>
  );
}
