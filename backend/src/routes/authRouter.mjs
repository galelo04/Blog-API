import { Router } from "express";
import authController from "../controllers/authController.mjs";
import registerController from "../controllers/registerController.mjs";
const authRouter = Router();

authRouter.post('/login', authController.loginUser);
authRouter.post('/register', registerController.registerUser);
authRouter.get('/logout', authController.logoutUser);


export default authRouter;