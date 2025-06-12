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
const getAuthorPosts= async (authorId) => {
    return await prisma.post.findMany({
        where: { authorId },
    });
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
    return await prisma.post.findUnique({ where: { id: postId },include:{comments:true} });
}

const getPublishedPosts = async () => {
  return await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: {
          name: true,
          email: true,
        }
      }
    }
  });
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


export default {getAuthorPosts, createPost, publishPost, unPublishPost, deletePost, getPostById, getPublishedPosts, updatePostContent, updatePostTitle }