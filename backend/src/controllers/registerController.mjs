import userModel from "../models/userModel.mjs";
import asyncHandler from "express-async-handler";
import HttpError from "../errors/HttpError.mjs";

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, type } = req.body;
    if (!name || !password || !email || !type) {
        throw new HttpError('Please fill all the fields', 400);
    }
    const duplicateUser = await userModel.getUserByEmail(email);
    if (duplicateUser) {
        throw new HttpError('User already exists', 409);
    }
    const user = await userModel.regeisterUser(email, password, type, name);
    res.status(201).json({ 'message': 'User registered successfully', user: { id: user.id, email: user.email, name: user.name, type: user.type } });
});



export default { registerUser }