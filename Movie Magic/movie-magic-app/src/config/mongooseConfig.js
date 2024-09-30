import mongoose from "mongoose";

const dbUrl = 'mongodb://localhost:27017/magic-movies';

export default async function mongooseConfig() {
    try {
        await mongoose.connect(dbUrl);
        console.log('Connected!')
    } catch(error) {
        console.error('Error:', error);
    }
}



