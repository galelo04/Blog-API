import prisma from "../config/db.mjs";

const createPost = async (title,content,authorId,published) => {
    return await prisma.post.create({data:{
        title,
        content,
        published,
        authorId
    }})    
}

const publishPost = async (postId) => {
    return await prisma.post.update({where:{id:postId}},{data:{published:true}});
}

const unPublishPost = async (postId) => {
    return await prisma.post.update({where:{id:postId}},{data:{published:false}});
} 

const deletePost = async (postId) => {
    return await prisma.post.delete({where:{id:postId}});
}

export default {createPost,publishPost,unPublishPost,deletePost}