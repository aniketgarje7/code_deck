import React from 'react'
import { GetModalContext } from '../../context/ModalContext'
import { IoTrashOutline } from "react-icons/io5";
import { BiEditAlt } from "react-icons/bi";
import { FcOpenedFolder } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import Card from '../Card';
import {GetPlayGroundContext} from '../../context/PlaygroundContext'
import logoSmall from './logo-small.png'

const RightPanel = () => {
    const navigate = useNavigate();
    const { openModal } = GetModalContext();
    const { folders, deleteFolder, deleteCard } = GetPlayGroundContext();
  return (
    <div className='border-black h-screen p-8'>
    <div className='flex justify-between placeholder:mt-8 items-center'>
        <h2 > My <span className='font-semibold text-2xl'> PlayGround</span></h2>
        <h4 className='cursor-pointer' onClick={() => openModal({
            show: true,
            modalType: 1,
            identifiers: {
                folderId: "",
                cardId: "",
            }
        })}><span className='font-semibold text-2xl cursor-pointer'>+</span> New Folder</h4>
         {/* <h4 onClick={() => openModal({
                    show: true,
                    modalType: 7,
                    identifiers: {
                        folderId: "",
                        cardId: "",
                    }
                })}><span className='font-semibold text-2xl'></span> Login</h4> */}
    </div>
    <hr className="mb-12 mt-4 bg-black" />

    {Object.entries(folders).map(([folderId, folder]) => (
        <div className='flex-col flex my-8' key={folderId}>
            <div className='flex justify-between placeholder:mt-8 items-center'>
                <div className='flex gap-4 items-center'>
                    <FcOpenedFolder size={'2em'} />
                    <h5 className='semibold'> {folder.title}</h5>
                </div>
                <div className='flex gap-4 items-center'>
                    <BiEditAlt className='cursor-pointer' size={'1.2em'} onClick={() => openModal({
                        show: true,
                        modalType: 4,
                        identifiers: {
                            folderId: folderId,
                            cardId: "",
                        }
                    })} />
                    <IoTrashOutline className='cursor-pointer' size={'1.2em'} onClick={() => deleteFolder(folderId)} />
                    <h5 className='semibold cursor-pointer' onClick={() => openModal({
                        show: true,
                        modalType: 2,
                        identifiers: {
                            folderId: folderId,
                            cardId: "",
                        }
                    })}
                    ><span className='font-semibold text-2xl cursor-pointer'>+</span> {" "}New Playground</h5>
                </div>
            </div>
            <hr className="mb-4 mt-4 bg-black" />
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
                {Object.entries(folder['playgrounds']).map(([playgroundId, playground]) => (
                    <Card key={playgroundId}>
                        <div onClick={(e) => {
                            e.stopPropagation(); 
                            
                            navigate(`/code_deck/playground/${folderId}/${playgroundId}`)
                        }}
                            className='flex items-center justify-between cursor-pointer'>
                            <div className='flex gap-4 items-center'>
                                <img src={logoSmall} alt='' />
                                <div>
                                    <h6>{playground.title}</h6>
                                    <h6>Language: {playground.language}</h6>
                                </div>
                            </div>
                            <div className='flex gap-4 items-center' onClick={(e) => {
                                
                                e.stopPropagation(); 
                            }}>
                                <BiEditAlt size={'1.2em'} className='cursor-pointer' onClick={() => openModal({
                                    show: true,
                                    modalType: 5,
                                    identifiers: {
                                        folderId: folderId,
                                        cardId: playgroundId,
                                    }
                                })} />
                                <IoTrashOutline size={'1.2em'} onClick={() => deleteCard(folderId, playgroundId)} />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    ))}
</div>
  )
}

export default RightPanel