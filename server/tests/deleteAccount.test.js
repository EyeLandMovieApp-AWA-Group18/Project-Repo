import * as chai from "chai";
import { default as chaiHttp, request } from "chai-http";
import app from "../index.js";
import sinon from "sinon";
import pool from "../database/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // 引入jsonwebtoken

chai.use(chaiHttp);
const { expect } = chai;

describe("Delete Account API", () => {
  let dbConnection;
  let userId;
  let token; // 存储JWT令牌

  before(async () => {
    dbConnection = await pool.connect();
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash("password123", saltRounds);
    const userResult = await pool.query(
      `INSERT INTO users (username, email, password) VALUES ('testuser', 'testuser@example.com', $1) RETURNING id`,
      [hashedPassword]
    );
    userId = userResult.rows[0].id;

    // 生成一个有效的JWT令牌
    token = jwt.sign({ userId: userId }, "yourSecretKey", { expiresIn: "1h" });
  });

  after(() => {
    if (dbConnection) dbConnection.release();
  });

  beforeEach(async () => {
    // 你可以在这里再次确保数据库状态
  });

  afterEach(async () => {
    await pool.query("DELETE FROM users");
  });

  it("should delete a user account successfully", async () => {
    const res = await request
      .execute(app)
      .delete("/api/delete")
      .set("Authorization", `Bearer ${token}`);

    expect(res).to.have.status(200);
    expect(res.body)
      .to.have.property("message")
      .eql("User account deleted successfully");
  });

  it("should return an error if user does not exist", async () => {
    // 模拟用户不存在
    const nonExistentToken = jwt.sign({ userId: 999 }, "yourSecretKey", {
      expiresIn: "1h",
    });

    const res = await request
      .execute(app)
      .delete("/api/delete")
      .set("Authorization", `Bearer ${nonExistentToken}`);

    expect(res).to.have.status(404);
    expect(res.body).to.have.property("error").eql("User not found");
  });
});

describe("Login API", () => {
  let dbConnection;
  let token; // 存储JWT令牌

  before(async () => {
    dbConnection = await pool.connect();
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash("password123", saltRounds);
    const userResult = await pool.query(
      `INSERT INTO users (username, email, password) VALUES ('testuser', 'testuser@example.com', $1) RETURNING id`,
      [hashedPassword]
    );

    // 生成JWT令牌
    token = jwt.sign({ userId: userResult.rows[0].id }, "yourSecretKey", {
      expiresIn: "1h",
    });
  });

  after(() => {
    if (dbConnection) dbConnection.release();
  });

  it("should log in a user with valid credentials", async () => {
    const res = await request
      .execute(app)
      .post("/api/login")
      .send({ email: "testuser@example.com", password: "password123" });

    expect(res).to.have.status(200);
    expect(res.body).to.have.property("token");
  });

  it("should return an error for invalid credentials", async () => {
    const res = await request
      .execute(app)
      .post("/api/login")
      .send({ email: "testuser@example.com", password: "wrongpassword" });

    expect(res).to.have.status(400); // Corrected expected status
    expect(res.body).to.have.property("error");
  });
});

describe("Logout API", () => {
  let dbConnection;

  before(async () => {
    dbConnection = await pool.connect();
  });

  after(() => {
    if (dbConnection) dbConnection.release();
  });

  it("should log out a user", async () => {
    const res = await request
      .execute(app)
      .post("/api/logout")
      .set("Authorization", `Bearer ${token}`);

    expect(res).to.have.status(200);
    expect(res.body).to.have.property("message").eql("Logged out successfully");
  });

  it("should return an error if no user is logged in", async () => {
    const res = await request.execute(app).post("/api/logout");
    expect(res).to.have.status(404); // Corrected expected status
    expect(res.body).to.have.property("error").eql("No user logged in");
  });
});

describe("Signup API", () => {
  let dbConnection;

  before(async () => {
    dbConnection = await pool.connect();
  });

  after(() => {
    if (dbConnection) dbConnection.release();
  });

  afterEach(async () => {
    await pool.query("DELETE FROM users");
  });

  it("should sign up a user with valid information", async () => {
    const res = await request.execute(app).post("/api/register").send({
      username: "newuser",
      email: "newuser@example.com",
      password: "password123",
    });

    expect(res).to.have.status(201);
    expect(res.body)
      .to.have.property("message")
      .eql("User created successfully"); // Corrected expected message
  });

  it("should return an error if email is already taken", async () => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash("password123", saltRounds);
    await pool.query(
      `INSERT INTO users (username, email, password) VALUES ('existinguser', 'newuser@example.com', $1)`,
      [hashedPassword]
    );

    const res = await request.execute(app).post("/api/register").send({
      username: "newuser",
      email: "newuser@example.com",
      password: "password123",
    });

    expect(res).to.have.status(400);
    expect(res.body).to.have.property("error").eql("Email already in use");
  });
});
