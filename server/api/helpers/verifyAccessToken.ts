import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../../config";

export default async (req: Request, res: Response, next: NextFunction) => {
  const { access_token } = req.cookies;

  try {
    await jwt.verify(access_token, config.jwtAccessSecret);
    next();
  } catch {
    return res.status(401).send("Invalid token");
  }
};
