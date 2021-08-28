import app from ".";
import supertest from "supertest";

describe("Test base requests", () => {
  it("should return pong", async () => {
    await supertest(app)
      .get("/ping")
      .expect(200)
      .then((res) => expect(res.body).toBe("pong"));
  });
});
