import User from '../models/User.js'
import bcrypt from 'bcrypt';
import jwt from '../lib/jwt.js';
import dotenv from 'dotenv';

async function registerUser(user) {
    if (!validateUser(user)) {
        throw new Error(`Failed to create a new user!\nThe user object has missing values:\n${JSON.stringify(user, null, 2)}`)
    }

    if (await usernameExists(user.username)) {
        console.info(`Failed to create a new user!\nThe username already exists in the database!`)
        return null;
    }

    if (!matchRegisterPasswords(user)) {
        console.info(`Failed to create a new user!\nThe passwords do not match!`);
        return null;
    }

    user.password = await hashPassword(user.password);
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
        throw new Error('The passwords do not match!')
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

async function usernameExists(username) {
    const user = await findByUsername(username);
    if (user) {
        return true;
    }
    return false;
}

function matchRegisterPasswords(user) {
    const password = user.password;
    const rePassword = user.rePassword;
    if (password !== rePassword) {
        return false;
    }
    return true;
}

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

function validateUser(user) {
    if (!user.username) {
        console.info(`The username is required!`)
        return false;
    }
    if (!user.email) {
        console.info(`The email is required!`)
        return false;
    }
    if (!user.password) {
        console.info(`The password is required!`)
        return false;
    }
    if (!user.rePassword) {
        console.info(`The rePassword is required!`)
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

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' })
}



export default { findByUsername, usernameExists, registerUser, loginUser };