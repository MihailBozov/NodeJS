import express from 'express';
import mongoose from "mongoose";
import Student from './models/Student.js'

const url = 'mongodb://localhost:27017';

async function main() {
    await mongoose.connect(`${url}/myProject`);
    console.log('Successfully connecting to the database!')
    
    return 'done!'
}

main()
    .then(console.log)
    .catch(console.error);
    
const app = express();

app.get('/', (req, res) => {
    res.send('Hello from express');
})

app.get('/students', async (req, res) => {
    
    //The application of the method lean() is optional; 
    //When we use lean(), the query results will be POJOs, not Mongoose model instances.
    const students = await Student.find({ age: {$gt: 18} }).lean();
    console.log(students);
    res.end();
})


app.listen(5000, () => console.log('Listening on port 5000'));