import mongooseLoader from './mongoose'
import Logger from './logger'
import expressLoader from './express';
import {Application} from "express"
import dependancyInjector from './dependancyInjector';

export default async ({expressApp}:{expressApp:Application})=>{
    
    const mongoConnection = await  mongooseLoader();
    Logger.info("Mongodb is running!");

    const userModel = {
        name:"userModel",
        model:require("../models/user").default
    }
    await dependancyInjector({
        models:[
            userModel
        ]
    })

    await expressLoader({app:expressApp});
    Logger.info("Express loaded")
}