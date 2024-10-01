import Movie from '../models/Movie.js';
import movieData from '../data/movieData.js'

const getAll = () => Movie.find().lean();

const create = (movie) => Movie.create(movie);

const getOne = (id) => Movie.findById(id).lean();

async function getFilteredMovies(movieInput) {
    
    let query = {};
    
    if(movieInput.tittle) {
        query.tittle = {$regex: movieInput.tittle, $options: 'i'}
    }
    if(movieInput.genre) {
        query.genre = {$regex: movieInput.genre, $options: 'i'}
    }
    if(movieInput.year) {
        // query.year = movieInput.year;
    }
    
    
    let movies = await Movie.find({ query }).lean();

    // if (movieInput.tittle) {
    //     movies = movies.filter(movie => movie.tittle.toLowerCase().includes(movieInput.tittle.toLowerCase()));
    // }
    
    // if(movieInput.genre) {
    //     movies = movies.filter(movie => movie.genre.toLowerCase() === movieInput.genre.toLowerCase());
    // }
    
    // if(movieInput.year) {
    //     movies = movies.filter(movie => movie.year === movieInput.year);
    // }
    return movies;
}

function getRatingViewData(rating) {
    if (isNaN(rating)) {
        return 'n/a'
    }
    return '&#x2605; '.repeat(Math.round(rating / 2))
}


export default { getAll, create, getOne, getRatingViewData, getFilteredMovies };