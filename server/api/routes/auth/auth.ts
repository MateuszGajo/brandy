import { Router, Request, Response } from "express";
import { Container } from "typedi";
import { Logger } from "winston";
import AuthService from "../../../service/auth";
import { IUserRegister, IUserLogin } from "../../../interfaces/IUser";
import { isAPIError } from "../../Error/interface";

const route = Router();

export default (app: Router) => {
  app.use("/auth", route);

  route.post("/signup", async (req: Request, res: Response) => {
    const logger: Logger = Container.get("logger");
    logger.debug(`Calling Sing-up endpoint with body: ${req.body}`);

    try {
      const authServiceInstance = Container.get(AuthService);
      const { user, accessToken, refreshToken } =
        await authServiceInstance.signUp(req.body as IUserRegister);

      res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      return res.status(200).send({ user });
    } catch (e) {
      logger.error("error", e);
      if (isAPIError(e)) {
        res.status(e.code).send(e.message);
      }
    }
  });

  route.post("/signin", async (req, res) => {
    const logger: Logger = Container.get("logger");
    logger.debug(`Calling Sing-in endpoint with body: ${req.body}`);
    try {
      console.log("hjalo?");
      const authServiceInstance = Container.get(AuthService);
      const { user, accessToken, refreshToken } =
        await authServiceInstance.signIn(req.body as IUserLogin);

      res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      return res.status(200).send({ user });
    } catch (e) {
      logger.error("error", e);
      if (isAPIError(e)) {
        res.status(e.code).send(e.message);
      }
    }
  });

  route.post("/refresh", async (req, res) => {
    const logger: Logger = Container.get("logger");
    logger.debug(`Refreshing token: ${req.body}`);
    try {
      const { refresh_token } = req.cookies;

      const authServiceInstance = Container.get(AuthService);
      const { accessToken } = authServiceInstance.refreshToken(refresh_token);

      res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      res.status(200).json("token refreshed");
    } catch (e) {
      logger.error("error", e);
      if (isAPIError(e)) {
        res.status(e.code).send(e.message);
      }
    }
  });

  route.post("/logout", async (req, res) => {
    const logger: Logger = Container.get("logger");
    logger.debug(`User logout: ${req.body}`);

    res.clearCookie("access_token");
    res.clearCookie("refresh_toekn");
    res.status(200).send("Logout successful");
  });
};
