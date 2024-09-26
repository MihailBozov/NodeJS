import movieData from '../data/movieData.js'


function getAll() {
    return movieData.getMovies();
}

export default { getAll };