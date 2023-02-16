import { User } from "firebase/auth";
import { Button, Modal, Spinner, TextInput, Toast } from "flowbite-react";
import { FormEvent, useEffect, useState } from "react";
import {AiOutlineUser, } from 'react-icons/ai'
import {BsKey} from 'react-icons/bs'
import GoogleButton from "../components/google-button";
import { login, loginWithEmail, sendAccessCode } from "../lib/firebase";
import { setupRequiredInput } from "../lib/setupRequiredInput";
import { HiX, HiOutlineMail } from 'react-icons/hi'
import {BiError} from 'react-icons/bi'
import { OtpInput } from "../components/OtpInput";
/* eslint-disable-next-line */
export interface LoginPageProps {
  onSignIn?:(user:User)=>void
}

enum Statuses {
  Normal,
  LoggingIn,
  Failed,
  Success
}

const LoggingInStatus = {
  status: Statuses.LoggingIn,
  text:'Authenticating... Please wait'
}
const NormalStatus = {
  status: Statuses.Normal,
  text:""
}

export function LoginPage(props: LoginPageProps) {
  const [processing,setProcessing] = useState(false);
  const [showError,setShowError] = useState(false);
  const [loginError,setLoginError] = useState("")

  const [email,setEmail] = useState('')
  const [emailVerified,setEmailVerified] = useState(false);
  const [otp,setOtp] = useState('')

  const onGoogleLogin = (token:string)=>{
    setProcessing(true)
    login(token).then(r=>{
      if(props.onSignIn) props.onSignIn(r.user)
    })
  }
  const sendCode = (e:FormEvent)=>{
    e.preventDefault()
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      setEmailVerified(true)
    }, 777);
    sendAccessCode(email).then(r=>{
      setProcessing(false)
      if(!r.data.success) {
        setLoginError(r.data.error)
        setShowError(true)
      } else {
        setEmailVerified(true)
      }
    }).catch(e=>{
      console.log(typeof e, e)
      setProcessing(false)
      setLoginError(e.message)
      setShowError(true)
    })
  }

  return (
    <div className="absolute flex flex-col items-center justify-center w-screen h-screen bg-stone-200">
      <h1 className='text-2xl font-bold text-slate-800 mb-7'>Login to {import.meta.env.VITE_SITE_NAME}</h1>
      {
        emailVerified ?
          <form className='max-w-md flex flex-col items-center' onSubmit={e=>console.log(otp)}>
            <OtpInput digits={7} className="" onInput={setOtp}/>
            <Button disabled={processing || otp.length!==7} type="submit" className="uppercase mt-11" color="dark">Verify Access Code</Button>
          </form>
        :
          <form className='flex flex-col space-y-4 mb-20' onSubmit={sendCode}>

            <TextInput icon={HiOutlineMail} placeholder="Email" type="email" id="email" {...setupRequiredInput('Enter email here',setEmail)} disabled={processing}/>
            {/* <TextInput icon={BsKey} placeholder="password" type="Password" id="password"  {...setupRequiredInput('Enter password here',setPassword)} disabled={processing.status!==Statuses.Normal}/> */}
            <Button disabled={processing} type="submit" color="dark">Send Access Code</Button>
            {/* <span className="text-slate-800">Don't have an account? <button className="ml-2 font-bold text-primary">Sign up</button></span> */}
            <div className="flex flex-row space-x-4">
              <div className="grow h-[1px] bg-slate-400 self-center"/>
              <span className="shrink text-slate-800">Or</span>
              <div className="grow h-[1px] bg-slate-400 self-center"/>
            </div>
            <GoogleButton clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`} onResult={onGoogleLogin} disabled={processing}/>
          </form>
      }

      <Modal size="lg"
    show={showError} dismissible
    onClose={()=>setShowError(false)}
  >
    <Modal.Body>
      <div>
      <div className="flex flex-row items-center">
        <BiError size="47px" className="text-red-700 mr-3"/>
        <span className="text-xl font-bold">{loginError}</span>
      </div>
      <p className="m-2 text-md font-normal text-gray-700">An error occured while signing in. Please try again!</p>
      <div className="flex justify-end pt-7">
        <Button onClick={()=>setShowError(false)} outline color="dark">
          Okay
        </Button>
      </div>
      </div>
    </Modal.Body>


  </Modal>

      {
        processing &&
        <div className="absolute w-screen h-screen bg-stone-900/50 flex justify-center items-center backdrop-blur-sm">
          <Toast>
            {
              (<>
                <Spinner size="md"/>
                <div className="ml-4 text-md font-normal self-center">Authenticating... Please wait</div>
              </>)
            }

          </Toast>
        </div>
      }
    </div>
  );
}

export default LoginPage;
