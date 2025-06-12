import userModel from "../models/userModel.mjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new Error('Please fill all the fields', 400);
    }
    const user = await userModel.getUserByEmail(email);
    if (!user) {
        throw new Error('User not found', 404);
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new Error('Invalid credentials', 401);
    }
    const accessToken = jwt.sign({ "id": user.id, "type": user.type }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ "id": user.id, "type": user.type }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    await userModel.addRefreshToken(user.id, refreshToken);
    res.cookie('jwt', refreshToken, { httpOnly: true, secure:true,sameSite:"None",maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.status(200).json({ 'success': 'User logged in successfully', accessToken ,user: { id: user.id, name: user.name, email: user.email, type: user.type } });
})

const logoutUser = asyncHandler(async (req, res) => {

    const cookies = req.cookies
    if (!cookies?.jwt) {
        return res.sendStatus(204); // No content
    }
    const refreshToken = cookies.jwt;
    const user = await userModel.getUserByRefreshToken(refreshToken);
    if (!user) {
        res.clearCookie('jwt', { httpOnly: true, secure: true ,sameSite:"None"});
        return res.sendStatus(204); // No content
    }
    await userModel.deleteRefreshToken(user.id);
    res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: "None" });
    res.sendStatus(204); // No content
});


export default { loginUser, logoutUser };