import User from '../models/User.js'
import bcrypt from 'bcrypt';

async function exists(user) {
    const result = await User.find({ email: user.email });
    return result.length ? true : false
}

async function saveUser(user) {
    const doExist = await exists(user);

    if (!doExist) {
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(user.password, salt);      
        return await User.create(user);
    }

    return 'The user already exists';
}




export default { saveUser, exists }