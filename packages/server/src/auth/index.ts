import express, { Router } from "express";
import { z } from "zod";
import { auth, firestore } from "../firebase";
import { getLoginInfo, getOrCreateUser, getUserData, setUserData } from "../models/users";
import {generateCode, sendCode} from './sendCode'

const router = Router()

router.use(express.json())

router.post('/send-code',async (req,res)=>{
  const {email} = req.body;

  if(email==null) return res.sendStatus(403);

  try {
    const user = await getOrCreateUser(email)
    const login = await getLoginInfo(user.uid)
    await sendCode(email,login.code)
    login.sent++;
    await setUserData(user.uid,{login})
  } catch (error:any) {
    return res.json({success:false,error:error?.message})
  }

  res.json({success:true})
})

router.post('/verify-code',async(req,res)=>{
  const ParamSchema = z.object({
    code: z.string().length(7),
    email: z.string().email()
  }).required().strict()
  const param = ParamSchema.safeParse(req.body)
  if(!param.success) return res.json({success:false,error:'Invalid access code!'});

  const {code,email} = param.data;

  if(code==null) return res.sendStatus(403);

  try {
    const user = await auth.getUserByEmail(email);
    const data = await getUserData(user.uid)
    if(!data || data.login?.code!==code) return res.json({success:false,error:'Invalid access code!'});

    const token = await auth.createCustomToken(user.uid)

    res.json({success:true,token})

  } catch (error:any) {
    res.json({success:false,error:error?.message})
  }
})

export default router;
