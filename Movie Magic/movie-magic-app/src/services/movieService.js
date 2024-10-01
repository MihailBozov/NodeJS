import Movie from '../models/Movie.js';

const getAll = () => Movie.find().lean();

const create = (movie) => Movie.create(movie);

const getOne = (id) => Movie.findById(id).lean();

 function getFilteredMovies(movieInput) {

    let query = {};
    movieInput.tittle ? query.tittle = { $regex: movieInput.tittle, $options: 'i' } : null;
    movieInput.genre ? query.genre = { $regex: movieInput.genre, $options: 'i' } : null;
    movieInput.year ? query.year = movieInput.year : null;

    return Movie.find(query).lean();
}

function getRatingViewData(rating) {
    if (isNaN(rating)) {
        return 'n/a'
    }
    return '&#x2605; '.repeat(Math.round(rating / 2))
}


export default { getAll, create, getOne, getRatingViewData, getFilteredMovies };