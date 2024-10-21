import { Schema, model } from "mongoose";

const volcanoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    elevation: {
        type: Number,
        required: true
    },
    lastEuruption: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    typeVolcano: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    voteList: {
        type: [],
    },
    owner: {
        type: User
    }
})