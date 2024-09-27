import { json, Router } from 'express';
import movieService from '../services/movieService.js';

const router = Router();

// URL: movies/create
router.get('/create', (req, res) => {
    res.render('movies/create')
})

router.post('/create', async (req, res) => {
    const movieData = req.body;
    await movieService.create(movieData)
    
    
    res.redirect('/');
})

router.get('/:movieId/details', async (req, res) => {
    const id = req.params.movieId;
    const movie =  await movieService.getOne(id);
    movie.ratingView = movieService.getRatingViewData(movie.rating);
    res.render('movies/details', {movie})
})

router.get('/search', async (req, res) => {
   const query = req.query;
   console.log(query);
   const movies = await movieService.getFilteredMovies(query);
   
    
    res.render('home', {isSearch: true, movies});
})



export default router;