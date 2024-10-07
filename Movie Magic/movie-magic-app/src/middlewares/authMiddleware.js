import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

function authMiddleware(req, res, next) {

    const token = req.cookies['auth'];

    if (!token) {
        return next()
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        return next();

    } catch {
        res.clearCookie('auth')
        res.redirect('/auth/login')
    }
}

export { authMiddleware }