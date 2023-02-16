import { applicationDefault, initializeApp } from "firebase-admin/app";
import {getAuth} from 'firebase-admin/auth'
import { getFirestore } from "firebase-admin/firestore";

export const app = initializeApp({
  credential: applicationDefault(),
  projectId: process.env.VITE_projectId,
  databaseURL: `https://${process.env.VITE_projectId}.firebaseio.com`
})

console.log(process.env)
console.log(app.options.projectId)

export const auth = getAuth(app)

export const firestore = getFirestore(app)
