import "reflect-metadata"
import express,{Application} from "express";
import Logger from "./loaders/logger";
import config from "./config";


async function startServer() {
    const app:Application = express();

    await require("./loaders").default({expressApp:app})
    
    app.listen(config.port,()=>
        Logger.info("Server is running")
        ).on("error",err=>{
        Logger.error(err);
        process.exit(1);
    })
}


startServer();
