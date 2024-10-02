import { Router } from 'express';
import castService from '../services/castService.js';
import movieService from '../services/movieService.js';

const router = Router();

router.get('/casts/create', (req, res) => {
    res.render('cast/cast-create');
})

router.post('/casts/create', (req, res) => {
    const form = req.body;
    castService.create(form);
    res.redirect('/');
})

router.get('/movies/:id/attach', async (req, res) => {
    const id = req.params.id;
    const movie = await movieService.findById(id);
    const casts = await castService.getAllCasts();

    res.render('cast/cast-attach', { movie, casts });
})

router.post('/movies/:id/attach', (req, res) => {
    movieService.attach(req.params.id, req.body.cast);
    res.redirect('/');
})



export default router;