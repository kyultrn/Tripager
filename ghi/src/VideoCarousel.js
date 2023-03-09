import React from "react";
import mainhd from "./videos_2/mainhd.mp4";

const VideoCarousel = () => {
  return (
    <div className="">
      <div className=""></div>
      <video src={mainhd} autoPlay loop muted />
      <div className=""></div>
    </div>
  );
};

export default VideoCarousel;
