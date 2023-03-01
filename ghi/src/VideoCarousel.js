import React from 'react'
import mainhd from './videos/mainhd.mp4'

const VideoCarousel = () => {
  return (
    <div className="main">
      <div className="overlay"></div>
      <video src={mainhd} autoPlay loop muted />
      <div className="content">
        <h1>Welcome</h1>
        <p>To Tripager.</p>
      </div>
    </div>
  );
};

export default VideoCarousel
