import mongooseLoader from "./mongoose";
import Logger from "./logger";
import expressLoader from "./express";
import { Application } from "express";
import dependancyInjector from "./dependancyInjector";
import { required } from "joi";

export default ({ expressApp }: { expressApp: Application }) => {
  const mongoConnection = mongooseLoader();
  Logger.info("Mongodb is running!");

  const userModel = {
    name: "userModel",
    model: require("../models/user").default,
  };

  const activityModel = {
    name: "activityModel",
    model: require("../models/activity").default,
  };
  dependancyInjector({
    models: [userModel, activityModel],
  });

  expressLoader({ app: expressApp });
  Logger.info("Express loaded");
};
