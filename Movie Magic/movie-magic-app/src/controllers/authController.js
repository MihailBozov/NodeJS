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
    
    console.log(' Does the user exist1 ?:', await userService.exists(user))
    const result = await userService.saveUser(user)
    
    console.log('user:', result);
    console.log(' Does the user exist2 ?:', await userService.exists(user))
    
    res.redirect('/auth/login');
});



export default router;