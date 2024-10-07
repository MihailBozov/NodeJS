import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

function authMiddleware(req, res, next) {

    const token = req.cookies['auth'];

    if (!token) {
        return next()
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decodedToken);
        return next();

    } catch {

    }
}

export { authMiddleware }