import { json, Router } from 'express';
import movieService from '../services/movieService.js';

const router = Router();

// URL: movies/create
router.get('/create', (req, res) => {
    res.render('movies/create')
})

router.post('/create', async (req, res) => {
    const movieData = req.body;
    const loggedUser = req.user;
    await movieService.createMovie(movieData, loggedUser)
    res.redirect('/');
})

router.get('/:movieId/details', async (req, res) => {
    const loggedUser = req.user;
    const movieId = req.params.movieId;
    const movie = await movieService.findMovieByIdPopulated(movieId).lean();
    const isOwner = movieService.isOwner(loggedUser, movie);
    movie.owner = isOwner;
    res.render('movies/details', { movie })
})

router.get('/search', async (req, res) => {
    const query = req.query;
    const movies = await movieService.getFilteredMovies(query);

    res.render('home', { isSearch: true, movies, query });
})

router.get('/:movieId/edit', async (req, res) => {
    const id = req.params.movieId;
    const movie = await movieService.findMovieById(id).lean();
    res.render('movies/edit', { movie })
})

router.post('/:movieId/edit', async (req, res) => {
    const movieId = req.params.movieId;
    const movieInput = req.body;
    await movieService.updateMovie(movieId, movieInput)
    
    res.redirect(`/movies/${movieId}/details`);
    res.end();
})

router.get('/:movieId/delete', async (req, res) => {
    const movieId = req.params.movieId;
    await movieService.deleteMovie(movieId);
    res.redirect('/');
})

export default router;