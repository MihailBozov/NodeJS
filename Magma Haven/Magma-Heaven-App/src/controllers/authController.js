import { Router } from 'express';
import authService from '../services/authService.js';

const authController = Router();

authController.get('/register', (req, res) => {
    res.render('auth/register', { tittle: 'Register' })
})

authController.post('/register', async (req, res) => {
    const user = Object.assign({}, req.body);
    try {
        await authService.registerUser(user);
        res.redirect('/auth/login');
    } catch (err) {
        res.render('auth/register', { tittle: 'Register', username: user.username, email: user.email });
        console.error(err.message)
    }
})

authController.get('/login', (req, res) => {
    res.render('auth/login', { tittle: 'Login' })
});

authController.post('/login', async (req, res) => {
    const user = Object.assign({}, req.body);
    try {
        const token = await authService.loginUser(user);
        res.cookie('auth', token);
        res.redirect('/');
    } catch (err) {
        console.error(err.message);
        res.render('auth/login', { tittle: 'Login', email: user.email })
    }
})



export default authController;