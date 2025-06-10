import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import HttpError from '../errors/HttpError.mjs';
import userModel from "../models/userModel.mjs";
dotenv.config();


const refreshToken = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) {
        throw new HttpError('No refresh token provided', 401); // Unauthorized
    }
    console.log('Cookies:', cookies.jwt);
    const refreshToken = cookies.jwt;
    const user = await userModel.getUserByRefreshToken(refreshToken);
    console.log('User:', user);
    if (!user) {
        throw new HttpError('forbidden', 403); // Forbidden
    }
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || user.id !== decoded.id) {
                throw new HttpError('Forbidden', 403); // Forbidden
            }
            const accessToken = jwt.sign({ "id": user.id, "type": user.type }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            res.status(200).json({ accessToken });
        }
    );

};

export default { refreshToken };