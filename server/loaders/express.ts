import express from "express";
import routes from "@/api"


export default({app}:{app:express.Application})=>{
    app.get("/",(req,res)=>{
      res.status(200).send("Brandy app")
    })

    app.use(express.json())
    app.use(routes())
}