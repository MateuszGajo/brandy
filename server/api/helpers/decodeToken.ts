import { IUser } from "@/interfaces/IUser";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../../config";

export default async (req: Request, res: Response, next: NextFunction) => {
  const { access_token } = req.cookies;

  try {
    if (!access_token) throw new Error("");
    await jwt.verify(access_token, config.jwtAccessSecret as string);
    const user = jwt.decode(access_token) as IUser;
    res.locals.user = user;
    next();
  } catch {
    next();
  }
};
