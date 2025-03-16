import prisma from "../config/db.mjs";

const createComment = async (content , authorId , postId) => {
    return await prisma.comment.create({data:{
        content,
        authorId,
        postId
    }})
}

const deleteComment = async (commentId) => {
    return await prisma.comment.delete({where:{id:commentId}})
}

export default {createComment,deleteComment}