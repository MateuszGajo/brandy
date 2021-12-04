import { getLogger, configure } from "log4js";

configure({
  appenders: {
    app: { type: "file", filename: "./logs/app.log" },
  },
  categories: {
    default: {
      appenders: ["app"],
      level: "debug",
    },
  },
});

const logger = getLogger();

logger.info("Log4js working!");

export default logger;
