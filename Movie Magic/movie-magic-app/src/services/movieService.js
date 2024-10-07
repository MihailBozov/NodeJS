import Movie from '../models/Movie.js';
import User from '../models/User.js';
import castService from './castService.js';

const getAll = () => Movie.find().lean();
const create = async (movie, loggedUser) => Movie.create({ ...movie, owner: loggedUser })
const findById = (id) => Movie.findById(id).lean();



const findByIdPopulated = (id) => Movie.findById(id).populate('casts');
const attach = async (movieId, castId) => {
    const movie = await Movie.findById(movieId);
    movie.casts.push(castId);
    await movie.save();
}


async function getFilteredMovies(movieInput) {
    const movies = Movie.find();

    movieInput.tittle ? movies.find({ tittle: { $regex: movieInput.tittle, $options: 'i' } }) : null;
    movieInput.genre ? movies.where('genre').equals(movieInput.genre) : null;
    movieInput.year ? movies.where('year').equals(movieInput.year) : null;

    return movies.lean();
}

export default { getAll, create, findById, getFilteredMovies, attach, findByIdPopulated };