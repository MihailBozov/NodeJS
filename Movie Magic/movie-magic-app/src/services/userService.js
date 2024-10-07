import User from '../models/User.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function exists(user) {
    const result = await User.findOne({ email: user.email });
    return result ? result : null;
}

function comparePasswords(user) {
    if (user.password === user.confirmPassword) {
        return true;
    } else {
        return false;
    }
}

async function register(user) {

    const doExist = await exists(user);
    const passwordsMatch = comparePasswords(user);

    if (!passwordsMatch) {
        return "The passwords don't match"
    }

    if (!doExist) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        return await User.create(user);
    }

    return 'The user already exists';
}

async function login(loginUser) {
    const user = await exists(loginUser);
    const checkPassword = await bcrypt.compare(loginUser.password, user.password);

    if (!checkPassword) {
        return null;
    }
    
    const payload = {
        _id: user._id,
        email: user.email
    }
    
    const jwtToken = jwt.sign(payload, 'SECRET', { expiresIn: '1h' });
    return jwtToken;
}



export default { register, login, exists, comparePasswords }