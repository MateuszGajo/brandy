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

  const activityModel = {
    name: "activityModel",
    model: require("../models/activity").default,
  };

  const voteModel = {
    name: "voteModel",
    model: require("../models/vote").default,
  };

  const commentModel = {
    name: "commentModel",
    model: require("../models/comment").default,
  };

  dependancyInjector({
    models: [userModel, activityModel, voteModel, commentModel],
  });

  expressLoader({ app: expressApp });
  Logger.info("Express loaded");
};
