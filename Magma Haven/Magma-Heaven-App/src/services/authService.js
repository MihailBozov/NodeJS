import User from '../models/User.js'
import bcrypt from 'bcrypt';

async function registerUser(user) {
    if (!validateUser(user)) {
        console.info(`Failed to create a new user!\nThe user object has missing values:\n${JSON.stringify(user, null, 2)}`);
        return null;
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
    return newUser;
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
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
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



export default { registerUser, findByUsername, usernameExists };