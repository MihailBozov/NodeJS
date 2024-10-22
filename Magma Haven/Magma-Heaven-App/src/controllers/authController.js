import { Router } from 'express';
import authService from '../services/authService.js';
import { getErrorMessage } from '../utils/errorUtil.js';

const authController = Router();

authController.get('/register', (req, res) => {
    res.render('auth/register', { tittle: 'Register' })
})

authController.post('/register', async (req, res) => {
    const user = Object.assign({}, req.body);
    try {
        const token = await authService.registerUser(user);
        res.cookie('auth', token, { httpOnly: true })
        res.redirect('/');
    } catch (err) {
        const error = getErrorMessage(err);
        res.render('auth/register', { tittle: 'Register', username: user.username, email: user.email, error });
    }
})

authController.get('/login', (req, res) => {
    res.render('auth/login', { tittle: 'Login' })
});

authController.post('/login', async (req, res) => {
    const user = Object.assign({}, req.body);
    try {
        const token = await authService.loginUser(user);
        res.cookie('auth', token, { httpOnly: true });
        res.redirect('/');
    } catch (err) {
        const error = getErrorMessage(err);
        res.render('auth/login', { tittle: 'Login', email: user.email, error })
    }
})

authController.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/')
})



export default authController;