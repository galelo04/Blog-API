import postController from '../controllers/postController.mjs'
import { Router } from "express";
const postRouter = Router();

postRouter.get('/published', postController.getPublishedPosts)
postRouter.post('/create', postController.createPost)
postRouter.patch('/publish/:id', postController.publishPost)
postRouter.patch('/unpublish/:id', postController.unPublishPost)
postRouter.patch('/update/content/:id', postController.updatePostContent)
postRouter.patch('/update/title/:id', postController.updatePostTitle)
postRouter.delete('/delete', postController.deletePost)

export default postRouter