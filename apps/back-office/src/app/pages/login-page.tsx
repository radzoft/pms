import { User } from "firebase/auth";
import { Button, TextInput } from "flowbite-react";
import { FormEvent, useEffect, useState } from "react";
import {AiOutlineUser, } from 'react-icons/ai'
import {BsKey} from 'react-icons/bs'
import GoogleButton from "../components/google-button";
import { login } from "../lib/firebase";
/* eslint-disable-next-line */
export interface LoginPageProps {
  onSignIn?:(user:User)=>void
}

export function LoginPage(props: LoginPageProps) {
  const [processing,setProcessing] = useState(false);
  const onGoogleLogin = (token:string)=>{
    setProcessing(true)
    login(token).then(r=>{
      if(props.onSignIn) props.onSignIn(r.user)
    })
  }
  const onLogin = (e:FormEvent)=>{
    e.preventDefault()
  }

  return (
    <div className="absolute flex flex-col items-center justify-center w-screen h-screen bg-stone-200">
      <form className='flex flex-col space-y-4 mb-20' onSubmit={onLogin}>
        <h1 className='text-2xl font-bold text-slate-800 mb-4'>Login to Radzoft PMS</h1>
        <TextInput icon={AiOutlineUser} placeholder="Username" type="text" id="username"  required/>
        <TextInput icon={BsKey} placeholder="password" type="Password" id="password"  required/>
        <Button type="submit" color="dark">Sign in with Email</Button>
        <span className="text-slate-800">Don't have an account? <button className="ml-2 font-bold text-primary">Sign up</button></span>
        <div className="flex flex-row space-x-4">
          <div className="grow h-[1px] bg-slate-400 self-center"/>
          <span className="shrink text-slate-800">Or</span>
          <div className="grow h-[1px] bg-slate-400 self-center"/>
        </div>
        <GoogleButton clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`} onResult={onGoogleLogin}/>
      </form>
    </div>
  );
}

export default LoginPage;
