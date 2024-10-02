import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    tittle: {
        type: String, 
        required: true
    },
    genre: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true
    },
    year: {
        type: String, 
        required: true,
        min: 1900,
        max: 2025,
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    description: {
        type: String,
        required: true,
        maxLength: 1000,
    },
    img: {
        type: String,
        required: true,
    },
    casts: [{
        type: mongoose.Types.ObjectId,
        ref: 'Cast'
    }]
});

 const Movie = mongoose.model('Movie', movieSchema);

 export default Movie;
