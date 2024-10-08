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
    try{
        const result = await userService.register(user)
        
    }catch(err) {
       console.log(err.message);
       return res.redirect('/register');
     
    }

    res.redirect('/auth/login');
});

router.get('/logout', (req, res) => {

    res.clearCookie('auth');
    res.redirect('/');
})

export default router;