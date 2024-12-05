import * as chai from "chai";
import { default as chaiHttp, request } from "chai-http";
import app from "../index.js";
import pool from "../database/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

chai.use(chaiHttp);
const { expect } = chai;

describe("Logout API", () => {
  let token;

  // 在每个测试之前生成 token
  before(async () => {
    // 假设你已经正确的创建了一个用户并生成了 token
    token = jwt.sign({ userId: 1 }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
  });

  it("should logout successfully with valid token", async () => {
    const res = await request
      .execute(app)
      .post("/api/logout")
      .set("Authorization", `Bearer ${token}`); // 使用有效的 token 进行请求

    expect(res).to.have.status(200); // 验证返回状态是 200
    expect(res.body).to.have.property("message").eql("Logout successful"); // 验证返回的消息
  });

  it("should return an error if no token is provided", async () => {
    const res = await request.execute(app).post("/api/logout");

    expect(res).to.have.status(404);
  });
});
