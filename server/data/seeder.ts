import users from "./users";
import activities from "./activities";
import votes from "./votes";
import UserModel from "../models/user";
import ActivityModel from "../models/activity";
import VoteModel from "../models/vote";
import Logger from "../loaders/logger";
import mongoose from "mongoose";

const USER_NUMBER = 50;

const importData = async (password: string) => {
  const userData = await users(password, USER_NUMBER);

  try {
    const users = await UserModel.insertMany(userData);
    const usersIds = users.map((user) => String(user._id));

    const activityData = activities(usersIds, 10000);
    const activitiesResponse = await ActivityModel.insertMany(activityData);
    const activitisIds = activitiesResponse.map((activity) =>
      String(activity._id)
    );

    const votesData = votes(usersIds, activitisIds);
    const votesResponse = await VoteModel.insertMany(votesData);
    Logger.info("Data added successfully");
  } catch (err) {
    Logger.error(err);
  }
};

const deleteData = async () => {
  try {
    await UserModel.deleteMany({});
    await ActivityModel.deleteMany({});
    Logger.info("Data deleted successfully");
  } catch (err) {
    Logger.error(err);
  }
};

const runSeeder = async () => {
  if (!process.argv[2]) {
    throw new Error(
      "Enter operation type (-- + -i for insert, -d for delete) as second argument"
    );
  }
  await mongoose
    .connect(process.env.MONGODB_URI || "")
    .then(() => console.log("mongoose connected"));
  if (process.argv[2] === "-i") {
    if (!process.argv[3])
      throw new Error("Enter password as the third argument");
    else if (process.argv[3].length < 8)
      throw new Error("Password is too short");
    await importData(process.argv[3]);
  } else if (process.argv[2] === "-d") {
    await deleteData();
  }
};

const main = async () => {
  try {
    await runSeeder();
  } catch (err) {
    if (err instanceof Error) Logger.error(err.message);
  }
  process.exit();
};

main();
