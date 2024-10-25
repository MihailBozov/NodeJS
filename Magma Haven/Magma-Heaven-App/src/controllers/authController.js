import { Router } from 'express';
import authService from '../services/authService.js';
import { getErrorMessage } from '../utils/errorUtil.js';
import { AUTH_COOKIE_NAME } from '../constants.js';
import { isAuthenticated, notAuthenticated } from '../middlewares/authMiddleware.js';

const authController = Router();

authController.get('/register', notAuthenticated, (req, res) => {
    res.render('auth/register', { tittle: 'Register' })
})

authController.post('/register', notAuthenticated, async (req, res) => {
    const user = Object.assign({}, req.body);
    try {
        const token = await authService.registerUser(user);
        res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true })
        res.redirect('/');
    } catch (err) {
        const error = getErrorMessage(err);
        res.render('auth/register', { tittle: 'Register', username: user.username, email: user.email, error });
    }
})

authController.get('/login', notAuthenticated, (req, res) => {
    res.render('auth/login', { tittle: 'Login' })
});

authController.post('/login', notAuthenticated, async (req, res) => {
    const user = Object.assign({}, req.body);
    try {
        const token = await authService.loginUser(user);
        res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true });
        res.redirect('/');
    } catch (err) {
        const error = getErrorMessage(err);
        res.render('auth/login', { tittle: 'Login', email: user.email, error })
    }
})

authController.get('/logout', isAuthenticated, isAuthenticated, (req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME);
    res.redirect('/')
})



export default authController;