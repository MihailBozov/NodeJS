import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "The email is required"],
        unique: [true, 'The email should be unique'],
        minLength: [4, 'The email is too short'],
        validate: [/^[A-Za-z0-9\s]+$/, 'Your email contains characters that are not allowed'],
    },
    password: {
        type: String, 
        required: [true, 'The password is required'],
        minLength: [6, 'The length of the password shoud be at least 6 characters']
    },
});

const User = model('User', userSchema);
export default User;