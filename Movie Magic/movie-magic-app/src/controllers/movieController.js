import { json, Router } from 'express';
import movieService from '../services/movieService.js';
import castService from '../services/castService.js';

const router = Router();

// URL: movies/create
router.get('/create', (req, res) => {
    res.render('movies/create')
})

router.post('/create', async (req, res) => {
    const movieData = req.body;
    const loggedUser = req.user;
    await movieService.create(movieData, loggedUser)


    res.redirect('/');
})

router.get('/:movieId/details', async (req, res) => {
    const movie = await movieService.findByIdPopulated(req.params.movieId).lean();
    res.render('movies/details', { movie })
})

router.get('/search', async (req, res) => {
    const query = req.query;
    const movies = await movieService.getFilteredMovies(query);

    res.render('home', { isSearch: true, movies, query });
})

router.get('/:movieId/edit', async (req, res) => {
    const id = req.params.movieId;
    const movie = await movieService.findById(id).lean()
    console.log(movie);
    
    res.render('movies/edit', { movie })
})



export default router;