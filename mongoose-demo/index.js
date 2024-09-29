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

app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send('Hello from express');
})

app.get('/students', async (req, res) => {

    //The application of the method lean() is optional; 
    //When we use lean(), the query results will be POJOs, not Mongoose model instances.
    const students = await Student.find({},{name: true, age:true, _id: false}).lean();

    res.json(students);
})

app.get('/students/create', (req, res) => {
    res.send(`
    <form method="post">
        <input type="text" name="name" placeholder="Name">
        <input type="number" name="age" placeholder="Age">
        <input type="submit" value="create">
    </form>
        `);
})

app.post('/students/create', async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    
    
    console.log(student);
    res.redirect('/students')
})


app.listen(5000, () => console.log('Listening on port 5000'));