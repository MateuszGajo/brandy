import { NextFunction, Request, Response } from "express";
import * as yup from "yup";

export const addCommentValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = yup.object({
    text: yup.string().required("Text is required"),
  });
  try {
    await schema.validate(req.body);
    next();
  } catch (e) {
    if (e instanceof Error) return res.status(400).json(e.message);
  }
};
