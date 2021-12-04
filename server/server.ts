import express,{Application} from "express";
import logger from "./utils/logger";
logger.error("error")

const app:Application = express();

const port = process.env.port || 5000


app.listen(port,()=>console.log("server is running"))