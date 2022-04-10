import { IUser } from "@/interfaces/IUser";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../../config";

export default async (req: Request, res: Response, next: NextFunction) => {
  const { access_token } = req.cookies;

  try {
    console.log(access_token);
    await jwt.verify(access_token, config.jwtAccessSecret as string);
    const user = jwt.decode(access_token) as IUser;
    console.log(user);
    res.locals.user = user;
    next();
  } catch {
    return res.status(401).send("Invalid token");
  }
};
