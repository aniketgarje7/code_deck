import React from 'react'
import { BiImport ,BiFullscreen} from 'react-icons/bi'
import { GetModalContext } from '../../context/ModalContext'
import { useParams } from 'react-router-dom'

const InputConsol = ({  getFile}) => {
  const {openModal,currentInput,setCurrentInput}  = GetModalContext()
  const {folderId} = useParams();
  return (
    <div className='flex flex-col'>
            <div className='bg-[#ededed] p-4 flex justify-between'>
                <h3 className='font-bold flex justify-center'>Input :  
                {/* <BiFullscreen style={{fontSize:'1.5rem'}} onClick={()=>openModal({
                      show:true,
                      modalType:8,
                      identifiers:{
                        folderId:folderId,
                        cardId:""
                      }})}  />*/}
                      </h3> 
               
                <label htmlFor="inputfile" className='flex items-center font-semibold gap-3'>
                    <input className="hidden" type="file" accept="." id="inputfile" onChange={(e) => getFile(e, setCurrentInput)} /> 
                    <BiImport style={{ fontSize: "1.5rem" }} 
                    /> Import Input
                </label>
                
            </div>
            <textarea className='h-[calc(50vh_-_4rem)] resize-none' onChange={(e) => setCurrentInput(e.target.value)}
                value={currentInput} />
        </div>
  )
}

export default InputConsol