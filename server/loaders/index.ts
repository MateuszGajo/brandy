import mongooseLoader from "./mongoose";
import Logger from "./logger";
import expressLoader from "./express";
import { Application } from "express";
import dependancyInjector from "./dependancyInjector";

export default ({ expressApp }: { expressApp: Application }) => {
  const mongoConnection = mongooseLoader();
  Logger.info("Mongodb is running!");

  const userModel = {
    name: "userModel",
    model: require("../models/user").default,
  };
  dependancyInjector({
    models: [userModel],
  });

  expressLoader({ app: expressApp });
  Logger.info("Express loaded");
};
