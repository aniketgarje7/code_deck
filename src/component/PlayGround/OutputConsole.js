import React from 'react'
import { BiExport ,BiFullscreen} from 'react-icons/bi'
import { GetModalContext } from '../../context/ModalContext'

const OutputConsole = () => {
  const {openModal,currentOutput} = GetModalContext()
  return (
    <div className='flex flex-col'>
    <div className='bg-[#ededed] p-4 flex justify-between'>
      <h3 className='font-bold flex justify-center'>Output : 
      {/* <BiFullscreen style={{fontSize:'1.5rem'}} onClick={()=>openModal({
                      show:true,
                      modalType:9,
                      identifiers:{
                        folderId:"",
                        cardId:""
                      }})}/>*/}
                       </h3>
      <a className='flex font-semibold gap-4'
        href={`data:text/plain;charset=utf-8,${encodeURIComponent(currentOutput)}`} download="output.txt">
        <BiExport className='text-2xl' /> Export Output
      </a>
    </div>
    <textarea
    className='h-[calc(50vh_-_8rem)] resize-none'
    value={currentOutput}
    disabled
    />
  </div>
  )
}

export default OutputConsole