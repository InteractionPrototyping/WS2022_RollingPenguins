import jwt from 'jsonwebtoken';
/*
    Middleware that extracts the Users JWT Token from the header,
    verifies if it is valid and stores it to res.locals.jwt
*/
const extractJWT = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Get token from header
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET || '', (error, decoded) => {
            // Verify
            if (error) {
                // Return error Message if validation is unsuccessful
                return res.status(401).json({
                    message: error.message,
                    error: error
                });
            }
            else {
                // Store token and go to next middleware
                res.locals.jwt = decoded;
                next();
            }
        });
    }
    else {
        // If no token is passed the User is unauthorized
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
};
export default extractJWT;
