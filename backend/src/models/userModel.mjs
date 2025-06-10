import prisma from "../config/db.mjs";
import bcrypt from "bcryptjs"

const regeisterUser = async (email, password, type, name) => {
    const hashedPass = await bcrypt.hash(password, 10);
    return await prisma.user.create({
        data:
        {
            email,
            name,
            password: hashedPass,
            type
        }
    })
}
const addRefreshToken = async (userId, refreshToken) => {
    return await prisma.user.update({
        where: { id: userId },
        data: { refreshToken }
    });
};
const getUserByRefreshToken = async (refreshToken) => {
    return await prisma.user.findUnique({
        where: {
            refreshToken
        }
    })
}
const getUserById = async (id) => {
    return await prisma.user.findUnique({ where: { id } });
};

const getUserByEmail = async (email) => {
    return await prisma.user.findUnique({ where: { email } });
};
const deleteRefreshToken = async (userId) => {
    return await prisma.user.update({
        where: { id: userId },
        data: { refreshToken: null }
    });
};
export default { regeisterUser, getUserByEmail, getUserById, addRefreshToken, getUserByRefreshToken, deleteRefreshToken };