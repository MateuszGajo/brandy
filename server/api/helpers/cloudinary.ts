import { NextFunction, Request, Response } from "express";
import DatauriParser from "datauri/parser";
import path from "path";
import cloudinary from "../../utils/cloudinary";

const parser = new DatauriParser();

export const uploadPhoto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) return next();
  const extName = path.extname(req.file.originalname).toString();
  const file64 = parser.format(extName, req.file.buffer);
  try {
    const result = await cloudinary.uploader.upload(file64.content!, {
      transformation: {
        quality: "70",
        fetch_format: "auto",
      },
    });
    res.locals.imageUrl = result.secure_url;
    next();
  } catch (error) {
    return res.status(500).json("uploading photo error");
  }
};
