import { getErrorMessage } from "@/api/helpers/errors";
import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
export const addActivityValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = yup.object({
    text: yup.string().required("Title is required"),
  });
  try {
    await schema.validate(req.body);
    next();
  } catch (e) {
    if (e instanceof Error) return res.status(400).json(e.message);
  }
};

export const addActivityCommentValidator = async (
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

export const loadActivityValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { start, limit, sort, search } = req.query;
  console.log(req.query);
  try {
    const startNumber = Number(start);
    const limitNumber = Number(limit);
    if (start && limitNumber && (startNumber < 0 || limitNumber < 0))
      throw new Error("start and limit numbers have to be positive");
    if (sort && sort !== "hot" && sort !== "new" && sort !== "top") {
      throw new Error("Wrong type of sortby");
    }
    res.locals.filters = {
      start: startNumber || 0,
      limit: limitNumber || 10,
      sortBy: sort || "hot",
      search: search || "",
    };
    next();
  } catch (error) {
    return res.status(400).json(getErrorMessage(error));
  }
};
