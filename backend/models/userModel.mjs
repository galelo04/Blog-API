import prisma from "../config/db.mjs";
import bycrpt from "bcryptjs"

const regeisterUser = async (email,password,type,name) => {
    const hashedPass =await  bcrypt.hash(password,10);
    return await prisma.user.create({data:
        {
            email,
            name,
            password:hashedPass,
            type
        }
    })
}

const getUserById = async (id) => {
    return await prisma.user.findUnique({where:id});
};

const getUserByEmail = async (email) => {
    return await prisma.user.findUnique({where:email});
};

export default {regeisterUser,getUserByEmail,getUserById}