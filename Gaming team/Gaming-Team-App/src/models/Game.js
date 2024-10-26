import { Schema, model, Types } from "mongoose";

const gameSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name is required'],
        minLength: [1, 'The name should be at least four characters.'],
    },
    image: {
        type: String,
        required: [true, 'The image is required'],
        match: ['/^https?:\/\/.+/', 'The image should start with "http://" or "https://".']
    },
    price: {
        type: Number,
        required: [true, 'The price is required'],
        min: [0.0001, 'The price should be a positive number.']
    },
    desctription: {
        type: String,
        required: [true, 'The desctription is required'],
        minLength: [1, 'The description should be at least ten characters long.']
    },
    genre: {
        type: String,
        required: [true, 'The genre is required'],
        minLength: [1, 'The genre should be at least two characters long.']
    },
    platform: {
        type: String,
        enum: ["PC", "Nintendo", "PS4", "PS5", "XBOX"],
        required: [true, '']
    },
    boughtBy: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }
});

const Game = model('Game', gameSchema);

export default Game;