import prisma from "../config/db.mjs";

const createPost = async (title, content, authorId, published) => {
    return await prisma.post.create({
        data: {
            title,
            content,
            published,
            authorId
        }
    })
}

const publishPost = async (postId) => {
    return await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            published: true
        },
    })
}

const unPublishPost = async (postId) => {
    return await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            published: false
        },
    })
}

const getPostById = async (postId) => {
    return await prisma.post.findUnique({ where: { id: postId }, include: { author, comments } });
}

const getPublishedPosts = async () => {
    return await prisma.post.findMany({ where: { published: true }, include: { author } })
}


const updatePostTitle = async (postId, title) => {
    return await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            title
        },
    })
}
const updatePostContent = async (postId, content) => {
    return await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            content
        },
    })
}
const deletePost = async (postId) => {
    return await prisma.post.delete({ where: { id: postId } });
}

export default { createPost, publishPost, unPublishPost, deletePost, getPostById, getPublishedPosts, updatePostContent, updatePostTitle }