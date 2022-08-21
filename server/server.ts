import "reflect-metadata";
import express, { Application } from "express";
import Logger from "./loaders/logger";
import config from "./config";
import bodyParser from "body-parser";

function startServer() {
  const app: Application = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.post("/aa", (req) => {
    console.log(req.body);
  });

  require("./loaders").default({ expressApp: app });

  app
    .listen(config.port, () => Logger.info("Server is running"))
    .on("error", (err) => {
      console.log("invoke error");
      console.log(err);
      Logger.error(err);
      process.exit(1);
    });
  return app;
}

export default startServer();
