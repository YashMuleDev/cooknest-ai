import jwt from "jsonwebtoken";

export const generateToken =(userId) => {
    return jwt.sign({ id: userId}, process.env.JWT_SECRET,{
        expiresIn: process.env.JET_EXPIRES_IN,
    });
};