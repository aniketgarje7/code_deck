import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { GetModalContext } from '../../context/ModalContext'
const OutputFullScreen = () => {
    const {closeModal,currentOutput} = GetModalContext()
  return (
    <div className='h-96 w-full sm:w-16'>
    <div className='flex justify-end p-4'>
      <AiOutlineClose onClick={()=>closeModal()} className='h-4 w-4 cursor-pointer '/>
      </div>
    <textarea  className='h-[calc(80vh_-_4rem)] w-full !outline-none rounded p-4'  
      value={currentOutput}/>
      </div>
  )
}

export default OutputFullScreen