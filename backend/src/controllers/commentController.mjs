import HttpError from "../errors/HttpError.mjs";
import commentModel from "../models/commentModel.mjs";
import asyncHandler from "express-async-handler";

const createComment = asyncHandler(async (req, res) => {
    const { content } = req.body;
    const basicUserId = req.user.id;
    const postId = req.params.postId;

    if (!content || !basicUserId || !postId) {
        throw new HttpError("Content, user ID, and post ID are required", 400);
    }

    const comment = await commentModel.createComment(content, basicUserId, postId);
    res.status(201).json(comment);
}
);
const deleteComment = asyncHandler(async (req, res) => {
    const commentId = req.params.id;

    if (!commentId) {
        throw new HttpError("Comment ID is required", 400);
    }

    const deletedComment = await commentModel.deleteComment(commentId);
    if (!deletedComment) {
        throw new HttpError("Comment not found", 404);
    }

    res.status(200).json({ message: "Comment deleted successfully" });
});

const getCommentsPost = asyncHandler(async (req, res) => {
    const postId = req.params.postId;
    if (!postId) throw new HttpError("Post id is required", 404);
    const comments = await commentModel.getCommentsByPostId(postId);
    if (!comments || comments.length === 0) throw new HttpError("No comments Found", 404);
    res.status(200).json(comments);
})
export default { createComment, deleteComment, getCommentsPost };