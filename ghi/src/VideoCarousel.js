import React from 'react'
import mainhd from './videos/mainhd.mp4'

const VideoCarousel = () => {
  return (

    <div className="main">
      <div className="overlay"></div>
      <video src={mainhd} autoPlay loop muted />
      <div className="content">
      </div>
    </div>
    </>
  );
};

export default VideoCarousel
