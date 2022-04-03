import { Router } from "express";
import auth from "./routes/auth/auth";
import activity from "./routes/activity/activity";

export default () => {
  const app = Router();
  auth(app);
  activity(app);
  return app;
};
