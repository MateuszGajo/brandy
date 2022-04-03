import { Router } from "express";
import Container from "typedi";
import { Logger } from "winston";

const route = Router();

export default (app: Router) => {
  app.use("/activity", route);
  route.get("", async (req, res) => {
    const logger: Logger = Container.get("logger");
    logger.debug(`Calling get activity endpoint}`);
    const { start = 0, number = 10 } = req.query;
    console.log(start, number);
    res.status(200).json("yoo");
  });
};
