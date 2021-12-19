import request from "supertest";
import app from "../../app";
import app1 from "../../../../server";

test("should respond with a 200 status code", async () => {
  console.log(app);
  console.log(app1);
  const res = await request(app1).get("/");
  expect(res.statusCode).toBe(200);

  const response = await request(app).post("/users").send({
    username: "username",
    password: "password",
  });
  expect(response.statusCode).toBe(200);
});
it("dfs", () => {});
