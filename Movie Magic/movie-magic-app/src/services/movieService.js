import Movie from '../models/Movie.js';
import castService from './castService.js';

const getAll = () => Movie.find().lean();
const create = (movie) => Movie.create(movie);
const findById = (id) => Movie.findById(id).lean();

const findByIdPopulated = (id) => Movie.findById(id).populate('casts');
const attach = async (movieId, castId) => {
    const movie = await Movie.findById(movieId);
    movie.casts.push(castId);
    await movie.save();
}


 function getFilteredMovies(movieInput) {
    let query = {};
    movieInput.tittle ? query.tittle = { $regex: movieInput.tittle, $options: 'i' } : null;
    movieInput.genre ? query.genre = { $regex: movieInput.genre, $options: 'i' } : null;
    movieInput.year ? query.year = movieInput.year : null;

    return Movie.find(query).lean();
}

function getRatingViewData(rating) {
    if (isNaN(rating) || !rating) {
        return 'n/a'
    }
    return '&#x2605; '.repeat(Math.round(rating / 2))
}


export default { getAll, create, findById, getRatingViewData, getFilteredMovies, attach, findByIdPopulated };