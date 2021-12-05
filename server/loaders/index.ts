import mongooseLoader from './mongoose'
import Logger from './logger'
import expressLoader from './express';
import {Application} from "express"

export default async ({expressApp}:{expressApp:Application})=>{
    const mongoConnection = await  mongooseLoader();
    Logger.info("Mongodb is running!");

    await expressLoader({app:expressApp});
    Logger.info("Express loaded")
}