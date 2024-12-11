import express from "express";
import AuthController from "../controllers/authController.js";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.delete("/delete", AuthController.deleteAccount);
router.post("/logout", AuthController.logout);
router.put('/resetPassword', AuthController.resetPassword);
router.post('/forgotpassword', AuthController.forgotPassword);
router.post('/resetpasswordtoken', AuthController.resetPasswordWithToken);
export default router;
