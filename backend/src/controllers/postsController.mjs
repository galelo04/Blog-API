import postModel from "../models/postModel.mjs";
import asyncHandler from "express-async-handler"
import HttpError from "../errors/HttpError.mjs"
const getPublishedPosts = asyncHandler(async (req, res) => {
    const publishedposts = postModel.getPublishedPosts();
    if (!publishedposts) throw new HttpError("No published posts found", 404);
    res.status(200).json(publishedposts);
})

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

const updatePostContent = asyncHandler(async (req, res) => {
    const postId = req.params.id;
    if (!postId) throw new HttpError("post id is required", 400);
    const post = await postModel.updatePostContent(postId);
    if (!post) throw new HttpError("Post not Found", 404);
    res.status(200).json(post);
});

const updatePostTitle = asyncHandler(async (req, res) => {
    const postId = req.params.id;
    if (!postId) throw new HttpError("post id is required", 400);
    const post = await postModel.updatePostTitle(postId);
    if (!post) throw new HttpError("Post not Found", 404);
    res.status(200).json(post);
});

export { getPublishedPosts, createPost, publishPost, updatePostContent, updatePostTitle };