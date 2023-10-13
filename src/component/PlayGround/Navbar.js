import React from 'react'
import logo from '../Home/logo-small.png'
import { useNavigate } from "react-router-dom";

const Navbar = ({isFullScreen}) => {
  const navigate = useNavigate();
  return (
    <div className={`relative ${isFullScreen ?"h-0":"h-16"} bg-black flex justify-center items-center gap-4`}>
    <img className='w-16 cursor-pointer' src={logo} alt='logo' onClick={()=>{
      navigate('/code_deck');
    }}/>
    <div className='text-white text-2xl'>
      Code Deck
    </div>
  </div>
  )
}

export default Navbar