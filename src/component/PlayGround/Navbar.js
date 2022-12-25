import React from 'react'
import logo from '../Home/logo-small.png'

const Navbar = ({isFullScreen}) => {
  return (
    <div className={`relative ${isFullScreen ?"h-0":"h-16"} bg-black flex justify-center items-center gap-4`}>
    <img className='w-16' src={logo} alt='' />
    <div className='text-white text-2xl'>
      Code Deck
    </div>
  </div>
  )
}

export default Navbar