import React from 'react'
import {GetModalContext} from '../context/ModalContext'
import RightPanel from '../component/Home/RightPanel'
import LeftPanel from '../component/Home/LeftPanel'
import Modal from '../component/Modal'


const Home = () => {


const { isOpenModal } = GetModalContext();
  
  return (
    <>
      <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 ">
        <div className='md:w-full sm:w-full w-5/12'>
          <LeftPanel />
        </div>
        <div className='md:w-full sm:w-full w-7/12'>
          <RightPanel/>
        </div>
        {isOpenModal.show && <Modal />}

      </div>
    </>
  )
}

export default Home