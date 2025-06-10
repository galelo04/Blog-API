import { Router } from "express";
import postRouter from "./postRouter.mjs";
import commentRouter from "./commentRouter.mjs";
const apiRouter = Router();

apiRouter.use('/post', postRouter)
apiRouter.use('/comment', commentRouter)
export default apiRouter