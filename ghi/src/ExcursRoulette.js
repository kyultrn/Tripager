import React from 'react'
import excurs_roulette from './videos_2/excurs_roulette.mp4'

const ExcursRoulette = () => {
  return (
    <div>
      <video className="excurs" src={excurs_roulette} autoPlay muted/>
    </div>
  )
}

export default ExcursRoulette;
