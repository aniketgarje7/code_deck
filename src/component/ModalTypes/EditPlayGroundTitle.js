import React,{useState} from 'react'
import { RxCross1 } from 'react-icons/rx'
import { GetModalContext } from '../../context/ModalContext'
import {GetPlayGroundContext} from '../../context/PlaygroundContext'

const EditPlayGroundTitle = () => {
    const { closeModal, isOpenModal } = GetModalContext()
  const { editPlaygroundTitle, folders } = GetPlayGroundContext()

  const {folderId ,cardId} = isOpenModal.identifiers;
  const [playgroundTitle, setPlaygroundTitle] = useState(folders[folderId].playgrounds[cardId].title)
  return (
    <>
    <div className='flex flex-row justify-end p-4' >
      <RxCross1 className='cursor-pointer' onClick={() => closeModal()} />
    </div>
    <div className=' px-6 py-4 mb-8 flex flex-col items-center justify-center gap-6 '>
      <h2> Edit Folder </h2>
      <input
        type="text"
        value={playgroundTitle}
        placeholder="Please enter folder title"
        onChange={(e) => setPlaygroundTitle(e.target.value)}
        className='border-[.5px] text-sm  border-gray  rounded-lg shadow-sm  p-2 w-full'
      />
      <button
        className='p-3 w-36 text-black bg-white rounded-lg font-semibold bg-darkBlue border-[0.5px] border-gray shadow-lg'
        onClick={() => {
          editPlaygroundTitle(folderId, cardId ,playgroundTitle);
          closeModal();
        }}
      >
        Proceed
      </button>
    </div>

  </>
  )
}

export default EditPlayGroundTitle