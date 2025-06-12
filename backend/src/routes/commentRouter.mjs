import commentController from "../controllers/commentController.mjs";

import { Router } from "express";
const commentRouter = Router();
commentRouter.get('/:postId', commentController.getCommentsPost);
commentRouter.post('/:postId', commentController.createComment);
commentRouter.delete('/:id', commentController.deleteComment);
export default commentRouter;