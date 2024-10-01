import { Router } from 'express';
import castService from '../services/castService.js';

const router = Router();

router.get('/casts/create', (req, res) => {
    res.render('cast/cast-create');
})

router.post('/casts/create', (req, res) => {
    const form = req.body;
    castService.create(form);
    res.redirect('/');
})

export default router;
