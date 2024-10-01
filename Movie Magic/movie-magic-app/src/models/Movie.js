import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    tittle: String,
    genre: String,
    director: String,
    year: String,
    rating: Number,
    description: String,
    img: String,
});

 const Movie = mongoose.model('Movie', movieSchema);

 export default Movie;
