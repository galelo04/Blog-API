import postController from '../controllers/postController.mjs'
import { Router } from "express";
const postRouter = Router();

postRouter.get('/published', postController.getPublishedPosts)
postRouter.post('/create', postController.createPost)
postRouter.patch('/publish', postController.publishPost)
postRouter.patch('/update/content:postId', postController.updatePostContent)
postRouter.patch('/update/title:postId', postController.updatePostTitle)

export default postRouter