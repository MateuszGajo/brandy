import "reflect-metadata";
import express, { Application } from "express";
import Logger from "./loaders/logger";
import config from "./config";

function startServer() {
  const app: Application = express();

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
