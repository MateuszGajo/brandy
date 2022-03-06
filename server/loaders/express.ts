import express from "express";
import routes from "../api";
import cookieParser from "cookie-parser";
import cors from "cors";

export default ({ app }: { app: express.Application }) => {
  app.get("/", (req, res) => {
    res.status(200).send("Brandy app");
  });

  app.use(cors({ credentials: true, origin: true }));
  app.use(cookieParser());
  app.use(express.json());
  app.use(routes());
};
