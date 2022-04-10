const USER_NUMBER = 10;
import users from "./users";
import UserModel from "../models/user";
import Logger from "../loaders/logger";
import mongooseLoader from "../loaders/mongoose";

const importData = async (password: string) => {
  const userData = await users(password, USER_NUMBER);
  try {
    const users = await UserModel.insertMany(userData);
    const usersIds = users.map((user) => String(user._id));
    console.log(usersIds);
    Logger.info("Data added successfully");
  } catch (err) {
    Logger.error(err);
  }
};

const deleteData = async () => {
  try {
    await UserModel.deleteMany({});
  } catch (err) {
    console.error(err);
  }
};

const runSeeder = async () => {
  if (!process.argv[2]) {
    throw new Error(
      "Enter operation type (-- + -i for insert, -d for delete) as second argument"
    );
  }

  mongooseLoader();
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
