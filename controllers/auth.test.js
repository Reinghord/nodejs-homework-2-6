const request = require("supertest");
const baseURL = "http://localhost:3000";

describe("returns 200", () => {
  test("response should have status code 200", async () => {
    const res = await request(baseURL).post("/api/users/login").send({
      password: "123456",
      email: "nikija@mail.com",
    });
    expect(res.statusCode).toEqual(200);
  });
});

describe("returns token", () => {
  test("response body should contain token", async () => {
    const res = await request(baseURL).post("/api/users/login").send({
      password: "123456",
      email: "nikija@mail.com",
    });
    expect(res.body).toHaveProperty("token");
  });
});

describe("response", () => {
  test("returns object user with email, subcription and type string", async () => {
    const res = await request(baseURL).post("/api/users/login").send({
      password: "123456",
      email: "nikija@mail.com",
    });
    expect(res.body.user).toMatchObject({
      email: expect.any(String),
      subscription: expect.any(String),
    });
  });
});
