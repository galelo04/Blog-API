import { Router } from "express";
import postRouter from "./postRouter.mjs";
const apiRouter = Router();

apiRouter.use('/post', postRouter)
export default apiRouter