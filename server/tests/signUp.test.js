// import * as chai from "chai";
// import { default as chaiHttp, request } from "chai-http";
// import app from "../index.js";
// import sinon from "sinon";
// import pool from "../database/db.js";
// import bcrypt from "bcrypt";

// chai.use(chaiHttp);
// const { expect } = chai;

// describe("Signup API", () => {
//   let dbConnection;

//   before(async () => {
//     dbConnection = await pool.connect();
//   });

//   after(() => {
//     if (dbConnection) dbConnection.release();
//   });

//   afterEach(async () => {
//     await pool.query("DELETE FROM users");
//   });

//   it("should sign up a user with valid information", async () => {
//     const res = await request.execute(app).post("/api/register").send({
//       username: "newuser",
//       email: "newuser@example.com",
//       password: "password123",
//     });

//     expect(res).to.have.status(201);
//     expect(res.body)
//       .to.have.property("message")
//       .eql("User created successfully"); // Corrected expected message
//   });

//   it("should return an error if email is already taken", async () => {
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash("password123", saltRounds);
//     await pool.query(
//       `INSERT INTO users (username, email, password) VALUES ('existinguser', 'newuser@example.com', $1)`,
//       [hashedPassword]
//     );

//     const res = await request.execute(app).post("/api/register").send({
//       username: "newuser",
//       email: "newuser@example.com",
//       password: "password123",
//     });

//     expect(res).to.have.status(400);
//     expect(res.body).to.have.property("error").eql("Email already in use");
//   });
// });
