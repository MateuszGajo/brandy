import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();

if(envFound.error){
    throw new Error("Couldn't find .env file")
}

export default {
    port:process.env.PORT || 5000,
    datebaseURL: process.env.MONGODB_URI as string
}