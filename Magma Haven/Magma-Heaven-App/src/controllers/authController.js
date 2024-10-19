import { Router } from "express";

const authController = Router();

authController.get('/register', (req, res) => {
    res.render('auth/register', {tittle: 'Register'})
})

authController.get('/login', (req, res) => {
    res.render('auth/login', {tittle: 'Login'})
})

export default authController;