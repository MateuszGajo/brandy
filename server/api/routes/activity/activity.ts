import { Router } from "express";
import Container from "typedi";
import { Logger } from "winston";
import activityService from "../../../service/acitivty";
import multer from "multer";
import { uploadPhoto } from "@/api/helpers/cloudinary";
import {
  addActivityValidator,
  loadActivityValidator,
  addActivityCommentValidator,
} from "./validation";
import verifyAccessToken from "@/api/helpers/verifyAccessToken";
import { isAPIError } from "@/api/Error/interface";
import { IActivityFilers } from "@/interfaces/IActivity";
import decodeToken from "@/api/helpers/decodeToken";
const upload = multer();

const route = Router();

export default (app: Router) => {
  app.use("/activity", route);
  route.get("", loadActivityValidator, decodeToken, async (req, res) => {
    const logger: Logger = Container.get("logger");
    logger.debug(`Calling get activity endpoint}`);

    const { start, limit, sortBy, search } = res.locals
      .filters as IActivityFilers;
    const activityInstance = Container.get(activityService);

    const activity = await activityInstance.list(
      {
        start,
        limit,
        sortBy,
        search,
      },
      res.locals.user?._id
    );
    res.status(200).json(activity);
  });

  route.get("/:id", loadActivityValidator, decodeToken, async (req, res) => {
    const { id } = req.params;
    const logger: Logger = Container.get("logger");
    logger.debug(`Calling get activity endpoint}`);

    const activityInstance = Container.get(activityService);

    const activity = await activityInstance.details(id, res.locals.user?._id);
    res.status(200).json(activity);
  });

  route.post(
    "/add",
    verifyAccessToken,
    upload.single("file"),
    addActivityValidator,
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

  route.put("/:id/upvote", verifyAccessToken, async (req, res) => {
    const { id } = req.params;
    try {
      const activityInstance = Container.get(activityService);
      const user = res.locals.user;

      await activityInstance.upVote(id, user._id);
      return res.status(200).json("Activity has been updated");
    } catch (err) {
      console.log(err);
      if (isAPIError(err)) return res.status(err.code).send(err.message);

      return res.status(500).json("Problem with upvote post");
    }
  });

  route.put("/:id/downvote", verifyAccessToken, async (req, res) => {
    const { id } = req.params;
    try {
      const activityInstance = Container.get(activityService);
      const user = res.locals.user;

      await activityInstance.downVote(id, user._id);
      return res.status(200).json("Activity has been updated");
    } catch (err) {
      console.log(err);
      if (isAPIError(err)) return res.status(err.code).send(err.message);

      return res.status(500).json("Problem with downvote activity");
    }
  });

  route.post(
    "/:id/addComment",
    verifyAccessToken,
    addActivityCommentValidator,
    async (req, res) => {
      const { id } = req.params;
      try {
        const activityInstance = Container.get(activityService);
        const user = res.locals.user;

        await activityInstance.addComment({
          activityId: id,
          userId: user._id,
          text: req.body.text,
        });
        console.log("before send response");
        return res.status(200).json("Comment has been added");
      } catch (err) {
        console.log("error");
        console.log(err);
        if (isAPIError(err)) {
          return res.status(err.code).send(err.message);
        }
        return res.status(500).json("Problem with adding comment");
      }
    }
  );
};
