import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const dbUrl = process.env.DB_ATLASS_URL || process.env.DB_LOCAL_URL;

export default async function mongooseConfig() {
    try {
        console.log('DB_ATLASS_URL:', process.env.DB_ATLASS_URL)
        console.log('DB_LOCAL_URL:', process.env.DB_LOCAL_URL)
        
        await mongoose.connect(dbUrl);
        console.log('Connected to db:', dbUrl);
    } catch(error) {
        console.error('Error:', error);
    }
}



