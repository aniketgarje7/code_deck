import React, { useState } from "react";
import SignUp from "../LogIn/SignUp";
import SignIn from "../LogIn/SignIn";
import { GetModalContext } from "../../context/ModalContext";
import { RxCross1 } from "react-icons/rx";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebaseCode";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "@material-tailwind/react";
const SignSignUp = () => {
  const [user] = useAuthState(auth);
  const { closeModal,openModal } = GetModalContext();
  const [signInShow, setSignInShow] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log(result);
        localStorage.setItem('user',JSON.stringify(result))
        alert("success");
        closeModal();
      })
      .catch((error) => {
        alert(error);
      });
  };
  
  return (
    <div>
      <div className="flex flex-row justify-end p-4">
        <RxCross1 className="cursor-pointer" onClick={closeModal} />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h2>{signInShow ? "LOGIN " : "SIGNUP"}</h2>
        {!signInShow ? <SignUp /> : <SignIn  />}
        or
        <div className="p-4 w-full">
          <Button
            size="lg"
            variant="outlined"
            color="blue-gray"
            className="flex items-center gap-3 mx-auto w-full justify-center"
            onClick={signInWithGoogle}
          >
            <img
              src="https://docs.material-tailwind.com/icons/google.svg"
              alt="metamask"
              className="h-6 w-6"
            />
        
            Continue with Google
          </Button>
        </div>
      </div>
      <div className='text-xs py-2 flex justify-center'>Not a Member <span  className="mx-1 text-blue-gray-700 underline  cursor-pointer" onClick={()=>setSignInShow(!signInShow)}>{signInShow?"Login":"SignUp"}</span></div>

    </div>
  );
};

export default SignSignUp;
