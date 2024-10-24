import User from '../models/User.js'
import bcrypt from 'bcrypt';
import { JWT_SECRET } from '../constants.js';
import jwt from 'jsonwebtoken';

async function registerUser(user) {

    if (!matchRegisterPasswords(user)) {
        throw new Error('The passwords do not match!')
    }


    const newUser = await User.create(user);
    console.info(`New user was created with username: ${user.username}!`)
    
    return await generateToken(newUser);
}

async function loginUser(user) {
    const dbUser = await User.findOne().where({ email: user.email });
    if (!dbUser) {
        throw new Error('The email does not exist!');
    }

    const matchLoginPassword = await bcrypt.compare(user.password, dbUser.password);
    if (!matchLoginPassword) {
        throw new Error('The password is incorrect!')
    }
    
    return generateToken(dbUser);
}

async function findByUsername(username) {
    const user = await User.findOne().where({ username: username });
    if (user) {
        return user;
    }
    return null;
}

function matchRegisterPasswords(user) {
    const password = user.password;
    const rePassword = user.rePassword;
    if (password !== rePassword) {
        return false;
    }
    return true;
}

async function generateToken(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        username: user.username
    }

    return jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' })
}



export default { findByUsername, registerUser, loginUser };