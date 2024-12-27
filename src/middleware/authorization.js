const statusCode = require("http-status-codes");
const { HTTPError } = require("../utils/response");

const authorization = (roles) => {
    return (req, res, next) => {
        try {
            if (!req.user) {
                const error = new HTTPError("User is not authorized", statusCode.UNAUTHORIZED);
                console.error(`Authorization failed: ${error.message}`);
                return res.status(statusCode.UNAUTHORIZED).json(error);
            }
            if (!roles.includes(req.user.role)) {
                const error = new HTTPError(`Access is denied for role: ${req.user.role}`, statusCode.FORBIDDEN);
                console.error(`Authorization failed: ${error.message}`);
                return res.status(statusCode.FORBIDDEN).json(error);
            }
            next();
        } catch (err) {
            console.error("Unexpected error in authorization middleware:", err.message);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json(
                new HTTPError("An unexpected error occurred", statusCode.INTERNAL_SERVER_ERROR)
            );
        }
    };
};
module.exports = authorization;
