import movieData from '../data/movieData.js';
import uniqid from 'uniqid';

const getAll = () => movieData.getAll();

const create = async (movie) => {
    movie.id = uniqid();
    return await movieData.create(movie);
}

const getOne = async (id) => {
    const movies = await movieData.getAll();
    const resultMovie = movies.find(movie => movie.id == id);
    return resultMovie;
}

async function getFilteredMovies(movieInput) {
    let movies = await movieData.getAll();
    
    if (movieInput.tittle) {
        movies = movies.filter(movie => movie.tittle.toLowerCase().includes(movieInput.tittle.toLowerCase()));
    }
    
    if(movieInput.genre) {
        movies = movies.filter(movie => movie.genre.toLowerCase() === movieInput.genre.toLowerCase());
    }
    
    if(movieInput.year) {
        movies = movies.filter(movie => movie.year === movieInput.year);
    }
    return movies;
}

function getRatingViewData(rating) {
    if (isNaN(rating)) {
        return 'n/a'
    }
    return '&#x2605; '.repeat(Math.round(rating / 2))
}


export default { getAll, create, getOne, getRatingViewData, getFilteredMovies };