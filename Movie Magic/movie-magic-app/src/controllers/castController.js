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
    const movie = await movieService.findMovieById(id);
    const casts = await castService.getAllFilteredCasts(movie.casts).lean();

    res.render('cast/cast-attach', { movie, casts });
})

router.post('/movies/:id/attach', async (req, res) => {
    const id = req.params.id;
    const cast = req.body.cast;
    await movieService.attach(id, cast);
    res.redirect(`/movies/${id}/details`);
})



export default router;
