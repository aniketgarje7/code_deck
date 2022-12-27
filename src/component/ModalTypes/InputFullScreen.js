import React from 'react'
import { GetModalContext } from '../../context/ModalContext'
import {AiOutlineClose} from 'react-icons/ai'
const InputFullScreen = () => {
  const {closeModal,currentInput,setCurrentInput} = GetModalContext()
  return (
    <>
    
    <div className='h-96 w-full '>
      <div className='flex justify-end p-4'>
        <AiOutlineClose onClick={()=>closeModal()} className='h-4 w-4 cursor-pointer '/>
        </div >
      <textarea  className='h-[calc(80vh_-_4rem)] w-full !outline-none rounded p-4'  onChange={(e)=>setCurrentInput(e.target.value)}
        value={currentInput}/>
    </div>
    
    </>
  )
}

export default InputFullScreen