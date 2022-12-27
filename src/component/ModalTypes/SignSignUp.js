import React,{useState} from 'react'

import SignUp from '../LogIn/SignUp'
import SignIn from '../LogIn/SignIn'
import { GetModalContext } from '../../context/ModalContext'
import { RxCross1 } from 'react-icons/rx'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../../firebaseCode'
import { useAuthState } from 'react-firebase-hooks/auth'
const SignSignUp = () => {
    const [user] = useAuthState(auth);
    const { closeModal } = GetModalContext()
    const [signInShow, setSignInShow] = useState(true)
    const googleProvider = new GoogleAuthProvider();
    const signInWithGoogle = () => {
        signInWithPopup(auth, googleProvider).then((result) => {
            console.log(result)
            alert('success')
        }).catch((error) => {
            alert(error)
        })
    }
  return (
    <div>
            <div className='flex flex-row justify-end p-4'>
                <RxCross1 className='cursor-pointer' onClick={closeModal} />
            </div>
            <div className='flex flex-col justify-center items-center'>
                <h2>{signInShow ? "Sign In " : "Sign Up"}</h2>
                {!signInShow ? <SignUp /> : <SignIn setSignInShow={setSignInShow}/>}
                <div className='p-4 w-full'>
                    <button onClick={signInWithGoogle} className='w-full border-2 bg-white p-3 font-semibold shadow-lg rounded-lg'> Sign In With Google</button>
                </div>
            </div>
        </div>
  )
}

export default SignSignUp