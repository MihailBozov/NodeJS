import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    email: String,
    password: String,
});

const SALT_ROUNDS = 10;

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
});


const User = model('User', userSchema);
export default User;