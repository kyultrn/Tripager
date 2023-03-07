import React from 'react'
import excurs_roulette from './videos/excurs_roulette.mp4'

const ExcursRoulette = () => {
  return (
    <div className="excurs">
      <video src={excurs_roulette} autoPlay loop muted />
    </div>
  );
};

export default ExcursRoulette;
