import { getErrorMessage } from "@/api/helpers/errors";
import { Router } from "express";
import Container from "typedi";
import { Logger } from "winston";
import activityService from "../../../service/acitivty";
import multer from "multer";
import { uploadPhoto } from "@/api/helpers/cloudinary";
import { addActivityValidator } from "./validation";
import verifyAccessToken from "@/api/helpers/verifyAccessToken";
const upload = multer();

const route = Router();

export default (app: Router) => {
  app.use("/activity", route);
  route.get("", async (req, res) => {
    const logger: Logger = Container.get("logger");
    logger.debug(`Calling get activity endpoint}`);
    const { start, limit, sortBy } = req.query;
    let startNumber;
    let limitNumber;
    let sortByString;
    try {
      startNumber = Number(start);
      limitNumber = Number(limit);
      sortByString = String(sortBy);
      if (startNumber < 0 || limitNumber < 0)
        throw new Error("start and limit numbers have to be positive");
      if (
        sortByString !== "hot" &&
        sortByString !== "new" &&
        sortByString !== "top"
      )
        throw new Error("Wrong type of sortby");
    } catch (error) {
      return res.status(400).json(getErrorMessage(error));
    }
    const activityInstance = Container.get(activityService);
    const {} = activityInstance.list(startNumber, limitNumber, sortByString);
    res.status(200).json("yoo");
  });

  route.post(
    "/add",
    upload.single("file"),
    addActivityValidator,
    verifyAccessToken,
    uploadPhoto,
    async (req, res) => {
      const activityInstance = Container.get(activityService);
      console.log(res.locals.user);
      const { activity } = await activityInstance.add({
        text: req.body.text,
        pictureUrl: res.locals.imageUrl,
        userId: res.locals.user._id,
      });
      res.status(200).send(activity);
    }
  );
};
