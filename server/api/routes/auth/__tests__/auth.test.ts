import request from "supertest";
import app from "../../../../server";

describe("authentiction test", () => {
  describe("login tests", () => {
    it("no creds", async () => {
      const resp = await request(app).post("/auth/signin").send();
      expect(resp.statusCode).toBe(400);
      console.log(resp.text);
    });

    it("invalid creds", async () => {
      const resp = await request(app).post("/auth/signin").send({
        email: "fds@dd",
        password: "fdsa",
      });
      expect(resp.statusCode).toBe(400);
    });

    it("invalid email", async () => {
      const resp = await request(app).post("/auth/signin").send({
        email: "fds@dd",
        password: "fdsafdsfa",
      });
      expect(resp.statusCode).toBe(400);
      expect(resp.text).toBe("invalid email");
    });

    it("invalid password", async () => {
      let resp = await request(app).post("/auth/signin").send({
        email: "fds@dd",
        password: "fdsafd",
      });
      expect(resp.text).toBe("password is too short");
      expect(resp.statusCode).toBe(400);

      resp = await request(app).post("/auth/signin").send({
        email: "fds@dd",
        password: "fdsafdfdddddddfdsfsfa",
      });
      expect(resp.text).toBe("password is too long");
      expect(resp.statusCode).toBe(400);
    });
  });

  describe("register tests", () => {
    it("no creds", async () => {
      const resp = await request(app).post("/auth/signup").send();
      expect(resp.statusCode).toBe(400);
    });

    it("invalid creds", async () => {
      const resp = await request(app).post("/auth/signup").send({
        email: "fd",
        password: "df",
        nick: "df",
      });
      expect(resp.statusCode).toBe(400);
    });

    it("invalid email only", async () => {
      const resp = await request(app).post("/auth/signup").send({
        email: "fd@",
        password: "dfdsfasdf",
        nick: "df",
      });
      expect(resp.statusCode).toBe(400);
      expect(resp.text).toBe("invalid email");
    });

    it("invalid password only", async () => {
      let resp = await request(app).post("/auth/signup").send({
        email: "fd@dfasd.pl",
        password: "df",
        nick: "df",
      });
      expect(resp.statusCode).toBe(400);
      expect(resp.text).toBe("password is too short");

      resp = await request(app).post("/auth/signup").send({
        email: "fd@dfasd.pl",
        password: "dfdffffffffsfdsfdsfsd",
        nick: "df",
      });
      expect(resp.statusCode).toBe(400);
      expect(resp.text).toBe("password is too long");
    });

    it("empty nick", async () => {
      const resp = await request(app).post("/auth/signup").send({
        email: "fd@",
        password: "dfdsfasdf",
        nick: "",
      });
      expect(resp.statusCode).toBe(400);
      expect(resp.text).toBe("nick is required");
    });
  });

  describe("authentication flow", () => {
    const newUser = {
      email: "example33@example.pl",
      password: "test1234",
      nick: "example",
    };
    let accessToken = "";
    let refreshToken = "";
    let accessTokenString = "";
    let refreshTokenString = "";

    it("register user", async () => {
      const resp = await request(app).post("/auth/signup").send(newUser);

      expect(resp.status).toBe(200);
      expect(resp.body).toMatchObject({
        user: {
          email: newUser.email,
          nick: newUser.nick,
        },
      });
    });

    it("register user with existing email", async () => {
      const resp = await request(app).post("/auth/signup").send(newUser);

      expect(resp.status).toBe(409);
      expect(resp.text).toBe("User already exists");
    });

    it("login to existing account with invalid creds", async () => {
      const resp = await request(app)
        .post("/auth/signin")
        .send({ email: newUser.email, password: "invalidcreds" });

      expect(resp.status).toBe(401);
      expect(resp.text).toBe("Incorrect password");
    });

    it("login to existing account with valid creds", async () => {
      const resp = await request(app)
        .post("/auth/signin")
        .send({ email: newUser.email, password: newUser.password });

      accessTokenString = resp.header["set-cookie"].find((item: string) =>
        item.includes("access_token")
      );

      accessToken = accessTokenString.split(";")[0].split("=")[1];
      refreshTokenString = resp.header["set-cookie"].find((item: string) =>
        item.includes("refresh_token")
      );
      refreshToken = refreshTokenString.split(";")[0].split("=")[1];

      expect(resp.status).toBe(200);
      expect(resp.body).toMatchObject({
        user: {
          email: newUser.email,
          nick: newUser.nick,
        },
      });
    });

    it("refresh token with invalid refresh", async () => {
      const resp = await request(app)
        .get("/auth/refresh")
        .set("Cookie", ["refresh_token=invalid; Path=/;"])
        .send();

      expect(resp.statusCode).toBe(401);
      expect(resp.text).toBe("Refresh token is invalid");
    });

    it("refresh token with valid refresh", async () => {
      const resp = await request(app)
        .get("/auth/refresh")
        .set("Cookie", [refreshTokenString])
        .send();

      const accessToken = resp.header["set-cookie"]
        .find((item: string) => item.includes("access_token"))
        .split(";")[0]
        .split("=")[1];

      expect(resp.statusCode).toBe(200);
      expect(accessToken.length).not.toEqual(0);
    });

    it("logout", async () => {
      const resp = await request(app)
        .get("/auth/logout")
        .set("Cookie", [refreshTokenString, accessTokenString])
        .send();

      accessTokenString = resp.header["set-cookie"].find((item: string) =>
        item.includes("access_token")
      );

      accessToken = accessTokenString.split(";")[0].split("=")[1];
      refreshTokenString = resp.header["set-cookie"].find((item: string) =>
        item.includes("refresh_token")
      );
      refreshToken = refreshTokenString.split(";")[0].split("=")[1];

      expect(resp.statusCode).toBe(200);
      expect(accessToken).toEqual("");
      expect(refreshToken).toEqual("");
    });

    it("remove account when user is no logged in", async () => {
      const resp = await request(app)
        .delete("/auth/account/delete")
        .set("Cookie", [accessTokenString])
        .send({ password: newUser.password });

      expect(resp.status).toBe(404);
      expect(resp.text).toBe("User not registered");
    });

    it("remove account when user is logged in", async () => {
      let resp = await request(app)
        .post("/auth/signin")
        .send({ email: newUser.email, password: newUser.password });

      accessTokenString = resp.header["set-cookie"].find((item: string) =>
        item.includes("access_token")
      );

      accessToken = accessTokenString.split(";")[0].split("=")[1];
      refreshTokenString = resp.header["set-cookie"].find((item: string) =>
        item.includes("refresh_token")
      );
      refreshToken = refreshTokenString.split(";")[0].split("=")[1];

      resp = await request(app)
        .delete("/auth/account/delete")
        .set("Cookie", [accessTokenString])
        .send({ password: newUser.password });

      expect(resp.status).toBe(200);
      expect(resp.text).toBe("Account deleted");
    });
  });
});
