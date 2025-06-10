import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ 'message': 'Authorization header is missing' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ 'message': 'Token is missing' });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ 'message': 'Invalid token' });
        }
        req.user = decoded; // Attach the decoded user info to the request object
        next(); // Call the next middleware or route handler
    });
}

export default verifyJWT;