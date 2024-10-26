import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'The username is required'],
        minLength: [1, 'The username should be at least five characters long.']
    },
    email: {
        type: String,
        required: [true, 'The email is required'],
        minLength: [1, 'The email should be at least ten characters long.'],
    },
    password: {
        type: String, 
        required: [true, 'The password is required'],
        minLength: [1, 'The password should be at least four characters long']
    }
})


export const User = model('User', userSchema);