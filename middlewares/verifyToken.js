const jwt = require("jsonwebtoken");
const { CustomError } = require("./error");

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;  // Token from cookies

    // If no token exists
    if (!token) {
        return next(new CustomError("You are not authenticated!", 401));
    }

    // Verifying the token
    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
        if (err) {
            // Check if the error is token expiration
            if (err.name === "TokenExpiredError") {
                return next(new CustomError("Token has expired!", 403));
            }
            // Other verification errors
            return next(new CustomError("Token is not valid!", 403));
        }

        // If the token is valid, attach the userId to the request object
        req.userId = data._id;
        
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = verifyToken;
