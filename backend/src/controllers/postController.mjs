import postModel from "../models/postModel.mjs";
import asyncHandler from "express-async-handler"
import HttpError from "../errors/HttpError.mjs"
const getPublishedPosts = asyncHandler(async (req, res) => {
    const publishedposts = await postModel.getPublishedPosts();
    if (!publishedposts ) {
        throw new HttpError("No published posts found", 404);
    }
    res.status(200).json(publishedposts);
})
const getAuthorPosts = asyncHandler(async (req, res) => {
    const authorId = req.user.id;
    if (!authorId) throw new HttpError("Author ID is required", 400);
    const posts = await postModel.getAuthorPosts(authorId);
    if (!posts) {
        throw new HttpError("No posts found for this author", 404);
    }
    res.status(200).json(posts);
}
);
const createPost = asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    const authorId = req.user.id;
    if (!title || !content) throw new HttpError("Title and content are required", 400);
    const post = await postModel.createPost(title, content, authorId, false);
    res.status(201).json(post);
});

const publishPost = asyncHandler(async (req, res) => {
    const postId = req.params.id;
    if (!postId) throw new HttpError("post id is required", 400);
    const post = await postModel.publishPost(postId);
    if (!post) throw new HttpError("Post not Found", 404);
    res.status(200).json(post);
});

const unPublishPost = asyncHandler(async (req, res) => {
    const postId = req.params.id;
    if (!postId) throw new HttpError("post id is required", 400);
    const post = await postModel.unPublishPost(postId);
    if (!post) throw new HttpError("Post not Found", 404);
    res.status(200).json(post);
}
);

const updatePostContent = asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const {content} = req.body;
    if (!postId) throw new HttpError("post id is required", 400);
    const post = await postModel.updatePostContent(postId,content);
    if (!post) throw new HttpError("Post not Found", 404);
    res.status(200).json(post);
});

const updatePostTitle = asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const {title} = req.body;
    if (!postId) throw new HttpError("post id is required", 400);
    const post = await postModel.updatePostTitle(postId,title);
    if (!post) throw new HttpError("Post not Found", 404);
    res.status(200).json(post);
});

const deletePost = asyncHandler(async (req, res) => {
    const postId = req.params.id;
    if (!postId) throw new HttpError("post id is required", 400);
    const post = await postModel.deletePost(postId);
    if (!post) throw new HttpError("Post not Found", 404);
    res.status(200).json({ message: "Post deleted successfully" });
});
const getPostById = asyncHandler(async (req, res) => {
    const postId = req.params.id;
    if (!postId) throw new HttpError("post id is required", 400);
    const post = await postModel.getPostById(postId);
    if (!post) throw new HttpError("Post not Found", 404);
    res.status(200).json(post);
});
export default {getPostById, getAuthorPosts,getPublishedPosts, createPost, publishPost, updatePostContent, updatePostTitle, unPublishPost, deletePost }; 