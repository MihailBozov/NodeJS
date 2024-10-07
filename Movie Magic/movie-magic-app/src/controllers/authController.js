import { Router } from 'express';
import userService from '../services/userService.js'
import cookieParser from 'cookie-parser';

const router = Router();


router.get('/login', (req, res) => {
    res.render('auth/login')
});

router.post('/login', async (req, res) => {
    const user = req.body;
    const token = await userService.login(user);

    if (!token) {
        console.log('Invalid username or password!');
        res.redirect('/auth/login');
        return;
    }
    
    res.cookie('auth', token, { httpOnly: true });
    res.redirect('/');
})


router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const user = req.body;
    const result = await userService.register(user)

    res.redirect('/auth/login');
});



export default router;