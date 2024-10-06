import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const dbUrl = process.env.DB_ATLASS_URL || process.env.DB_LOCAL_URL;

export default async function mongooseConfig() {
    try {
        await mongoose.connect(dbUrl, { dbName: process.env.DB_NAME });
        console.log('Connected to db:', dbUrl);
        
    } catch(error) {
        console.error('Error:', error);
    }
}



