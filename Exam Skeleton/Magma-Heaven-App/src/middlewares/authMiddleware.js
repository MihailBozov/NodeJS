import { AUTH_COOKIE_NAME, JWT_SECRET } from '../constants.js';
import jwt from 'jsonwebtoken';

export async function authMiddleware(req, res, next) {
    const token = req.cookies[AUTH_COOKIE_NAME];
    if(!token) {
        return next();
    }
    
    try {
        const decodedUser = await jwt.verify(token, JWT_SECRET);

        req.user = decodedUser;
        res.locals.user = decodedUser;
        next();
    } catch(err) {
        res.clearCookie(AUTH_COOKIE_NAME);
        return redirect('/auth/login');
    }   
}


export function isAuthenticated(req, res, next) {
    if (!req.user) {
        return res.redirect('/auth/login')
    }

   return next();
}

export function isNotAuthenticated(req, res, next) {
    if (req.user) {
        return res.redirect('/');
    }
    
    return next();
}