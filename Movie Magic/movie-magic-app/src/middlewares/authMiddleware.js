import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

function authMiddleware(req, res, next) {

    const token = req.cookies['auth'];

    if (!token) {
        return next()
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        
        const user = {
            _id: decodedToken._id,
            email: decodedToken.email
        }
        
        req.user = user;
        res.locals.user = user;
        
        return next();

    } catch {
        res.clearCookie('auth')
        res.redirect('/auth/login')
    }
}

function isAuthenticated(req, res, next) {
    if(!req.user) {
        return res.redirect('/auth/login');
    }
    return next();
}

export { authMiddleware, isAuthenticated}