import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    tittle: String, 
    genre: String,
    director: String,
    year: String,
    rating: String,
    description: String,
    img: String,
    casts: [{
        type: mongoose.Types.ObjectId,
        ref: 'Cast'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});

 const Movie = mongoose.model('Movie', movieSchema);

 export default Movie;
