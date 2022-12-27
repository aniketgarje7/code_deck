import React from 'react'

import { GetModalContext } from '../context/ModalContext'
import { NewFolder, NewPlayGround, NewPlayGroundAndFolder, EditFolder, EditPlayGroundTitle, Loading } from './ModalTypes'
import InputFullScreen from './ModalTypes/InputFullScreen'
import OutputFullScreen from './ModalTypes/OutputFullScreen'
import SignSignUp from './ModalTypes/SignSignUp'

const Modal = () => {
    const { isOpenModal } = GetModalContext()
    const { modalType } = isOpenModal;
  return (
    <>
    <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
    >
        <div className="relative w-auto my-6 mx-auto max-w-3xl" onClick={e => {
            e.stopPropagation();
        }}>
            <div className="border-0  rounded-lg shadow-lg relative flex flex-col w-[30rem] bg-white outline-none focus:outline-none">
                {modalType === 1 && <NewFolder />}
                {modalType === 2 && <NewPlayGround />}
                {modalType === 3 && <NewPlayGroundAndFolder />}
                {modalType === 4 && <EditFolder />}
                {modalType === 5 && <EditPlayGroundTitle />}
                {modalType === 6 && <Loading />}
                {modalType===7 && <SignSignUp/>}
                {modalType===8 && <InputFullScreen/>}
                {modalType===9 && <OutputFullScreen/>}
            </div>
        </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"  ></div>
</>
  )
}

export default Modal