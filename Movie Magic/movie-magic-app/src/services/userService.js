import User from '../models/User.js'
import bcrypt from 'bcrypt';

async function exists(user) {
    const result = await User.find({ email: user.email });
    return result.length ? true : false
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
    
    if(!passwordsMatch) {
        return "The passwords don't match"
    }

    if (!doExist) {
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(user.password, salt);
        return await User.create(user);
    }

    return 'The user already exists';
}




export default { register, exists, comparePasswords }