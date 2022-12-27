import React, { useState } from 'react'
import { createContext,useContext } from 'react'

const Context = createContext()
const ModalContext = ({children}) => {
    const initialModalFields = {
        show : false,
        modalType : "",
        identifiers : {
            folderId : "",
            cardId : "",
        }
    }

    const [isOpenModal, setIsOpenModal] = useState({ ...initialModalFields});

    const openModal = (value) => {
        setIsOpenModal(value)
    }

    const closeModal = () => {
        setIsOpenModal({ ...initialModalFields})
    }
 const [currentInput,setCurrentInput] = useState('')
 const [currentOutput, setCurrentOutput] = useState('')
    const ModalFeatures = {
        isOpenModal: isOpenModal,
        openModal: openModal,
        closeModal: closeModal,
        currentInput:currentInput,
        setCurrentInput:setCurrentInput,
        currentOutput:currentOutput,
       setCurrentOutput:setCurrentOutput,
    }
  return (
    <Context.Provider value={ModalFeatures}>
        {children}
    </Context.Provider>
  )
}

 export const GetModalContext = ()=>{
   return useContext(Context)
}
export default ModalContext