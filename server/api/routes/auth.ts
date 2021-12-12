import {Router,Request,Response} from "express";
import { Container } from 'typedi';
import { Logger } from "mongoose/node_modules/mongodb";
import AuthService from "@/service/auth";
import {  IUserRegister, IUserLogin } from "@/interfaces/IUser";
import APIError from "../Error/APIError";
const route = Router();

export default (app:Router)=>{
    app.use("/auth",route);

    route.post("/signup",async(req:Request,res:Response)=>{
        const logger:Logger = Container.get("logger");
        logger.debug("Calling Sing-up endpoint with body: ",req.body);
        
        try{
            const authServiceInstance = Container.get(AuthService)
            const {user,token} = await authServiceInstance.signUp(req.body as IUserRegister);
            return res.status(200).send({user,token})
        }catch(e:any){
            logger.error("error",e);
            res.status(e.code).send(e.message)
        }
    })

    route.post("/signin",async(req,res)=>{
        const logger:Logger = Container.get("logger");
        logger.debug("Calling sign-in endpoint with body:", req.body);
        try{
            const authServiceInstance = Container.get(AuthService);
            const {user,token} = await authServiceInstance.signIn(req.body as IUserLogin);
            return res.status(200).send({user,token})
        }catch(e){}
    })
}