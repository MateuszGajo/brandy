import mongoose from "mongoose";
import config from "@/config"


export default async ()=>{
    const connection = await mongoose.connect(config.datebaseURL)
    return connection.connection.db
}