import express from "express";


export default({app}:{app:express.Application})=>{
    app.get("/",(req,res)=>{
      res.status(200).send("Brandy app")
    })
}