import movieData from '../data/movieData.js';
import uniqid from 'uniqid';

const getAll = () =>  movieData.getAll();

const create = async (movie) => {
    movie.id = uniqid();
    return await movieData.create(movie);
} 

const getOne = async (id) => {
    const movies = await movieData.getAll();
    const resultMovie = movies.find(movie => movie.id == id);
    return resultMovie;
}

export default { getAll, create, getOne };