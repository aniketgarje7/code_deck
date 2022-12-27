import React,{useState} from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {auth} from '../../firebaseCode'
import { useForm } from 'react-hook-form'
import 'react-toastify/dist/ReactToastify.css';
import { toastArray } from "./Toast";
import { toast } from "react-toastify";
import {GetModalContext} from '../../context/ModalContext'
import { ToastContainer } from "react-toastify";
import FormInput from './FormInput';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { async } from '@firebase/util'
const SignIn = ({setSignInShow}) => {
    const { closeModal } = GetModalContext()
    const validationSchema = yup.object().shape({
        email: yup.string().email('Invalid Email').required("Required Field"),
        password: yup.string().required("Required Field").min(6)
    });
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });
    const onSubmit = async(data) => {
        try{
        await signInWithEmailAndPassword(auth,data.email, data.password)
        alert('sccdjf')
        }catch(error) {
            console.log(error,'not sign ined')
            toast.error(error, toastArray);

        }
        
    }
  return (
    <div className='flex flex-col w-full p-4'>
            
    <form id="hook-form" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
            label='Email'
            type='email'
            name='email'
            placeholder='Enter your email'
            control={control}
            error={errors?.email?.message}
            required
        />
        <FormInput
            label='Password'
            type='password'
            name='password'
            placeholder='Enter your Password'
            control={control}
            error={errors?.password?.message}
            required
        />
    </form>
    <button type='submit' form='hook-form' className='w-full border-2 bg-white p-3 mt-8 font-semibold shadow-lg rounded-lg'> Sign In</button>
    <ToastContainer />
</div>
  )
}

export default SignIn