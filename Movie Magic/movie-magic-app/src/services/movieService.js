import movieData from '../data/movieData.js';
import uniqid from 'uniqid';

const getAll = () =>  movieData.getAll();

const create = async (movie) => {
    movie.id = uniqid();
    return await movieData.create(movie);
} 

export default { getAll, create };