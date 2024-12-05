import * as chai from "chai";
import { default as chaiHttp, request } from "chai-http";
import app from "../index.js";
import pool from "../database/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

chai.use(chaiHttp);
const { expect } = chai;

// describe("Delete Account API", () => {
//   let dbConnection;
//   let userId;
//   let token;

//   before(async () => {
//     dbConnection = await pool.connect();
//     const hashedPassword = await bcrypt.hash("password123", 10);
//     const userResult = await pool.query(
//       `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id`,
//       ["testuser", "testuser@example.com", hashedPassword]
//     );
//     userId = userResult.rows[0].id;

//     token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
//       expiresIn: "1h",
//     });
//   });

//   after(() => {
//     if (dbConnection) dbConnection.release();
//   });

//   afterEach(async () => {
//     await pool.query("DELETE FROM users");
//   });

//   it("should delete a user account successfully", async () => {
//     const res = await request
//       .execute(app)
//       .delete("/api/delete")
//       .set("Authorization", `Bearer ${token}`);

//     expect(res).to.have.status(200);
//     expect(res.body)
//       .to.have.property("message")
//       .eql("Account deleted successfully, including all related data");
//   });

//   it("should return an error if user does not exist", async () => {
//     const nonExistentToken = jwt.sign(
//       { userId: 999 },
//       process.env.JWT_SECRET_KEY,
//       { expiresIn: "1h" }
//     );

//     const res = await request
//       .execute(app)
//       .delete("/api/delete")
//       .set("Authorization", `Bearer ${nonExistentToken}`);

//     expect(res).to.have.status(404);
//     expect(res.body).to.have.property("message").eql("User not found");
//   });
// });

// describe("Login API", () => {
//   let dbConnection;
//   let token;

//   before(async () => {
//     dbConnection = await pool.connect();
//     const hashedPassword = await bcrypt.hash("password123", 10);
//     await pool.query(
//       `INSERT INTO users (username, email, password) VALUES ($1, $2, $3)`,
//       ["testuser", "testuser@example.com", hashedPassword]
//     );
//   });

//   after(() => {
//     if (dbConnection) dbConnection.release();
//   });

//   afterEach(async () => {
//     await pool.query("DELETE FROM users");
//   });

//   it("should login successfully with valid credentials", async () => {
//     const res = await request
//       .execute(app)
//       .post("/api/login")
//       .send({ email: "testuser@example.com", password: "password123" });

//     expect(res).to.have.status(200);
//     expect(res.body).to.have.property("message").eql("Login successful");
//     expect(res.body).to.have.property("token");
//   });

//   it("should return an error with invalid credentials", async () => {
//     const res = await request
//       .execute(app)
//       .post("/api/login")
//       .send({ email: "testuser@example.com", password: "wrongpassword" });

//     expect(res).to.have.status(400);
//     expect(res.body).to.have.property("message").eql("Invalid credentials");
//   });

//   it("should return an error for non-existent user", async () => {
//     const res = await request
//       .execute(app)
//       .post("/api/login")
//       .send({ email: "nonexistent@example.com", password: "password123" });

//     expect(res).to.have.status(400);
//     expect(res.body).to.have.property("message").eql("Invalid credentials");
//   });
// });

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

  it("should signup successfully with valid data", async () => {
    const res = await request.execute(app).post("/api/register").send({
      username: "newuser",
      email: "newuser@example.com",
      password: "password123",
    });

    expect(res).to.have.status(201);
    expect(res.body)
      .to.have.property("message")
      .eql("User registered successfully");
  });

  it("should return an error if email is already taken", async () => {
    const hashedPassword = await bcrypt.hash("password123", 10);
    await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
      ["existinguser", "existinguser@example.com", hashedPassword]
    );

    const res = await request.execute(app).post("/api/register").send({
      username: "newuser",
      email: "existinguser@example.com",
      password: "password123",
    });

    expect(res).to.have.status(400);
    expect(res.body).to.have.property("message").eql("User already exists");
  });
});

// describe("Logout API", () => {
//   let token;

//   // 在每个测试之前生成 token
//   before(async () => {
//     // 假设你已经正确的创建了一个用户并生成了 token
//     token = jwt.sign({ userId: 1 }, process.env.JWT_SECRET_KEY, {
//       expiresIn: "1h",
//     });
//   });

//   it("should logout successfully with valid token", async () => {
//     const res = await request
//       .execute(app)
//       .post("/api/logout")
//       .set("Authorization", `Bearer ${token}`); // 使用有效的 token 进行请求

//     expect(res).to.have.status(200); // 验证返回状态是 200
//     expect(res.body).to.have.property("message").eql("Logout successful"); // 验证返回的消息
//   });

//   it("should return an error if no token is provided", async () => {
//     const res = await request.execute(app).post("/api/logout");

//     expect(res).to.have.status(404);
//   });
// });
