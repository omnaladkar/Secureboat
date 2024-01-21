import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  try {
    let token;

    // Read JWT from the 'jwt' cookie
    token = req.cookies.jwt;
    console.log('Token:', token);

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded:', decoded);

      req.user = await User.findById(decoded.userId).select("-password");
      console.log('User:', req.user);

      next();
    } else {
      res.status(401);
      throw new Error("Not authorized, no token.");
    }
  } catch (error) {
    console.error('Authentication Error:', error.message);
    res.status(401).send('Not authorized, token failed.');
  }
});

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as an admin.");
  }
};

export { authenticate, authorizeAdmin };
