import { Button } from '@material-tailwind/react'
import React, { useEffect, useRef, useState } from 'react'
import { CiLogin } from "react-icons/ci";
import { GetModalContext } from '../../context/ModalContext';
import { useNavigate } from 'react-router-dom';

const AuthButtons = () => {
    const navigate = useNavigate();
    const { openModal } = GetModalContext();
    const [user,setUser] = useState(null);
    useEffect(()=>{
      if(window){
        const temp =  JSON.parse(localStorage.getItem('user')??"{}");
        if(temp.user){
          setUser(temp)
        }
             
    }
    },[])
    
    const handleLogOut = ()=>{
      setUser(null)
      localStorage.removeItem('user');
    }
    console.log({user})
  return (
    <div className='flex justify-end gap-2 py-2'>
  
      <Button variant="outlined" className="flex items-center gap-3 py-2"  onClick={() => user?handleLogOut():openModal({
            show: true,
            modalType: 7,
            identifiers: {
                folderId: "",
                cardId: "",
            }
        })}>
      {user?user.user.displayName:"LogIn"}
       <CiLogin />

      </Button>
      </div>
  )
}

export default AuthButtons