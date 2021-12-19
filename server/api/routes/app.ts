import express, { Application } from "express";

export const startServer = () => {
  const app: Application = express();

  app.use(express.json());
  app.post("/users", async (req, res) => {
    const { password, username } = req.body;
    if (!password || !username) {
      res.sendStatus(400);
      return;
    }

    res.send({ userId: 0 });
  });
  app.listen(500);
  return app;
};
export default startServer();
