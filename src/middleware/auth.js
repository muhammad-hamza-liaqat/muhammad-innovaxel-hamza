const jwt = require("jsonwebtoken");
const statusCode = require("http-status-codes");
const { HTTPError } = require("../utils/response")
const User = require("../models/user.model")

const auth = async (req, res, next) => {
    let error, response;
    const token = req.headers["authorization"]
    if (!token) {
        error = new HTTPError("Access Token is required", statusCode.UNAUTHORIZED)
        return res.status(statusCode.UNAUTHORIZED).json(error)
    }
    try {
        const secretKey = process.env.JWT_SECRET_KEY;
        const decoded = jwt.verify(token, secretKey);
        const user = await User.findById(decoded.id);
        if (!user || !user.isActive) {
            error = new HTTPError("user does not exist or is inactive", statusCode.UNAUTHORIZED)
            return res.status(statusCode.UNAUTHORIZED).json(response)
        }
        req.user = user
        next();
    } catch (error) {
        console.error("error occured in auth middleware");
        error = new HTTPError("Invalid or Expired Token", statusCode.FORBIDDEN)
        return res.status(statusCode.FORBIDDEN).json(error)
    }
}
module.exports = auth