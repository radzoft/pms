import express, { NextFunction, Request, Response, Router } from 'express';
import helmet from 'helmet';
import hpp from 'hpp'
import router from './router'
import cors from 'cors'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getApp = (mids:{top?:any[],bottom?:any[]})=>{
  const app = express();

  app.disable('x-powered-by')
  app.use(helmet())
  app.use(hpp())
  app.use(cors())

  if(mids.top) app.use(mids.top)

  app.use(router)

  if(mids.bottom) app.use(mids.bottom)

  // custom 404
  app.use((req:Request, res:Response, next:NextFunction) => {
    res.status(404).send("Sorry can't find that!")
  })

  // custom error handler
  app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

  return app
}

export default getApp;
