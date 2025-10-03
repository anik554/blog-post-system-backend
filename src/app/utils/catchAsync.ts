/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";

type AsyncHandler = (req: Request, res: Response, next: NextFunction)=>Promise<void>

export const catchAsync = (fn: AsyncHandler)=>(req:Request, res:Response, next: NextFunction)=>{
    Promise.resolve(fn(req,res,next)).catch((error: any)=>{
        if(envVars.NODE_ENV === "development"){
            console.log(error)
          }
        next(error)
    })
}