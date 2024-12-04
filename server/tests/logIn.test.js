// import * as chai from "chai";
// import { default as chaiHttp, request } from "chai-http";
// import app from "../index.js";
// import sinon from "sinon";
// import pool from "../database/db.js";
// import bcrypt from "bcrypt";

// chai.use(chaiHttp);
// const { expect } = chai;

// describe("Login API", () => {
//   let dbConnection;

//   before(async () => {
//     dbConnection = await pool.connect();
//   });

//   after(() => {
//     if (dbConnection) dbConnection.release();
//   });

//   beforeEach(async () => {
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash("password123", saltRounds);
//     await pool.query(
//       `INSERT INTO users (username, email, password) VALUES ('testuser', 'testuser@example.com', $1)`,
//       [hashedPassword]
//     );
//   });

//   afterEach(async () => {
//     await pool.query("DELETE FROM users");
//   });

//   it("should log in a user with valid credentials", async () => {
//     const res = await request
//       .execute(app)
//       .post("/api/login")
//       .send({ email: "testuser@example.com", password: "password123" });

//     expect(res).to.have.status(200);
//     expect(res.body).to.have.property("token");
//   });

//   it("should return an error for invalid credentials", async () => {
//     const res = await request
//       .execute(app)
//       .post("/api/login")
//       .send({ email: "testuser@example.com", password: "wrongpassword" });

//     expect(res).to.have.status(401); // Corrected expected status
//     expect(res.body).to.have.property("error");
//   });
// });
