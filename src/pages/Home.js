import React from 'react'
import {GetModalContext} from '../context/ModalContext'
import RightPanel from '../component/Home/RightPanel'
import LeftPanel from '../component/Home/LeftPanel'
import Modal from '../component/Modal'


const Home = () => {


const { isOpenModal } = GetModalContext();
  console.log(isOpenModal.show)
  return (
    <>
      <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 sm:h-screen ">
        <div className='lg:w-24rem  md:w-full sm:w-screen    '>
          <LeftPanel />
        </div>
        <div className='lg:w-24rem md:w-full sm:w-full     '>
          <RightPanel/>
        </div>
        {isOpenModal.show && <Modal />}

      </div>
    </>
  )
}

export default Home