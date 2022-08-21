import { Router } from "express";
import auth from "./routes/auth/auth";
import activity from "./routes/activity/activity";
import comment from "./routes/comment/comment";

export default () => {
  const app = Router();
  auth(app);
  activity(app);
  comment(app);
  return app;
};
