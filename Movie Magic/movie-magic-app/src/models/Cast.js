import mongoose from "mongoose";

const castSchema = new mongoose.Schema({
    name: String,
    age: Number,
    born: String,
    imageUrl: String,
    movies: [{
        type: mongoose.Types.ObjectId,
        ref: 'Move'
    }]
});

const Cast = mongoose.model('Cast', castSchema);

export default Cast;