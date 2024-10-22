import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'The username is required!'],
        unique: [true, 'The username is already present in the database']
    },
    email: {
        type: String,
        required: [true, 'The email is required!']
    },
    password: {
        type: String, 
        required: [true, 'The password is required!']
    }
});

UserSchema.pre('save', async function() {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
})

const User = model('User', UserSchema)

export default User;