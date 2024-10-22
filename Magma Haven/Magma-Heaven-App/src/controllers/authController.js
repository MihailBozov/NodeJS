import { Router } from 'express';
import authService from '../services/authService.js'

const authController = Router();

authController.get('/register', (req, res) => {
    res.render('auth/register', {tittle: 'Register'})
})

authController.get('/login', (req, res) => {
    res.render('auth/login', {tittle: 'Login'})
});

authController.post('/register',async (req, res) => {
    const user = Object.assign({}, req.body);
    try {
        await authService.registerUser(user);
        res.redirect('/auth/login');
    } catch(err) {
        res.redirect('/auth/register', user.username, user.password);
    }
})



export default authController;