import { isAPIError } from "@/api/Error/interface";
import CommentService from "../../../service/comment";
import { Router } from "express";
import Container from "typedi";
import { Logger } from "winston";
import { addCommentValidator } from "./validation";
import verifyAccessToken from "../../helpers/verifyAccessToken";

const route = Router({ mergeParams: true });

export default (app: Router) => {
  app.use("/activity/:activityId", route);

  route.post(
    "/addComment",
    verifyAccessToken,
    addCommentValidator,
    async (req, res) => {
      try {
        const logger: Logger = Container.get("logger");
        logger.debug(`Calling add comment endpoint`);

        const commentInstance = Container.get(CommentService);
        const { activityId } = req.params;

        const comment = await commentInstance.addComment({
          text: req.body.text,
          activityId,
          userId: res.locals.user?._id,
        });
        res.status(200).json(comment);
      } catch (err) {
        console.log(err);
        if (isAPIError(err)) return res.status(err.code).send(err.message);

        return res.status(500).json("Problem adding comment");
      }
    }
  );
};
