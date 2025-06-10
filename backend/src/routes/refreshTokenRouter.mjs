import { Router } from "express";
import refreshTokenController from "../controllers/refreshTokenController.mjs";
const refreshTokenRouter = Router();

refreshTokenRouter.get('/', refreshTokenController.refreshToken);
export default refreshTokenRouter