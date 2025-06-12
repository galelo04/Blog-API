
import prisma from "../config/db.mjs";

const createComment = async (content, basicUserId, postId) => {
    return await prisma.comment.create({
        data: {
            content,
            author: {
                connect: { id: basicUserId },
            },
            post: {
                connect: { id: postId }
            }
        }

    })
}

const getCommentsByPostId = async (postId) => {
    return await prisma.comment.findMany({ where: { postId }, include: { author:true } })
}

const deleteComment = async (commentId) => {
    return await prisma.comment.delete({ where: { id: commentId } })
}

export default { createComment, deleteComment, getCommentsByPostId }