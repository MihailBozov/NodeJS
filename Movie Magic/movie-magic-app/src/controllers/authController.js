import { Router } from 'express';
import userService from '../services/userService.js'

const router = Router();


router.get('/login', (req, res) => {   
    res.render('auth/login')
});


router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const user = req.body;
    const result = await userService.register(user)

    res.redirect('/auth/login');
});



export default router;