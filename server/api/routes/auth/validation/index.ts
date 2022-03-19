import { NextFunction, Request, Response } from "express";
import * as yup from "yup";

export const singinValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = yup.object({
    email: yup.string().required("email is required").email("invalid email"),
    password: yup
      .string()
      .required("password is required")
      .min(8, "password is too short")
      .max(15, "password is too long"),
  });
  try {
    await schema.validate(req.body);
    next();
  } catch (e) {
    if (e instanceof Error) {
      return res.status(400).send(e.message);
    }
  }
};

export const signupValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = yup.object({
    email: yup.string().required("email is required").email("invalid email"),
    password: yup
      .string()
      .required("password is required")
      .min(8, "password is too short")
      .max(15, "password is too long"),
    nick: yup.string().required("nick is required"),
  });

  try {
    await schema.validate(req.body);
    next();
  } catch (e) {
    if (e instanceof Error) {
      return res.status(400).send(e.message);
    }
  }
};
