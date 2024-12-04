// import * as chai from "chai";
// import { default as chaiHttp, request } from "chai-http";
// import app from "../index.js";
// import sinon from "sinon";
// import pool from "../database/db.js";
// import bcrypt from "bcrypt";

// chai.use(chaiHttp);
// const { expect } = chai;

// describe("Logout API", () => {
//   let dbConnection;

//   before(async () => {
//     dbConnection = await pool.connect();
//   });

//   after(() => {
//     if (dbConnection) dbConnection.release();
//   });

//   it("should log out a user", async () => {
//     const res = await request
//       .execute(app)
//       .post("/api/logout")
//       .set("Authorization", `Bearer ${yourValidToken}`); // Ensure token is passed
//     expect(res).to.have.status(200);
//     expect(res.body).to.have.property("message").eql("Logged out successfully");
//   });

//   it("should return an error if no user is logged in", async () => {
//     const res = await request.execute(app).post("/api/logout");
//     expect(res).to.have.status(400); // Corrected expected status
//     expect(res.body).to.have.property("error").eql("No user logged in");
//   });
// });
