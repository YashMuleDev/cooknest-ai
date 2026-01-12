import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    let token;

    // Read token from Authorization header
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ){
        try{
            token = req.headers.authorization.split(" ")[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Fetch user & attach to request
            req.user = await User.findById(decoded.id).select("-password");

            return next();

        }catch(error){
            return res.status(401).json({message: "Invalid token"});
        }
    }

    if(!token){
        return res.status(401).json({message:"Not Authorized, no token"});
    }
};

export const adminOnly =(req, res, next) =>{
    if(req.user && req.user.role ==="admin"){
        next();
    }else{
        res.status(403).json({message:"Admin access only"});
    }
};