import { AUTH_COOKIE_NAME } from '../constants.js';
import Volcano from '../models/Volcano.js';
import jwt from '../lib/jwt.js'
import dotenv from 'dotenv'

export async function authMiddleware(req, res, next) {
    const token = req.cookies[AUTH_COOKIE_NAME];
    if (!token) {
        return next();
    }

    // Validate token
    try {
        const decodedUser = await jwt.verify(token, process.env.JWT_SECRET);

        req.user = decodedUser;
        res.locals.user = decodedUser;
        res.locals.isAuthenticated = true;
        next();
    } catch (err) {
        res.clearCookie(AUTH_COOKIE_NAME);
        res.redirect('/auth/login');
    }
}

export function isAuthenticated(req, res, next) {
    if (!req.user) {
        return res.redirect('/auth/login')
    }

    next();
}

export function notAuthenticated(req, res, next) {
    if (req.user) {
        return res.redirect('/');
    }
    next();
}

export async function isVolcanoOwner(req, res, next) {
    const volcanoId = req.params?.id;
    const userId = req.user?._id;

    if (!volcanoId || !userId) {
        return res.redirect(`/volcanoes/${volcanoId}/details`)
    }

    const volcano = await Volcano.findById(volcanoId);
    const ownerId = volcano.owner.toString();

    if (userId === ownerId) {
        return res.redirect(`/volcanoes/${volcanoId}/details`)
    }
    next();
}

export async function isNotVolcanoOwner(req, res, next) {
    const volcanoId = req.params?.id;
    const userId = req.user?._id;
    
    if(!volcanoId, !userId) {
        return next();
    }
    
    const volcano = await Volcano.findById(volcanoId);
    const ownerId = volcano.owner?.toString()
    
    if(ownerId === userId) {
        return res.redirect(`volcanoes/${volcanoId}/details`);
    }
    
    next()
}