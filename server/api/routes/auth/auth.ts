import { Router, Request, Response } from "express";
import { Container } from "typedi";
import { Logger } from "winston";
import AuthService from "../../../service/auth";
import { IUserRegister, IUserLogin } from "../../../interfaces/IUser";
import { isAPIError } from "../../Error/interface";
import { signupValidator, singinValidator } from "./validation";

const route = Router();

export default (app: Router) => {
  app.use("/auth", route);

  route.post(
    "/signup",
    signupValidator,
    async (req: Request, res: Response) => {
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
    }
  );

  route.post("/signin", singinValidator, async (req, res) => {
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

  route.get("/refresh", async (req, res) => {
    const logger: Logger = Container.get("logger");
    logger.debug(`Refreshing token: ${req.body}`);
    try {
      const { refresh_token } = req.cookies;

      const authServiceInstance = Container.get(AuthService);
      const { accessToken } = await authServiceInstance.refreshToken(
        refresh_token
      );

      res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      return res.status(200).json("token refreshed");
    } catch (e) {
      logger.error("error", e);
      if (isAPIError(e)) {
        return res.status(e.code).send(e.message);
      }
    }
  });

  route.get("/logout", async (req, res) => {
    const logger: Logger = Container.get("logger");
    logger.debug(`User logout: ${req.body}`);

    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    res.status(200).send("Logout successful");
  });

  route.delete("/account/delete", async (req, res) => {
    const logger: Logger = Container.get("logger");
    logger.debug("Deleting user account");

    try {
      const authServiceInstance = Container.get(AuthService);
      await authServiceInstance.deleteAccount(
        req.body.password,
        req.cookies.access_token
      );
      return res.status(200).send("Account deleted");
    } catch (e) {
      console.log("remove error");
      console.log(e);
      logger.error("error", e);
      if (isAPIError(e)) {
        return res.status(e.code).send(e.message);
      }
    }
  });
};
