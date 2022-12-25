'use client';
import React from 'react'
import "./soundwaves.css";
// random number generator
const random = (min: number, max: number) => Math.random() * (max - min) + min
function SoundWaves() {
  const [show, setShow] = React.useState(false)
  React.useEffect(() => {
    const interval = setInterval(() =>
      setShow((prev) => !prev), random(500, 1500))
    return () => clearInterval(interval)
  }, [])
  return (
    <div className={`waves ${show ? 'opacity-100' : 'opacity-0'}`}>

      <span className='wave'></span>
      <span className='wave'></span>
      <span className='wave'></span>
      <span className='wave'></span>
      <span className='wave'></span>
      <span className='wave'></span>
      <span className='wave'></span>



    </div>
  )
}

export default SoundWaves