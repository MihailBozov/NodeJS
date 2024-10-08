import Movie from '../models/Movie.js';

const createMovie = async (movie, loggedUser) => await Movie.create({ ...movie, owner: loggedUser });
const updateMovie = async (movieId, movieInput) => await Movie.findByIdAndUpdate(movieId, movieInput);
const deleteMovie = async (movieId) => await Movie.findByIdAndDelete(movieId);

const findMovieById = (id) => Movie.findById(id).lean();
const findMovieByIdPopulated = (id) => Movie.findById(id).populate('casts');
const findAllMovies = () => Movie.find().lean();


const isOwner = (user, movie) => movie.owner?.toString() === user?._id;


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


export default { findAllMovies, createMovie, findMovieById, getFilteredMovies, attach, findMovieByIdPopulated, isOwner, updateMovie, deleteMovie };